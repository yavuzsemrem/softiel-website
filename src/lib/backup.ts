// Backup and recovery system
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, get, set } from 'firebase/database';
import { db, rtdb } from './firebase';
import { monitoring } from './monitoring';

export interface BackupData {
  id: string;
  timestamp: string;
  type: 'full' | 'incremental' | 'scheduled';
  collections: {
    [collectionName: string]: any[];
  };
  realtimeData: any;
  metadata: {
    totalDocuments: number;
    totalSize: number;
    version: string;
  };
}

export interface BackupConfig {
  enabled: boolean;
  schedule: 'daily' | 'weekly' | 'monthly';
  retentionDays: number;
  collections: string[];
  realtimePaths: string[];
}

class BackupService {
  private config: BackupConfig = {
    enabled: true,
    schedule: 'daily',
    retentionDays: 30,
    collections: ['users', 'blogs', 'categories', 'tags', 'comments', 'settings'],
    realtimePaths: ['users', 'analytics', 'notifications']
  };

  // Create full backup
  async createFullBackup(): Promise<BackupData> {
    try {
      monitoring.trackSystemEvent('backup_started', { type: 'full' }, 'low');

      const backupId = `backup_${Date.now()}`;
      const timestamp = new Date().toISOString();
      const collections: { [key: string]: any[] } = {};
      let totalDocuments = 0;

      // Backup Firestore collections
      for (const collectionName of this.config.collections) {
        try {
          const snapshot = await getDocs(collection(db, collectionName));
          const documents = snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }));
          collections[collectionName] = documents;
          totalDocuments += documents.length;
        } catch (error) {
          console.error(`Error backing up collection ${collectionName}:`, error);
          monitoring.trackError(error as Error, `backup_collection_${collectionName}`);
        }
      }

      // Backup Realtime Database
      const realtimeData: any = {};
      for (const path of this.config.realtimePaths) {
        try {
          const snapshot = await get(ref(rtdb, path));
          realtimeData[path] = snapshot.val();
        } catch (error) {
          console.error(`Error backing up realtime path ${path}:`, error);
          monitoring.trackError(error as Error, `backup_realtime_${path}`);
        }
      }

      const backupData: BackupData = {
        id: backupId,
        timestamp,
        type: 'full',
        collections,
        realtimeData,
        metadata: {
          totalDocuments,
          totalSize: JSON.stringify({ collections, realtimeData }).length,
          version: '1.0.0'
        }
      };

      // Store backup in Firestore
      await this.storeBackup(backupData);

      monitoring.trackSystemEvent('backup_completed', {
        type: 'full',
        backupId,
        totalDocuments,
        totalSize: backupData.metadata.totalSize
      }, 'low');

      return backupData;
    } catch (error) {
      monitoring.trackError(error as Error, 'backup_full');
      throw error;
    }
  }

  // Create incremental backup
  async createIncrementalBackup(lastBackupTime: string): Promise<BackupData> {
    try {
      monitoring.trackSystemEvent('backup_started', { type: 'incremental' }, 'low');

      const backupId = `backup_${Date.now()}`;
      const timestamp = new Date().toISOString();
      const collections: { [key: string]: any[] } = {};
      let totalDocuments = 0;

      // Get documents modified since last backup
      for (const collectionName of this.config.collections) {
        try {
          const snapshot = await getDocs(collection(db, collectionName));
          const documents = snapshot.docs
            .filter(doc => {
              const data = doc.data();
              const updatedAt = data.updatedAt || data.createdAt;
              return updatedAt && new Date(updatedAt) > new Date(lastBackupTime);
            })
            .map(doc => ({
              id: doc.id,
              data: doc.data()
            }));
          
          if (documents.length > 0) {
            collections[collectionName] = documents;
            totalDocuments += documents.length;
          }
        } catch (error) {
          console.error(`Error backing up collection ${collectionName}:`, error);
          monitoring.trackError(error as Error, `backup_collection_${collectionName}`);
        }
      }

      const backupData: BackupData = {
        id: backupId,
        timestamp,
        type: 'incremental',
        collections,
        realtimeData: {}, // Incremental backups don't include realtime data
        metadata: {
          totalDocuments,
          totalSize: JSON.stringify({ collections }).length,
          version: '1.0.0'
        }
      };

      // Store backup
      await this.storeBackup(backupData);

      monitoring.trackSystemEvent('backup_completed', {
        type: 'incremental',
        backupId,
        totalDocuments,
        totalSize: backupData.metadata.totalSize
      }, 'low');

      return backupData;
    } catch (error) {
      monitoring.trackError(error as Error, 'backup_incremental');
      throw error;
    }
  }

  // Store backup in Firestore
  private async storeBackup(backupData: BackupData): Promise<void> {
    try {
      const backupRef = doc(db, 'backups', backupData.id);
      await setDoc(backupRef, backupData);
    } catch (error) {
      console.error('Error storing backup:', error);
      monitoring.trackError(error as Error, 'backup_store');
      throw error;
    }
  }

  // Get backup by ID
  async getBackup(backupId: string): Promise<BackupData | null> {
    try {
      const backupRef = doc(db, 'backups', backupId);
      const snapshot = await getDoc(backupRef);
      
      if (snapshot.exists()) {
        return snapshot.data() as BackupData;
      }
      return null;
    } catch (error) {
      monitoring.trackError(error as Error, 'backup_get');
      throw error;
    }
  }

  // List all backups
  async listBackups(limit: number = 50): Promise<BackupData[]> {
    try {
      const backupsRef = collection(db, 'backups');
      const snapshot = await getDocs(backupsRef);
      
      const backups = snapshot.docs
        .map(doc => doc.data() as BackupData)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, limit);

      return backups;
    } catch (error) {
      monitoring.trackError(error as Error, 'backup_list');
      throw error;
    }
  }

  // Restore from backup
  async restoreFromBackup(backupId: string): Promise<{ success: boolean; error?: string }> {
    try {
      monitoring.trackSystemEvent('restore_started', { backupId }, 'high');

      const backup = await this.getBackup(backupId);
      if (!backup) {
        return { success: false, error: 'Backup not found' };
      }

      // Restore Firestore collections
      for (const [collectionName, documents] of Object.entries(backup.collections)) {
        try {
          for (const docData of documents) {
            const docRef = doc(db, collectionName, docData.id);
            await setDoc(docRef, docData.data);
          }
        } catch (error) {
          console.error(`Error restoring collection ${collectionName}:`, error);
          monitoring.trackError(error as Error, `restore_collection_${collectionName}`);
        }
      }

      // Restore Realtime Database
      for (const [path, data] of Object.entries(backup.realtimeData)) {
        try {
          await set(ref(rtdb, path), data);
        } catch (error) {
          console.error(`Error restoring realtime path ${path}:`, error);
          monitoring.trackError(error as Error, `restore_realtime_${path}`);
        }
      }

      monitoring.trackSystemEvent('restore_completed', { backupId }, 'high');
      return { success: true };
    } catch (error) {
      monitoring.trackError(error as Error, 'restore');
      return { success: false, error: (error as Error).message };
    }
  }

  // Delete old backups
  async cleanupOldBackups(): Promise<{ deleted: number; error?: string }> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - this.config.retentionDays);

      const backups = await this.listBackups(1000); // Get all backups
      const oldBackups = backups.filter(backup => 
        new Date(backup.timestamp) < cutoffDate
      );

      let deleted = 0;
      for (const backup of oldBackups) {
        try {
          const backupRef = doc(db, 'backups', backup.id);
          await deleteDoc(backupRef);
          deleted++;
        } catch (error) {
          console.error(`Error deleting backup ${backup.id}:`, error);
          monitoring.trackError(error as Error, `backup_delete_${backup.id}`);
        }
      }

      monitoring.trackSystemEvent('backup_cleanup', { deleted }, 'low');
      return { deleted };
    } catch (error) {
      monitoring.trackError(error as Error, 'backup_cleanup');
      return { deleted: 0, error: (error as Error).message };
    }
  }

  // Schedule automatic backups
  scheduleBackups(): void {
    if (!this.config.enabled) return;

    const interval = this.getScheduleInterval();
    
    setInterval(async () => {
      try {
        // Get last backup time
        const backups = await this.listBackups(1);
        const lastBackup = backups[0];
        
        if (lastBackup) {
          // Create incremental backup
          await this.createIncrementalBackup(lastBackup.timestamp);
        } else {
          // Create full backup
          await this.createFullBackup();
        }

        // Cleanup old backups
        await this.cleanupOldBackups();
      } catch (error) {
        monitoring.trackError(error as Error, 'backup_scheduled');
      }
    }, interval);
  }

  // Get schedule interval in milliseconds
  private getScheduleInterval(): number {
    switch (this.config.schedule) {
      case 'daily':
        return 24 * 60 * 60 * 1000; // 24 hours
      case 'weekly':
        return 7 * 24 * 60 * 60 * 1000; // 7 days
      case 'monthly':
        return 30 * 24 * 60 * 60 * 1000; // 30 days
      default:
        return 24 * 60 * 60 * 1000; // Default to daily
    }
  }

  // Update backup configuration
  updateConfig(newConfig: Partial<BackupConfig>): void {
    this.config = { ...this.config, ...newConfig };
    monitoring.trackSystemEvent('backup_config_updated', newConfig, 'low');
  }

  // Get backup configuration
  getConfig(): BackupConfig {
    return { ...this.config };
  }
}

// Create singleton instance
export const backupService = new BackupService();

// Initialize backup service
export function initializeBackupService(): void {
  // Start scheduled backups
  backupService.scheduleBackups();
  
  // Create initial backup
  backupService.createFullBackup().catch(error => {
    monitoring.trackError(error, 'backup_initial');
  });
}

// Initialize on server side
if (typeof window === 'undefined') {
  initializeBackupService();
}

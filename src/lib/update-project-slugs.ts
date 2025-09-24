// Mevcut projelerin slug'larını güncellemek için utility script
import { 
  collection, 
  getDocs, 
  updateDoc, 
  doc,
  query 
} from 'firebase/firestore'
import { db } from './firebase'
import { createSlug } from './slug-utils'

export async function updateAllProjectSlugs() {
  try {
    console.log('Tüm projelerin slug\'ları güncelleniyor...')
    
    const projectsRef = collection(db, 'projects')
    const q = query(projectsRef)
    const querySnapshot = await getDocs(q)
    
    let updatedCount = 0
    
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data()
      const docId = docSnapshot.id
      
      // Eğer slug yoksa veya geçersizse, başlıktan oluştur
      let newSlug = data.slug
      
      if (!newSlug || newSlug.includes('.') || newSlug.includes('www') || newSlug === docId) {
        newSlug = createSlug(data.title)
        console.log(`Proje "${data.title}" için slug oluşturuluyor: ${newSlug}`)
        
        await updateDoc(doc(db, 'projects', docId), {
          slug: newSlug
        })
        
        updatedCount++
      } else {
        console.log(`Proje "${data.title}" zaten geçerli slug'a sahip: ${newSlug}`)
      }
    }
    
    console.log(`${updatedCount} proje güncellendi.`)
    return { success: true, updatedCount }
    
  } catch (error) {
    console.error('Slug güncelleme hatası:', error)
    return { success: false, error: error.message }
  }
}

// Tek bir proje için slug güncelleme
export async function updateProjectSlug(projectId: string) {
  try {
    const projectRef = doc(db, 'projects', projectId)
    const projectSnap = await getDocs(projectRef)
    
    if (projectSnap.exists()) {
      const data = projectSnap.data()
      const newSlug = createSlug(data.title)
      
      await updateDoc(projectRef, {
        slug: newSlug
      })
      
      console.log(`Proje "${data.title}" slug'ı güncellendi: ${newSlug}`)
      return { success: true, slug: newSlug }
    }
    
    return { success: false, error: 'Proje bulunamadı' }
    
  } catch (error) {
    console.error('Proje slug güncelleme hatası:', error)
    return { success: false, error: error.message }
  }
}



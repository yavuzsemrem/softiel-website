// Optimized Lucide React Icons - sadece kullanılan iconları import et
export {
  ArrowRight,
  Play,
  Star,
  CheckCircle,
  Sparkles,
  Rocket,
  Shield,
  Globe,
  Code,
  Palette,
  Search,
  Zap,
  Award,
  Target,
  Lightbulb,
  MessageCircle,
  Phone,
  Menu,
  X,
  FileText,
  ChevronDown,
  BookOpen,
  Filter,
  Calendar,
  User,
  Loader2,
  Clock,
  Users,
  Headphones,
  Bot,
  Send,
  Mail
} from 'lucide-react';

// Diğer iconlar için lazy loading
export const getIcon = async (iconName: string) => {
  const icons = await import('lucide-react');
  return icons[iconName as keyof typeof icons];
};



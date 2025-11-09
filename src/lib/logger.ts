// Production-safe logger utility
// Sadece development modunda console çıktısı verir

const isDevelopment = process.env.NODE_ENV === 'development'

export const logger = {
  log: (...args: any[]) => {
    if (isDevelopment) {
      console.log(...args)
    }
  },
  
  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info(...args)
    }
  },
  
  warn: (...args: any[]) => {
    if (isDevelopment) {
      console.warn(...args)
    }
  },
  
  error: (...args: any[]) => {
    if (isDevelopment) {
      console.error(...args)
    }
  },
  
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug(...args)
    }
  }
}

// Production'da tüm console çıktılarını devre dışı bırak
if (!isDevelopment && typeof window !== 'undefined') {
  // Browser ortamında
  console.log = () => {}
  console.info = () => {}
  console.warn = () => {}
  console.debug = () => {}
  // console.error'u bırak (hataları görmek için)
}







"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Phone,
  Mail,
  Clock,
  CheckCircle
} from "lucide-react"
import aiIcon from "@/images/ai.PNG"

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'quick_reply' | 'contact_info'
}

interface QuickReply {
  id: string
  text: string
  action: string
}

const quickReplies: QuickReply[] = [
  { id: '1', text: 'Hizmetleriniz neler?', action: 'services' },
  { id: '2', text: 'Fiyat bilgisi al', action: 'pricing' },
  { id: '3', text: 'Projelerinizi görmek istiyorum', action: 'projects' },
  { id: '4', text: 'İletişim bilgileri', action: 'contact' }
]

const contactInfo = {
  phone: '+90 (555) 123 45 67',
  email: 'info@softiel.com',
  workingHours: 'Pazartesi - Cuma: 09:00 - 18:00'
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Merhaba! Softiel\'e hoş geldiniz! 👋 Size nasıl yardımcı olabilirim?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        type: botResponse.type
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const generateBotResponse = (userText: string) => {
    const text = userText.toLowerCase()
    
    if (text.includes('hizmet') || text.includes('service')) {
      return {
        text: 'Softiel olarak web tasarımı, web geliştirme, mobil uygulama geliştirme, SEO, dijital pazarlama ve daha birçok hizmet sunuyoruz. Detaylı bilgi için hizmetlerimiz sayfasını ziyaret edebilirsiniz! 🚀',
        type: 'text' as const
      }
    }
    
    if (text.includes('fiyat') || text.includes('price') || text.includes('ücret')) {
      return {
        text: 'Projelerimiz için özel fiyatlandırma yapıyoruz. Size en uygun çözümü sunabilmemiz için iletişime geçmenizi öneriyoruz. 📞',
        type: 'text' as const
      }
    }
    
    if (text.includes('proje') || text.includes('project') || text.includes('referans')) {
      return {
        text: 'Projelerimizi görmek için projelerimiz sayfasını ziyaret edebilirsiniz. Her proje bizim için özel ve değerli! 💼',
        type: 'text' as const
      }
    }
    
    if (text.includes('iletişim') || text.includes('contact') || text.includes('telefon')) {
      return {
        text: 'İletişim bilgilerimiz:',
        type: 'contact_info' as const
      }
    }
    
    if (text.includes('teşekkür') || text.includes('thanks') || text.includes('sağol')) {
      return {
        text: 'Rica ederim! Başka bir konuda yardımcı olabilir miyim? 😊',
        type: 'text' as const
      }
    }
    
    return {
      text: 'Anladım! Size daha iyi yardımcı olabilmem için hizmetlerimiz, fiyatlandırma veya projelerimiz hakkında soru sorabilirsiniz. 🤔',
      type: 'text' as const
    }
  }

  const handleQuickReply = (reply: QuickReply) => {
    handleSendMessage(reply.text)
  }

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }


  return (
    <>
      {/* Chatbot Toggle Button - Modern UI/UX tasarım */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
         <motion.button
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           onClick={toggleChatbot}
           className="group relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl hover:shadow-3xl flex items-center justify-center text-white transition-all duration-300 chatbot-button overflow-hidden focus:outline-none"
           style={{
             background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(14, 165, 233, 0.15) 50%, rgba(59, 130, 246, 0.2) 75%, rgba(30, 41, 59, 0.9) 100%)',
             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05)'
           }}
           initial={{ 
             opacity: 0, 
             scale: 0.1, 
             rotate: -360,
             y: 100,
             x: 50
           }}
           animate={{ 
             opacity: 1, 
             scale: 1, 
             rotate: 0,
             y: 0,
             x: 0
           }}
           transition={{ 
             duration: 0.6, 
             ease: [0.68, -0.55, 0.265, 1.55],
             delay: 0.3
           }}
         >
           {/* Glow effect */}
           <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
           
           {/* Icon with animation */}
           <AnimatePresence mode="wait">
             {isOpen ? (
               <motion.div
                 key="close"
                 initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                 animate={{ rotate: 0, opacity: 1, scale: 1 }}
                 exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                 transition={{ duration: 0.3, ease: "easeInOut" }}
                 className="relative z-10"
               >
                 <X className="w-8 h-8 sm:w-9 sm:h-9 text-gray-300" />
               </motion.div>
             ) : (
               <motion.div
                 key="chat"
                 initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                 animate={{ rotate: 0, opacity: 1, scale: 1 }}
                 exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                 transition={{ duration: 0.3, ease: "easeInOut" }}
                 className="relative z-10"
               >
                 <Image 
                   src={aiIcon} 
                   alt="AI Assistant" 
                   width={40} 
                   height={40} 
                   className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
                 />
               </motion.div>
             )}
           </AnimatePresence>
           
           {/* Pulse animation when closed */}
           {!isOpen && (
             <motion.div
               className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full"
               animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             />
           )}
         </motion.button>
      </motion.div>

      {/* Chatbot Window - Ayrı konumlandırma, daha yukarıda */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 z-50"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
             <div
               className="bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-xl rounded-3xl shadow-2xl w-80 sm:w-96 h-96 sm:h-[500px] flex flex-col overflow-hidden chatbot-window"
               style={{
                 boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
               }}
             >
            {/* Header */}
            <div className="flex items-center justify-between chatbot-header bg-gradient-to-r from-slate-800/60 via-slate-700/40 to-slate-800/60 backdrop-blur-sm p-5"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(14, 165, 233, 0.15) 50%, rgba(59, 130, 246, 0.2) 75%, rgba(30, 41, 59, 0.9) 100%)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              borderRadius: '24px 24px 0 0'
            }}>
              <div className="flex items-center space-x-3">
                 <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center shadow-lg w-10 h-10">
                   <Image 
                     src={aiIcon} 
                     alt="AI Assistant" 
                     width={28} 
                     height={28} 
                     className="object-contain w-7 h-7"
                   />
                 </div>
                <div>
                  <h3 className="font-semibold text-white chatbot-header h3 text-base"
                  style={{
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5), 0 0 10px rgba(59, 130, 246, 0.3)'
                  }}>Softiel Asistanı</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg"
                         style={{
                           boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)'
                         }}></div>
                    <p className="text-sm text-green-400 chatbot-header p font-medium"
                       style={{
                         textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                       }}>Çevrimiçi</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleChatbot}
                  className="p-2 text-slate-300 hover:text-white hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all duration-200"
                  style={{
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 chatbot-messages bg-gradient-to-b from-slate-800/20 to-transparent">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} chatbot-message`}
                    >
                      <div className={`flex items-start space-x-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                           message.sender === 'user' 
                             ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                             : 'bg-gradient-to-br from-slate-700 to-slate-800'
                         }`}>
                           {message.sender === 'user' ? (
                             <User className="w-4 h-4 text-white" />
                           ) : (
                             <Image 
                               src={aiIcon} 
                               alt="AI Assistant" 
                               width={24} 
                               height={24} 
                               className="w-6 h-6 object-contain"
                             />
                           )}
                         </div>
                        <div className={`rounded-xl px-4 py-3 shadow-md backdrop-blur-sm ${
                          message.sender === 'user'
                            ? 'text-white'
                            : 'text-slate-200'
                        }`}
                        style={message.sender === 'bot' ? {
                          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(14, 165, 233, 0.15) 50%, rgba(59, 130, 246, 0.2) 75%, rgba(30, 41, 59, 0.9) 100%)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        } : message.sender === 'user' ? {
                          background: 'var(--chatbot-user-bg)',
                          boxShadow: 'var(--chatbot-user-shadow)'
                        } : {}}>
                          <p className="text-base leading-relaxed">{message.text}</p>
                          {message.type === 'contact_info' && (
                            <div className="mt-4 space-y-3">
                              <div className="flex items-center space-x-3 text-sm">
                                <Phone className="w-4 h-4 text-blue-400" />
                                <span>{contactInfo.phone}</span>
                              </div>
                              <div className="flex items-center space-x-3 text-sm">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span>{contactInfo.email}</span>
                              </div>
                              <div className="flex items-center space-x-3 text-sm">
                                <Clock className="w-4 h-4 text-blue-400" />
                                <span>{contactInfo.workingHours}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-3">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shadow-lg">
                           <Image 
                             src={aiIcon} 
                             alt="AI Assistant" 
                             width={24} 
                             height={24} 
                             className="w-6 h-6 object-contain"
                           />
                         </div>
                        <div className="backdrop-blur-sm rounded-xl px-4 py-3 shadow-md"
                        style={{
                          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(14, 165, 233, 0.15) 50%, rgba(59, 130, 246, 0.2) 75%, rgba(30, 41, 59, 0.9) 100%)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}>
                          <div className="flex space-x-1.5">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <div className="px-5 pb-3 chatbot-quick-replies">
                    <div className="flex flex-wrap gap-3">
                      {quickReplies.map((reply) => (
                        <button
                          key={reply.id}
                          onClick={() => handleQuickReply(reply)}
                          className="px-4 py-2.5 text-slate-200 hover:text-white text-sm rounded-xl chatbot-quick-reply shadow-md hover:shadow-lg backdrop-blur-sm border border-slate-600/30 hover:border-blue-400/50 transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1"
                          style={{
                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(59, 130, 246, 0.2) 25%, rgba(14, 165, 233, 0.15) 50%, rgba(59, 130, 246, 0.2) 75%, rgba(30, 41, 59, 0.9) 100%)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                          }}
                        >
                          {reply.text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-5 chatbot-input bg-gradient-to-t from-slate-800/40 to-transparent">
                  <div className="flex items-center space-x-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                      placeholder="Mesajınızı yazın..."
                      className="flex-1 backdrop-blur-sm rounded-xl px-4 py-3 text-white placeholder-slate-400 text-base focus:outline-none transition-all duration-200 chatbot-input shadow-md"
                      style={{
                        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(51, 65, 85, 0.6) 50%, rgba(30, 41, 59, 0.8) 100%)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(148, 163, 184, 0.1)'
                      }}
                    />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSendMessage(inputValue)}
                        disabled={!inputValue.trim()}
                        className="p-3 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 chatbot-button shadow-md hover:shadow-lg backdrop-blur-sm"
                        style={{
                          background: 'var(--chatbot-user-bg)',
                          boxShadow: 'var(--chatbot-user-shadow)'
                        }}
                      >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

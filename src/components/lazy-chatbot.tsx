"use client"

import dynamic from "next/dynamic"

// Chatbot'u lazy load et
const ChatbotComponent = dynamic(() => import("@/components/chatbot").then(mod => ({ default: mod.Chatbot })), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </div>
    </div>
  )
})

export default function LazyChatbot() {
  return <ChatbotComponent />
}



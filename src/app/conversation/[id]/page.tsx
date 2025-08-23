"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useSocket } from "@/lib/socket"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" }
]

interface ConversationState {
  myLanguage: string | null
  otherLanguage: string | null
  isHost: boolean
}

export default function ConversationPage({ params }: { params: { id: string } }) {
  const [state, setState] = useState<ConversationState>({
    myLanguage: null,
    otherLanguage: null,
    isHost: false
  })
  const [conversationId] = useState(params.id)
  const [showOtherLanguage, setShowOtherLanguage] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, content: "Hello! How are you today?" },
    { id: 2, content: "I'm doing well, thank you! How about you?" },
    { id: 3, content: "Great! I'm excited to practice languages with you." },
    { id: 4, content: "That sounds wonderful! What would you like to talk about?" },
    { id: 5, content: "Maybe we could discuss our favorite foods?" },
    { id: 6, content: "I love that idea! I'm always curious about different cuisines." },
    { id: 7, content: "What's your favorite dish from your country?" },
    { id: 8, content: "I really enjoy pasta, especially carbonara. What about you?" },
  ])
  const { joinRoom, setLanguage, otherLanguage, isConnected } = useSocket()

  useEffect(() => {
    // Join the room when component mounts
    if (isConnected) {
      joinRoom(conversationId)
    }

    // Check if this user is the host (creator) of the conversation
    const hostId = localStorage.getItem(`conversation_${conversationId}_host`)
    if (!hostId) {
      // First user to join becomes the host
      const newHostId = Math.random().toString(36).substring(2, 15)
      localStorage.setItem(`conversation_${conversationId}_host`, newHostId)
      setState(prev => ({ ...prev, isHost: true }))
    } else {
      setState(prev => ({ ...prev, isHost: false }))
    }

    // Check for existing language selections
    const myLang = localStorage.getItem(`conversation_${conversationId}_my_language`)
    
    if (myLang) {
      setState(prev => ({ ...prev, myLanguage: myLang }))
      setLanguage(myLang) // Send to WebSocket
    }
  }, [conversationId, isConnected, joinRoom, setLanguage])

  // Update other language from WebSocket
  useEffect(() => {
    setState(prev => ({ ...prev, otherLanguage: otherLanguage }))
  }, [otherLanguage])

  const selectLanguage = (languageCode: string) => {
    setState(prev => ({ ...prev, myLanguage: languageCode }))
    localStorage.setItem(`conversation_${conversationId}_my_language`, languageCode)
    setLanguage(languageCode) // Send to WebSocket
  }

  const getLanguageName = (code: string) => {
    return languages.find(lang => lang.code === code)?.name || code
  }

  const getLanguageFlag = (code: string) => {
    return languages.find(lang => lang.code === code)?.flag || "🌐"
  }

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center max-w-md mx-auto">
        
        {/* Compact Language Picker at Top */}
        <div className="mb-32">
          {!state.myLanguage ? (
            <div className="bg-gradient-to-t from-[#D3D3D3] to-[#FFF] rounded-2xl p-6 shadow-lg">
              <h2 className="text-gray-800 text-lg font-medium mb-4">Choose Your Language</h2>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {languages.slice(0, 6).map((language) => (
                  <button
                    key={language.code}
                    onClick={() => selectLanguage(language.code)}
                    className="bg-white/50 hover:bg-white text-gray-800 p-3 rounded-xl transition-all duration-200 hover:scale-105"
                  >
                    <div className="text-2xl mb-1">{language.flag}</div>
                    <div className="text-xs font-medium">{language.name}</div>
                  </button>
                ))}
              </div>
              
              {/* Other person's language in picker */}
              <div className="text-center text-gray-600 text-xs">
                {state.otherLanguage ? (
                  <span>Other person speaks {getLanguageFlag(state.otherLanguage)} {getLanguageName(state.otherLanguage)}</span>
                ) : (
                  <span>Other person: waiting for selection...</span>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setState(prev => ({ ...prev, myLanguage: null }))
                localStorage.removeItem(`conversation_${conversationId}_my_language`)
                setLanguage('') // Clear language on WebSocket
                setShowOtherLanguage(false) // Hide other language info when changing
              }}
              className="w-full bg-gradient-to-t from-[#D3D3D3] to-[#FFF] hover:bg-white gap-3 rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <div className="text-4xl">{getLanguageFlag(state.myLanguage)}</div>
              <span className="text-gray-800 font-medium text-lg">{getLanguageName(state.myLanguage)}</span>
            </button>
          )}
        </div>

        {/* Messages Area */}
        <div className="w-full max-w-2xl mx-auto relative">
          {state.myLanguage && state.otherLanguage ? (
            <div 
              className="h-96 overflow-y-auto px-4 scrollbar-hide mb-20"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0px, black 32px, black calc(100% - 32px), transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 32px, black calc(100% - 32px), transparent 100%)'
              }}
            >
              <div className="flex flex-col gap-8 text-left text-lg">
                {messages.map((message) => (
                  <p key={message.id} className="text-white/75">
                    {message.content}
                  </p>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-white/60 text-lg text-center py-20">
              Waiting for both people to select languages...
            </div>
          )}
        </div>
      </div>

      {/* Brand Name */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 ml-0.5 z-30">
        <img src="/remic-logo.png" alt="Remic" width={64} height={64} />
      </div>
    </main>
  )
}

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
              <div className="grid grid-cols-3 gap-3">
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
            </div>
          ) : (
            <button
              onClick={() => {
                setState(prev => ({ ...prev, myLanguage: null }))
                localStorage.removeItem(`conversation_${conversationId}_my_language`)
                setLanguage('') // Clear language on WebSocket
              }}
              className="w-full bg-gradient-to-t from-[#D3D3D3] to-[#FFF] hover:bg-white gap-3 rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between"
            >
              <div className="text-4xl">{getLanguageFlag(state.myLanguage)}</div>
              <span className="text-gray-600 text-2xl">↔</span>
              <div className="text-4xl">{state.otherLanguage ? getLanguageFlag(state.otherLanguage) : '⏳'}</div>
            </button>
          )}
        </div>

        {/* Main conversation area can go here */}
        <div className="space-y-5 mb-56">
          <div className="text-white/60 text-lg">
            {state.myLanguage && state.otherLanguage 
              ? "Ready to start your conversation!" 
              : "Waiting for both people to select languages..."}
          </div>
        </div>
      </div>

      {/* Brand Name */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 ml-0.5 z-30">
        <img src="/remic-logo.png" alt="Remic" width={64} height={64} />
      </div>
    </main>
  )
}

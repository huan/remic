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
      <div className="relative z-30 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-white text-4xl font-bold mb-4">Language Exchange</h1>
          <p className="text-white/80 text-xl">
            Conversation ID: <span className="font-mono bg-white/20 px-2 py-1 rounded">{conversationId}</span>
          </p>
          <p className="text-white/60 text-lg mt-2">
            {state.isHost ? "You created this conversation" : "You joined this conversation"}
          </p>
        </div>

        {/* Language Selection */}
        {!state.myLanguage && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <h2 className="text-white text-2xl font-semibold mb-6">Choose Your Language</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => selectLanguage(language.code)}
                  className="bg-white/20 hover:bg-white/30 text-white p-4 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <div className="text-3xl mb-2">{language.flag}</div>
                  <div className="font-medium">{language.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Language Display */}
        {state.myLanguage && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* My Language */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-white text-xl font-semibold mb-4">Your Language</h3>
              <div className="text-center">
                <div className="text-6xl mb-4">{getLanguageFlag(state.myLanguage)}</div>
                <div className="text-white text-2xl font-bold">{getLanguageName(state.myLanguage)}</div>
              </div>
              <button
                onClick={() => {
                  setState(prev => ({ ...prev, myLanguage: null }))
                  localStorage.removeItem(`conversation_${conversationId}_my_language`)
                  setLanguage('') // Clear language on WebSocket
                }}
                className="mt-4 w-full px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
              >
                Change Language
              </button>
            </div>

            {/* Other Person's Language */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-white text-xl font-semibold mb-4">Other Person's Language</h3>
              {state.otherLanguage ? (
                <div className="text-center">
                  <div className="text-6xl mb-4">{getLanguageFlag(state.otherLanguage)}</div>
                  <div className="text-white text-2xl font-bold">{getLanguageName(state.otherLanguage)}</div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-4">⏳</div>
                  <div className="text-white/60 text-lg">Waiting for other person to choose...</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Instructions */}
        {state.myLanguage && (
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Share this conversation ID with someone else: <span className="font-mono bg-white/20 px-2 py-1 rounded">{conversationId}</span>
            </p>
          </div>
        )}
      </div>

      {/* Brand Name */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 ml-0.5 z-30">
        <img src="/remic-logo.png" alt="Remic" width={64} height={64} />
      </div>
    </main>
  )
}

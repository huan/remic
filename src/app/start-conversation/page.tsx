"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import QRCode from "qrcode"
import { useSocket } from "@/lib/socket"

export default function Home() {
  const [conversationId, setConversationId] = useState<string>("")
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("")
  const [someoneJoining, setSomeoneJoining] = useState(false)
  const router = useRouter()
  const { joinRoom, onUserJoined, isConnected } = useSocket()

  useEffect(() => {
    // Generate a unique conversation ID
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setConversationId(id)
    
    // Create the conversation URL
    const url = `${window.location.origin}/conversation/${id}`
    setQrCodeUrl(url)
    
    // Generate QR code
    QRCode.toDataURL(url, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }).then(dataUrl => {
      setQrCodeDataUrl(dataUrl)
    }).catch(err => {
      console.error('Error generating QR code:', err)
    })
  }, [])

  // Join the room and listen for other users joining
  useEffect(() => {
    if (isConnected && conversationId) {
      // Join the room as the host
      joinRoom(conversationId)
      
      // Set up listener for when someone else joins
      onUserJoined((data) => {
        if (data.room === conversationId && data.isSecondUser) {
          // Someone else joined our room, show joining indicator and then redirect
          setSomeoneJoining(true)
          setTimeout(() => {
            router.push(`/conversation/${conversationId}`)
          }, 1000) // Small delay to let the other user get settled
        }
      })
    }
  }, [isConnected, conversationId, joinRoom, onUserJoined, router])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeUrl)
      // You could add a toast notification here
      alert("Conversation link copied to clipboard!")
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-8">
      {/* Background Image with Overlay */}
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
        {/* Testimonial */}
        <div className="mb-24">
          {someoneJoining ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-white/80 text-2xl px-8 md:text-2xl font-light leading-8">
                Someone joined! Starting conversation...
              </p>
            </div>
          ) : (
            <p className="text-white/80 text-2xl px-8 md:text-2xl font-light leading-8">
              Show this QR code to the person you want to talk to.
            </p>
          )}
        </div>

        {/* QR Code Display */}
        <div className="space-y-5 mb-40">
          <div className="w-64 h-64 bg-white rounded-2xl shadow-lg p-4 mx-auto flex items-center justify-center">
            {qrCodeDataUrl ? (
              <img 
                src={qrCodeDataUrl} 
                alt="QR Code" 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}
          </div>

          <div className="text-center space-y-2">
            <p className="text-white/60 text-sm">Conversation ID:</p>
            <p className="text-white font-mono text-sm bg-white/20 px-3 py-2 rounded-lg break-all">
              {conversationId}
            </p>
            <Button 
              onClick={copyToClipboard}
              variant="link" 
              className="text-white/50 hover:text-white font-light p-0 h-auto text-lg"
            >
              Click to copy conversation link
            </Button>
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

"use client"

import { useEffect, useRef, useState } from "react"
import jsQR from "jsqr"
import { useRouter } from "next/navigation"

export default function JoinConversation() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrResult, setQrResult] = useState<string>("")
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsScanning(true)
        }
      } catch (err) {
        console.error('Camera error:', err)
        setError('Camera access denied. Please allow camera access to scan QR codes.')
      }
    }

    startCamera()
  }, [])

  useEffect(() => {
    if (!isScanning || !videoRef.current || !canvasRef.current) return

    const scanQR = () => {
      const video = videoRef.current
      const canvas = canvasRef.current
      
      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const code = jsQR(imageData.data, imageData.width, imageData.height)
          
          if (code) {
            console.log('QR Code found:', code.data)
            setQrResult(code.data)
            setIsScanning(false) // Stop scanning once found
            
            // Check if it's a valid conversation URL
            try {
              const url = new URL(code.data)
              const pathParts = url.pathname.split('/')
              const conversationId = pathParts[pathParts.length - 1]
              
              if (conversationId && conversationId.length > 10) {
                // Valid conversation ID found, redirect
                router.push(`/conversation/${conversationId}`)
              } else {
                setError('Invalid conversation QR code. Please try scanning again.')
              }
            } catch (err) {
              setError('Invalid QR code format. Please scan a conversation QR code.')
            }
          }
        }
      }
      
      if (isScanning) {
        requestAnimationFrame(scanQR)
      }
    }

    scanQR()
  }, [isScanning, router])

  const resetScanner = () => {
    setQrResult("")
    setError("")
    setIsScanning(true)
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
        {/* Testimonial */}
        <div className="mb-24">
          <p className="text-white/80 text-2xl px-8 md:text-2xl font-light leading-8">
            Scan the QR code on the other person&apos;s device
          </p>
        </div>

        {/* Camera Window */}
        <div className="w-64 h-64 bg-white rounded-2xl shadow-lg overflow-hidden mb-8 relative mx-auto">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
          {/* Hidden canvas for QR processing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
            <p className="text-sm">{error}</p>
            <button 
              onClick={resetScanner}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* QR Result */}
        {qrResult && !error && (
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">QR Code Detected!</h3>
            <p className="text-sm text-gray-600 break-all">{qrResult}</p>
            <button 
              onClick={resetScanner}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Scan Another
            </button>
          </div>
        )}

        {/* Manual Entry Option */}
        <div className="text-center">
          <p className="text-white/60 text-sm mb-2">Or enter conversation manually:</p>
          <input 
            type="text" 
            placeholder="Enter conversation ID"
            className="px-4 py-2 rounded-lg border-0 bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                router.push(`/conversation/${e.currentTarget.value.trim()}`)
              }
            }}
          />
        </div>
      </div>
      
      {/* Brand Name */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 ml-0.5 z-30">
        <img src="/remic-logo.png" alt="Remic" width={64} height={64} />
      </div>
    </main>
  )
}

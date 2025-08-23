"use client"

import { useEffect, useRef, useState } from "react"
import jsQR from "jsqr"

export default function JoinConversation() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrResult, setQrResult] = useState<string>("")
  const [isScanning, setIsScanning] = useState(false)

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
          }
        }
      }
      
      if (isScanning) {
        requestAnimationFrame(scanQR)
      }
    }

    scanQR()
  }, [isScanning])

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
            Scan the QR code on the other person's device
          </p>
        </div>

        {/* Camera Window */}
        <div className="w-64 h-64 bg-white rounded-2xl shadow-lg overflow-hidden mb-44 relative mx-auto">
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

        {/* QR Result */}
        {qrResult && (
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">QR Code Detected!</h3>
            <p className="text-sm text-gray-600 break-all">{qrResult}</p>
            <button 
              onClick={() => {
                setQrResult("")
                setIsScanning(true)
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Scan Another
            </button>
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

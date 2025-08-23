import { Button } from "@/components/ui/button"

export default function Home() {
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
      
      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-blue-100/80 via-blue-50/60 to-red-200/80 z-10" /> */}
      
      {/* Diagonal Lines Pattern */}
      {/* <div className="absolute inset-0 z-20 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
        }} />
      </div> */}

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center max-w-md mx-auto">
        {/* Testimonial */}
        <div className="mb-24">
          <p className="text-white/80 text-2xl px-8 md:text-2xl font-light leading-8">
            Show this QR code to the person you want to talk to.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-5 mb-40">
          {/* Start Conversation Button */}
          <Button 
            size="lg" 
            className="w-full h-64 text-2xl font-normal px-6 py-8 bg-white hover:bg-white text-gray-800 hover:text-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <img src="/qr.png" alt="QR Code" width={200} height={200} />
          </Button>

          <div className="text-center">
            <Button 
              variant="link" 
              className="text-white/50 hover:text-gray-600 font-light p-0 h-auto text-lg"
            >
              Click to copy
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

import { Button } from "@/components/ui/button"
import Link from "next/link"

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
      
      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center max-w-md mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-white text-5xl font-bold mb-6">Remic</h1>
          <p className="text-white/80 text-xl font-light">
            Connect with people and exchange languages
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-6 w-full max-w-sm">
          {/* Start Conversation Button */}
          <Link href="/start-conversation" className="block">
            <Button 
              size="lg" 
              className="w-full h-16 text-xl font-medium bg-white hover:bg-white text-gray-800 hover:text-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Conversation
            </Button>
          </Link>

          {/* Join Conversation Button */}
          <Link href="/join-conversation" className="block">
            <Button 
              size="lg" 
              variant="outline"
              className="w-full h-16 text-xl font-medium border-2 border-white/30 text-white hover:bg-white hover:text-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Conversation
            </Button>
          </Link>
        </div>

        {/* Description */}
        <div className="mt-16 text-center">
          <p className="text-white/60 text-lg leading-relaxed">
            Create a conversation and share the QR code, or scan someone else's QR code to join their conversation. 
            Choose your language and see what language the other person speaks.
          </p>
        </div>
      </div>

      {/* Brand Name */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 ml-0.5 z-30">
        <img src="/remic-logo.png" alt="Remic" width={64} height={64} />
      </div>
    </main>
  )
}

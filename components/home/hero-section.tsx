"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [isMuted, setIsMuted] = useState(false)

  const handleMuteToggle = () => {
    if ((window as any).toggleBackgroundMusic) {
      ;(window as any).toggleBackgroundMusic()
      setIsMuted(!isMuted)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Embrace Yourself <span className="text-white">With Clippers</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            A sharp mind is just as important as a sharp blade—your mentality shapes every cut, every client, every
            success.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 text-white border-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/services">Explore Our Services</Link>
            </Button>

            <Button
              onClick={handleMuteToggle}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 text-white border-white hover:bg-white/10 bg-transparent"
            >
              {isMuted ? "Unmute Background" : "Mute Background"}
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  )
}

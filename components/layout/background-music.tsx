"use client"

import { useEffect, useRef, useState } from "react"

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Create audio element
    const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FREESTYLE%20TYPE%20BEAT%20-%20%20%20THIS%20BEAT%20KILLS%20%20%20_%20Trap%20Instrumental%202025%20_%20Rap%20Type%20Beat-TAcgvI3pQYv0CJbokb6RQ2LU8zYnLp.mp3")
    audio.loop = true
    audio.volume = 0.15 // Set to 15% volume for smooth background music
    audioRef.current = audio

    // Handle audio loading
    const handleCanPlay = () => {
      setIsLoaded(true)
      // Auto-play after a short delay
      setTimeout(() => {
        audio.play().catch((error) => {
          console.log("Autoplay prevented by browser:", error)
        })
      }, 1000)
    }

    audio.addEventListener("canplaythrough", handleCanPlay)

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay)
      audio.pause()
      audio.src = ""
    }
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.15
        audioRef.current.play().catch(console.log)
      } else {
        audioRef.current.volume = 0
        audioRef.current.pause()
      }
      setIsMuted(!isMuted)
    }
  }

  // Expose toggle function globally for the hero section
  useEffect(() => {
    ;(window as any).toggleBackgroundMusic = toggleMute
    return () => {
      delete (window as any).toggleBackgroundMusic
    }
  }, [isMuted])

  return null // No UI component needed, controlled from hero section
}

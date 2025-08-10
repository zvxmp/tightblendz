"use client"

import { useEffect, useRef, useState } from "react"

interface TrailPoint {
  x: number
  y: number
  opacity: number
}

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const trailPoints = useRef<TrailPoint[]>([])
  const animationId = useRef<number>()
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Detect if device supports touch
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches,
      )
    }

    checkTouchDevice()
    window.addEventListener("resize", checkTouchDevice)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Mouse/Touch move handler
    const handleMove = (x: number, y: number) => {
      mousePos.current = { x, y }
      trailPoints.current.push({
        x,
        y,
        opacity: 1,
      })

      // Adjust trail length based on device type
      const maxTrailLength = isTouchDevice ? 15 : 20
      if (trailPoints.current.length > maxTrailLength) {
        trailPoints.current.shift()
      }
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!isTouchDevice) {
        handleMove(e.clientX, e.clientY)
      }
    }

    // Touch move handler
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault() // Prevent scrolling while touching
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        handleMove(touch.clientX, touch.clientY)
      }
    }

    // Touch start handler
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        handleMove(touch.clientX, touch.clientY)
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x, y } = mousePos.current

      // Create radial gradient for ambient glow
      const glowSize = isTouchDevice ? 80 : 120
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize)

      // Gradient stops for smooth ambient glow
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.15)")
      gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.08)")
      gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.03)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      // Draw the ambient glow
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add a subtle inner glow for more depth
      const innerGlowSize = isTouchDevice ? 30 : 40
      const innerGradient = ctx.createRadialGradient(x, y, 0, x, y, innerGlowSize)

      innerGradient.addColorStop(0, "rgba(255, 255, 255, 0.25)")
      innerGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.1)")
      innerGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = innerGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw trail points
      trailPoints.current.forEach((point, index) => {
        // Fade out faster on touch devices for better performance
        const fadeRate = isTouchDevice ? 0.92 : 0.95
        point.opacity *= fadeRate

        // Adjust particle size based on device type
        const baseSize = isTouchDevice ? 4 : 3
        const size = baseSize + index * (isTouchDevice ? 0.3 : 0.5)

        // Draw circle
        ctx.beginPath()
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${point.opacity})`
        ctx.fill()

        // Reduce glow effect on touch devices for better performance
        if (!isTouchDevice || point.opacity > 0.7) {
          ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
          ctx.shadowBlur = isTouchDevice ? 5 : 10
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      // Remove fully faded points
      trailPoints.current = trailPoints.current.filter((point) => point.opacity > 0.01)

      animationId.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Add event listeners based on device type
    if (isTouchDevice) {
      document.addEventListener("touchstart", handleTouchStart, { passive: false })
      document.addEventListener("touchmove", handleTouchMove, { passive: false })
    } else {
      document.addEventListener("mousemove", handleMouseMove)
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("resize", checkTouchDevice)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
      if (animationId.current) {
        cancelAnimationFrame(animationId.current)
      }
    }
  }, [isTouchDevice])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{
        mixBlendMode: "screen",
        touchAction: "none", // Prevent default touch behaviors
      }}
    />
  )
}

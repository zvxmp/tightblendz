"use client"

import { useEffect, useRef } from "react"

export default function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Normalize mouse position to -1 to 1 range
      const normalizedX = (clientX / innerWidth) * 2 - 1
      const normalizedY = (clientY / innerHeight) * 2 - 1

      mousePos.current = { x: normalizedX, y: normalizedY }

      // Apply parallax transforms to different layers with enhanced depth
      const layers = container.querySelectorAll(".parallax-layer")

      layers.forEach((layer, index) => {
        const depth = (index + 1) * 1.2
        const moveX = normalizedX * depth * 35
        const moveY = normalizedY * depth * 35
        const rotateX = normalizedY * (depth * 0.8)
        const rotateY = normalizedX * (depth * 0.8)
        ;(layer as HTMLElement).style.transform = `
          translate3d(${moveX}px, ${moveY}px, 0) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg)
          scale(${1 + depth * 0.02})
        `
      })

      // Apply enhanced 3D rotation to the main container
      container.style.transform = `
        perspective(2000px) 
        rotateX(${normalizedY * 2}deg) 
        rotateY(${normalizedX * 2}deg)
      `
    }

    // Add mouse move listener
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.08s ease-out",
        background: "#000000",
      }}
    >
      {/* Star Field Layer 1 - Far */}
      <div
        className="parallax-layer absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 15%, rgba(255,255,255,0.8) 0.5px, transparent 1px),
            radial-gradient(circle at 25% 35%, rgba(255,255,255,0.6) 0.3px, transparent 1px),
            radial-gradient(circle at 45% 25%, rgba(255,255,255,0.9) 0.4px, transparent 1px),
            radial-gradient(circle at 65% 45%, rgba(255,255,255,0.5) 0.2px, transparent 1px),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.7) 0.6px, transparent 1px),
            radial-gradient(circle at 90% 60%, rgba(255,255,255,0.4) 0.3px, transparent 1px),
            radial-gradient(circle at 15% 75%, rgba(255,255,255,0.8) 0.5px, transparent 1px),
            radial-gradient(circle at 35% 85%, rgba(255,255,255,0.6) 0.4px, transparent 1px),
            radial-gradient(circle at 55% 70%, rgba(255,255,255,0.9) 0.3px, transparent 1px),
            radial-gradient(circle at 75% 90%, rgba(255,255,255,0.5) 0.2px, transparent 1px)
          `,
          backgroundSize:
            "400px 400px, 350px 350px, 500px 500px, 300px 300px, 450px 450px, 380px 380px, 420px 420px, 360px 360px, 480px 480px, 320px 320px",
          transform: "translateZ(-100px) scale(1.5)",
          transformStyle: "preserve-3d",
          animation: "starRotate1 60s linear infinite",
        }}
      />

      {/* Star Field Layer 2 - Medium */}
      <div
        className="parallax-layer absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 40%, rgba(255,255,255,0.9) 0.8px, transparent 1.5px),
            radial-gradient(circle at 40% 60%, rgba(255,255,255,0.7) 0.6px, transparent 1.2px),
            radial-gradient(circle at 60% 30%, rgba(255,255,255,1) 0.7px, transparent 1.4px),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.6) 0.5px, transparent 1px),
            radial-gradient(circle at 30% 20%, rgba(255,255,255,0.8) 0.9px, transparent 1.6px),
            radial-gradient(circle at 70% 50%, rgba(255,255,255,0.5) 0.4px, transparent 1px)
          `,
          backgroundSize: "600px 600px, 550px 550px, 700px 700px, 500px 500px, 650px 650px, 580px 580px",
          transform: "translateZ(-60px) scale(1.3)",
          transformStyle: "preserve-3d",
          animation: "starRotate2 45s linear infinite reverse",
        }}
      />

      {/* Star Field Layer 3 - Close */}
      <div
        className="parallax-layer absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 55%, rgba(255,255,255,1) 1px, transparent 2px),
            radial-gradient(circle at 35% 25%, rgba(255,255,255,0.8) 0.8px, transparent 1.6px),
            radial-gradient(circle at 55% 75%, rgba(255,255,255,1.2) 1.2px, transparent 2.4px),
            radial-gradient(circle at 75% 35%, rgba(255,255,255,0.7) 0.7px, transparent 1.4px),
            radial-gradient(circle at 85% 65%, rgba(255,255,255,0.9) 1px, transparent 2px)
          `,
          backgroundSize: "800px 800px, 750px 750px, 900px 900px, 700px 700px, 850px 850px",
          transform: "translateZ(-30px) scale(1.2)",
          transformStyle: "preserve-3d",
          animation: "starRotate3 30s linear infinite",
        }}
      />

      {/* Shooting Stars Layer */}
      <div
        className="parallax-layer absolute inset-0"
        style={{
          transform: "translateZ(-10px) scale(1.01)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Shooting Star 1 - Top Left to Bottom Right */}
        <div
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: "10%",
            left: "5%",
            boxShadow: "0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.5)",
            animation: "shootingStar1 6s linear infinite",
          }}
        />

        {/* Shooting Star 2 - Top Right to Bottom Left */}
        <div
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            top: "20%",
            right: "10%",
            boxShadow: "0 0 12px rgba(255,255,255,0.8), 0 0 24px rgba(255,255,255,0.4)",
            animation: "shootingStar2 8s linear infinite",
          }}
        />

        {/* Shooting Star 3 - Left to Right */}
        <div
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            top: "60%",
            left: "0%",
            boxShadow: "0 0 10px rgba(255,255,255,0.7), 0 0 20px rgba(255,255,255,0.3)",
            animation: "shootingStar3 10s linear infinite",
          }}
        />

        {/* Shooting Star 4 - Bottom to Top */}
        <div
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            bottom: "15%",
            left: "30%",
            boxShadow: "0 0 8px rgba(255,255,255,0.6), 0 0 16px rgba(255,255,255,0.2)",
            animation: "shootingStar4 12s linear infinite",
          }}
        />

        {/* Shooting Star 5 - Diagonal */}
        <div
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: "40%",
            right: "5%",
            boxShadow: "0 0 18px rgba(255,255,255,1), 0 0 36px rgba(255,255,255,0.6)",
            animation: "shootingStar5 7s linear infinite",
          }}
        />

        {/* Shooting Star 6 - Fast Diagonal */}
        <div
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            top: "80%",
            right: "20%",
            boxShadow: "0 0 6px rgba(255,255,255,0.5), 0 0 12px rgba(255,255,255,0.2)",
            animation: "shootingStar6 4s linear infinite",
          }}
        />
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes starRotate1 {
          0% { 
            transform: translateZ(-100px) scale(1.5) rotate(0deg); 
          }
          100% { 
            transform: translateZ(-100px) scale(1.5) rotate(360deg); 
          }
        }

        @keyframes starRotate2 {
          0% { 
            transform: translateZ(-60px) scale(1.3) rotate(0deg); 
          }
          100% { 
            transform: translateZ(-60px) scale(1.3) rotate(-360deg); 
          }
        }

        @keyframes starRotate3 {
          0% { 
            transform: translateZ(-30px) scale(1.2) rotate(0deg); 
          }
          100% { 
            transform: translateZ(-30px) scale(1.2) rotate(360deg); 
          }
        }

        @keyframes shootingStar1 {
          0% { 
            transform: translateX(-150px) translateY(-100px) rotate(45deg); 
            opacity: 0; 
          }
          5% { 
            opacity: 1; 
          }
          95% { 
            opacity: 1; 
          }
          100% { 
            transform: translateX(calc(100vw + 150px)) translateY(calc(100vh + 100px)) rotate(45deg); 
            opacity: 0; 
          }
        }

        @keyframes shootingStar2 {
          0% { 
            transform: translateX(150px) translateY(-100px) rotate(-45deg); 
            opacity: 0; 
          }
          8% { 
            opacity: 1; 
          }
          92% { 
            opacity: 1; 
          }
          100% { 
            transform: translateX(calc(-150px)) translateY(calc(100vh + 100px)) rotate(-45deg); 
            opacity: 0; 
          }
        }

        @keyframes shootingStar3 {
          0% { 
            transform: translateX(-200px) translateY(0px) rotate(0deg); 
            opacity: 0; 
          }
          10% { 
            opacity: 1; 
          }
          90% { 
            opacity: 1; 
          }
          100% { 
            transform: translateX(calc(100vw + 200px)) translateY(0px) rotate(0deg); 
            opacity: 0; 
          }
        }

        @keyframes shootingStar4 {
          0% { 
            transform: translateX(0px) translateY(200px) rotate(-90deg); 
            opacity: 0; 
          }
          12% { 
            opacity: 1; 
          }
          88% { 
            opacity: 1; 
          }
          100% { 
            transform: translateX(0px) translateY(-200px) rotate(-90deg); 
            opacity: 0; 
          }
        }

        @keyframes shootingStar5 {
          0% { 
            transform: translateX(150px) translateY(-150px) rotate(135deg); 
            opacity: 0; 
          }
          7% { 
            opacity: 1; 
          }
          93% { 
            opacity: 1; 
          }
          100% { 
            transform: translateX(-150px) translateY(calc(100vh + 150px)) rotate(135deg); 
            opacity: 0; 
          }
        }

        @keyframes shootingStar6 {
          0% { 
            transform: translateX(100px) translateY(100px) rotate(-135deg); 
            opacity: 0; 
          }
          15% { 
            opacity: 1; 
          }
          85% { 
            opacity: 1; 
          }
          100% { 
            transform: translateX(-100px) translateY(-100px) rotate(-135deg); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  )
}

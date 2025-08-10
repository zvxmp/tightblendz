import type { Metadata } from "next"
import HeroSection from "@/components/home/hero-section"

export const metadata: Metadata = {
  title: "Tight Blendz - Embrace Yourself With Clippers",
  description:
    "A sharp mind is just as important as a sharp blade—your mentality shapes every cut, every client, every success.",
}

export default function Home() {
  return (
    <>
      <HeroSection />
    </>
  )
}

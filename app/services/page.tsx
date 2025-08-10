import type { Metadata } from "next"
import ServicesTabs from "@/components/services/services-tabs"

export const metadata: Metadata = {
  title: "Our Services - Tight Blendz",
  description:
    "Explore our wide range of beauty and grooming services for men and women, including haircuts, styling, nail care, and makeup.",
}

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-16 relative min-h-screen">
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h1 className="heading-xl mb-4">Our Services</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Discover our comprehensive range of grooming services designed to elevate your style.
          </p>
        </div>
        <ServicesTabs />
      </div>
    </div>
  )
}

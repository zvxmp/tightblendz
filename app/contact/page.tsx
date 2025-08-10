import type { Metadata } from "next"
import ContactInfo from "@/components/contact/contact-info"

export const metadata: Metadata = {
  title: "Contact Us - Tight Blendz",
  description: "Get in touch with Tight Blendz. Find our contact information.",
}

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16 relative min-h-screen">
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h1 className="heading-xl mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-white/90">Get in touch with us for appointments and inquiries.</p>
        </div>
        <div className="max-w-2xl mx-auto">
          <ContactInfo />
        </div>
      </div>
    </div>
  )
}

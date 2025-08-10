import Image from "next/image"

export default function ServicesBanner() {
  return (
    <section className="relative pt-32 pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=600&fit=crop&crop=center&auto=format&q=80"
          alt="Dark brick wall with atmospheric smoke"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="heading-xl mb-4">Our Services</h1>
          <p className="text-lg md:text-xl text-white/90">
            Discover our comprehensive range of grooming services designed to elevate your style.
          </p>
        </div>
      </div>
    </section>
  )
}

"use client"

import { usePathname } from "next/navigation"

export default function PageTransition() {
  const pathname = usePathname()

  // Component exists but no longer plays sound effects
  // Just tracks pathname changes for potential future use

  return null
}

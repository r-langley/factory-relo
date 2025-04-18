"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"
import { track } from "@vercel/analytics/react"

interface AnnouncementBannerProps {
  className?: string
}

export function AnnouncementBanner({ className = "" }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleLinkClick = () => {
    // Track when users click the tariff analysis tool link
    track("banner_link_clicked", {
      destination: "tariffsim.com",
      banner_text: "Looking to understand your tariff exposure?",
    })
  }

  const handleClose = () => {
    // Track when users close the banner
    track("banner_closed")
    setIsVisible(false)
  }

  return (
    <div className={`bg-[#975A16] text-white py-2 px-4 relative ${className}`}>
      <div className="mx-auto w-[95vw] sm:w-[85vw] md:w-[75vw] lg:max-w-[60vw] flex items-center justify-center">
        <p className="text-center text-sm">
          Looking to understand your tariff exposure?{" "}
          <Link
            href="https://www.tariffsim.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium"
            onClick={handleLinkClick}
          >
            Check out our Tariff Analysis Tool here
          </Link>
        </p>
        <button
          onClick={handleClose}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

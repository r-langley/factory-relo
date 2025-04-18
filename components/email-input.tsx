"use client"

import { PaperAirplane } from "./icons/paper-airplane"

interface EmailInputProps {
  placeholder?: string
  className?: string
}

export function EmailInput({ placeholder = "Enter your email", className = "" }: EmailInputProps) {
  return (
    <div className={`relative max-w-md mx-auto ${className}`}>
      <input
        type="email"
        placeholder={placeholder}
        aria-label="Email address"
        className="w-full py-3 px-5 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-[#8B3E2F] text-gray-600 placeholder-gray-400"
      />
      <button
        className="absolute right-2.5 top-1/2 transform -translate-y-[calc(50%+2px)] bg-transparent p-2 text-[#8B3E2F] hover:text-[#6F3226] transition-colors"
        aria-label="Submit email"
      >
        <PaperAirplane className="h-5 w-5 transform scale-75 -rotate-45" />
      </button>
    </div>
  )
}

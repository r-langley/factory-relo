"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, Shield } from "lucide-react"
import { track } from "@vercel/analytics/react"

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorDetails, setErrorDetails] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setErrorDetails(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      })

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Server returned non-JSON response: ${await response.text()}`)
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Track successful form submission
      track("contact_form_submitted", {
        location: "modal",
        hasMessage: message.length > 0,
      })

      setIsSubmitted(true)
    } catch (error: any) {
      console.error("Error submitting form:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")

      // Track form submission error
      track("contact_form_error", {
        location: "modal",
        errorType: error instanceof Error ? error.message : "unknown",
      })

      // Try to extract more details if available
      try {
        if (error.response) {
          const errorResponse = await error.response.json()
          if (errorResponse?.details) {
            setErrorDetails(errorResponse.details)
          }
        }
      } catch (e) {
        // Ignore json parsing errors
        console.log("Could not parse error details")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setName("")
    setEmail("")
    setMessage("")
    setIsSubmitted(false)
    setError(null)
    setErrorDetails(null)
    onClose()
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          if (isSubmitted) {
            resetForm()
          } else {
            onClose()
          }
        } else {
          // Track modal open
          track("contact_form_opened", { location: "modal" })
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px] bg-[#f5f0e4]">
        <button
          onClick={isSubmitted ? resetForm : onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {isSubmitted ? (
          <div className="text-center py-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Thank you for your message!</h3>
            <p className="text-gray-600 mb-4">We'll be in touch with you shortly with your relocation assessment.</p>
            <Button onClick={resetForm} className="bg-[#8B3E2F] hover:bg-[#6F3226] text-white">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Get Your Relocation Assessment</h2>
              <p className="text-gray-600 mb-6">
                Tell us about your current manufacturing setup and we'll reach out to provide free advanced analysis of
                your program and relocation opportunities.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                <p className="font-medium">{error}</p>
                {errorDetails && <p className="text-sm mt-1">{errorDetails}</p>}
              </div>
            )}

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
                className="border-gray-300 focus:border-[#8B3E2F] focus:ring-[#8B3E2F] bg-white"
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your.email@company.com"
                className="border-gray-300 focus:border-[#8B3E2F] focus:ring-[#8B3E2F] bg-white"
              />
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Project Details (Optional)</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your factory relocation needs (timeline, equipment types, location)"
                className="min-h-[120px] border-gray-300 focus:border-[#8B3E2F] focus:ring-[#8B3E2F] bg-white"
              />
            </div>

            <div className="flex items-center gap-3 text-gray-600 text-sm bg-[#f0e8d9] border border-[#e5dfd0] p-3 rounded-md">
              <Shield className="h-5 w-5 text-[#8B3E2F] flex-shrink-0" />
              <p className="text-left">We never use your information for anything other than private communications.</p>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full bg-[#8B3E2F] hover:bg-[#6F3226] text-white">
              {isSubmitting ? "Submitting..." : "Get Your Assessment"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

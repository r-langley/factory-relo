"use client"

import { useEffect, useState } from "react"
import { supabaseServer } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { track } from "@vercel/analytics/react"

interface ContactSubmission {
  id: string
  name: string
  email: string
  message?: string
  created_at: string
  status: string
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Track admin page view
    track("page_view", { page: "admin" })

    async function fetchSubmissions() {
      try {
        const { data, error } = await supabaseServer
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) {
          throw new Error(error.message)
        }

        setSubmissions(data || [])

        // Track successful data fetch
        track("admin_data_loaded", { count: data?.length || 0 })
      } catch (err: any) {
        console.error("Error fetching submissions:", err)
        setError(err.message)

        // Track error
        track("admin_data_error", { error: err.message })
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabaseServer.from("contact_submissions").update({ status }).eq("id", id)

      if (error) {
        throw new Error(error.message)
      }

      // Update local state
      setSubmissions(submissions.map((sub) => (sub.id === id ? { ...sub, status } : sub)))

      // Track status update
      track("admin_status_updated", { status })
    } catch (err: any) {
      console.error("Error updating status:", err)
      setError(err.message)

      // Track error
      track("admin_status_error", { error: err.message })
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading submissions...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">Error: {error}</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-6">Contact Form Submissions</h1>

      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div className="grid gap-6">
          {submissions.map((submission) => (
            <div key={submission.id} className="border p-4 rounded-lg bg-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="font-medium">{submission.name}</h2>
                  <p className="text-sm text-gray-600">{submission.email}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-2">{new Date(submission.created_at).toLocaleString()}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      submission.status === "new"
                        ? "bg-blue-100 text-blue-800"
                        : submission.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
              </div>

              {submission.message ? (
                <p className="mb-4 whitespace-pre-wrap">{submission.message}</p>
              ) : (
                <p className="mb-4 text-gray-500 italic">No message provided</p>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={submission.status === "new" ? "default" : "outline"}
                  onClick={() => updateStatus(submission.id, "new")}
                  className="text-xs"
                >
                  New
                </Button>
                <Button
                  size="sm"
                  variant={submission.status === "in-progress" ? "default" : "outline"}
                  onClick={() => updateStatus(submission.id, "in-progress")}
                  className="text-xs"
                >
                  In Progress
                </Button>
                <Button
                  size="sm"
                  variant={submission.status === "completed" ? "default" : "outline"}
                  onClick={() => updateStatus(submission.id, "completed")}
                  className="text-xs"
                >
                  Completed
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

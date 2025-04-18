import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json().catch((error) => {
      console.error("Error parsing request body:", error)
      return null
    })

    // If body parsing failed, return a proper JSON error
    if (!body) {
      return NextResponse.json(
        {
          error: "Invalid request body",
        },
        { status: 400 },
      )
    }

    const { name, email, message = "" } = body

    // Validate form data - only name and email are required now
    if (!name || !email) {
      return NextResponse.json(
        {
          error: "Name and email are required",
        },
        { status: 400 },
      )
    }

    console.log("Storing contact submission in Supabase")

    try {
      // Insert the form submission into Supabase
      const { data, error } = await supabaseServer
        .from("contact_submissions")
        .insert([{ name, email, message, status: "new" }])
        .select()

      if (error) {
        console.error("Supabase error:", error)
        return NextResponse.json(
          {
            error: "Failed to store contact submission",
            details: error.message,
          },
          { status: 500 },
        )
      }

      console.log("Contact submission stored successfully:", data)
      return NextResponse.json({
        success: true,
        message: "Your message has been received. We'll get back to you soon!",
      })
    } catch (dbError: any) {
      console.error("Database operation error:", dbError)
      return NextResponse.json(
        {
          error: "Database operation failed",
          details: dbError.message || "Unknown database error",
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Server Error:", error)
    return NextResponse.json(
      {
        error: "Server error processing request",
        details: error.message || "Unknown server error",
      },
      { status: 500 },
    )
  }
}

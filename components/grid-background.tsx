"use client"

import { useEffect, useRef, useState } from "react"

interface GridBackgroundProps {
  className?: string
}

export function GridBackground({ className }: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        // Get device pixel ratio
        const dpr = window.devicePixelRatio || 1

        // Set display size
        const width = window.innerWidth
        const height = window.innerHeight
        setDimensions({ width, height })

        // Set actual size in memory (scaled to account for extra pixel density)
        canvasRef.current.width = width * dpr
        canvasRef.current.height = height * dpr

        // Set CSS size
        canvasRef.current.style.width = `${width}px`
        canvasRef.current.style.height = `${height}px`

        // Scale context to ensure correct drawing operations
        const ctx = canvasRef.current.getContext("2d")
        if (ctx) {
          ctx.scale(dpr, dpr)
          // Disable anti-aliasing for crisp lines
          ctx.imageSmoothingEnabled = false
        }
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get the mouse position relative to the viewport
      const x = e.clientX
      const y = e.clientY

      setMousePosition({
        x: x,
        y: y,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Draw grid
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const { width, height } = dimensions

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Grid settings
    const gridSize = 40
    const lineWidth = 0.5 // Thinnest possible line

    // Calculate distance from mouse to determine opacity
    const calculateOpacity = (x: number, y: number) => {
      const dx = mousePosition.x - x
      const dy = mousePosition.y - y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = 175

      // Higher opacity near mouse, fading out with distance
      return Math.max(0.06, Math.pow(1 - distance / maxDistance, 1.5) * 0.7)
    }

    // Ensure pixel-perfect alignment
    const alignToPixel = (coord: number) => Math.round(coord) + 0.5

    // Draw vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      const opacity = calculateOpacity(x, mousePosition.y)
      const pixelX = alignToPixel(x)

      ctx.beginPath()
      ctx.moveTo(pixelX, 0)
      ctx.lineTo(pixelX, height)
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = `rgba(139, 62, 47, ${opacity})`
      ctx.stroke()
    }

    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      const opacity = calculateOpacity(mousePosition.x, y)
      const pixelY = alignToPixel(y)

      ctx.beginPath()
      ctx.moveTo(0, pixelY)
      ctx.lineTo(width, pixelY)
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = `rgba(139, 62, 47, ${opacity})`
      ctx.stroke()
    }

    // Draw dots at intersections
    for (let x = 0; x <= width; x += gridSize) {
      for (let y = 0; y <= height; y += gridSize) {
        const opacity = calculateOpacity(x, y) * 2
        const pixelX = alignToPixel(x)
        const pixelY = alignToPixel(y)

        // Use a single pixel rectangle instead of arc for sharper dots
        ctx.fillStyle = `rgba(139, 62, 47, ${opacity})`
        ctx.fillRect(pixelX - 0.5, pixelY - 0.5, 1, 1)
      }
    }
  }, [mousePosition, dimensions])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{
        zIndex: 0,
        imageRendering: "pixelated", // Ensure crisp rendering
      }}
      aria-hidden="true"
    />
  )
}

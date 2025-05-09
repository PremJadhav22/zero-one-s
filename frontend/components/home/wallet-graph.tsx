"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function WalletGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr

      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Mouse position for interactive effects
    let mouseX = 0
    let mouseY = 0

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    })

    // Node class with enhanced visual effects
    class Node {
      x: number
      y: number
      baseRadius: number
      radius: number
      color: string
      vx: number
      vy: number
      angle: number
      pulseSpeed: number
      glowSize: number
      glowOpacity: number
      isNFT: boolean
      score: number | null

      constructor(x: number, y: number, radius: number, color: string, isNFT = false, score: number | null = null) {
        this.x = x
        this.y = y
        this.baseRadius = radius
        this.radius = radius
        this.color = color
        this.vx = (Math.random() - 0.5) * 1.2
        this.vy = (Math.random() - 0.5) * 1.2
        this.angle = Math.random() * Math.PI * 2
        this.pulseSpeed = 0.02 + Math.random() * 0.03
        this.glowSize = 15 + Math.random() * 10
        this.glowOpacity = 0.5 + Math.random() * 0.5
        this.isNFT = isNFT
        this.score = score
      }

      draw() {
        if (!ctx) return

        // Pulse effect
        this.radius = this.baseRadius + Math.sin(this.angle) * (this.baseRadius * 0.2)
        this.angle += this.pulseSpeed

        // Interactive effect - nodes react to mouse proximity
        if (canvas) {
          const dx = mouseX - this.x
          const dy = mouseY - this.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const force = (100 - distance) / 500
            this.vx += dx * force
            this.vy += dy * force
            this.glowSize = 20 + (100 - distance) / 5
            this.glowOpacity = 0.8
          }
        }

        // Draw glow effect
        const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.5, this.x, this.y, this.radius * 2)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(
          1,
          `rgba(${this.color
            .slice(1)
            .match(/.{2}/g)
            ?.map((hex) => Number.parseInt(hex, 16))
            .join(", ")}, 0)`,
        )

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.globalAlpha = this.glowOpacity
        ctx.fill()
        ctx.globalAlpha = 1

        // Draw node
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Draw NFT representation if this is an NFT node
        if (this.isNFT) {
          // Animated NFT border
          ctx.strokeStyle = `hsl(${(Date.now() / 50) % 360}, 100%, 70%)`
          ctx.lineWidth = 2
          const squareSize = this.radius * 2
          ctx.strokeRect(this.x - squareSize / 2, this.y - squareSize / 2, squareSize, squareSize)

          // NFT label with glow
          ctx.shadowColor = this.color
          ctx.shadowBlur = 10
          ctx.fillStyle = "#ffffff"
          ctx.font = "bold 10px Arial"
          ctx.textAlign = "center"
          ctx.fillText("NFT", this.x, this.y + this.radius + 12)
          ctx.shadowBlur = 0
        }

        // Display score if available with dramatic effect
        if (this.score !== null) {
          ctx.shadowColor = "#ffffff"
          ctx.shadowBlur = 15
          ctx.fillStyle = "#ffffff"
          ctx.font = "bold 14px Arial"
          ctx.textAlign = "center"
          ctx.fillText(this.score.toString(), this.x, this.y + 5)

          // Add a circular score indicator
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.radius * 1.2, 0, Math.PI * 2)
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
          ctx.lineWidth = 2
          ctx.stroke()

          // Add score percentage arc
          const scorePercent = this.score / 100
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.radius * 1.2, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * scorePercent)
          ctx.strokeStyle = "#38bdf8"
          ctx.lineWidth = 3
          ctx.stroke()
          ctx.shadowBlur = 0
        }
      }

      update() {
        if (!canvas) return

        // Apply velocity with damping
        this.x += this.vx
        this.y += this.vy
        this.vx *= 0.98
        this.vy *= 0.98

        // Bounce off edges with visual effect
        const width = canvas.width / window.devicePixelRatio
        const height = canvas.height / window.devicePixelRatio

        if (this.x + this.radius > width || this.x - this.radius < 0) {
          this.vx = -this.vx * 1.1
          if (this.x + this.radius > width) this.x = width - this.radius
          if (this.x - this.radius < 0) this.x = this.radius
        }

        if (this.y + this.radius > height || this.y - this.radius < 0) {
          this.vy = -this.vy * 1.1
          if (this.y + this.radius > height) this.y = height - this.radius
          if (this.y - this.radius < 0) this.y = this.radius
        }

        this.draw()
      }
    }

    // Edge class with enhanced visual effects
    class Edge {
      nodeA: Node
      nodeB: Node
      pulseSpeed: number
      pulsePhase: number

      constructor(nodeA: Node, nodeB: Node) {
        this.nodeA = nodeA
        this.nodeB = nodeB
        this.pulseSpeed = 0.03 + Math.random() * 0.02
        this.pulsePhase = Math.random() * Math.PI * 2
      }

      draw() {
        if (!ctx) return

        const dx = this.nodeB.x - this.nodeA.x
        const dy = this.nodeB.y - this.nodeA.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Only draw edges if nodes are close enough
        if (distance < 180) {
          const opacity = 1 - distance / 180

          // Animated gradient for edges
          const gradient = ctx.createLinearGradient(this.nodeA.x, this.nodeA.y, this.nodeB.x, this.nodeB.y)

          // Pulse effect for edges
          const pulse = (Math.sin(this.pulsePhase) + 1) / 2
          this.pulsePhase += this.pulseSpeed

          gradient.addColorStop(0, this.nodeA.color)
          gradient.addColorStop(1, this.nodeB.color)

          ctx.beginPath()
          ctx.moveTo(this.nodeA.x, this.nodeA.y)
          ctx.lineTo(this.nodeB.x, this.nodeB.y)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1 + pulse * 2
          ctx.globalAlpha = opacity * (0.5 + pulse * 0.5)
          ctx.stroke()
          ctx.globalAlpha = 1

          // Add energy particles along the edge
          if (Math.random() < 0.2) {
            const particlePos = Math.random()
            const particleX = this.nodeA.x + dx * particlePos
            const particleY = this.nodeA.y + dy * particlePos

            ctx.beginPath()
            ctx.arc(particleX, particleY, 1 + Math.random() * 2, 0, Math.PI * 2)
            ctx.fillStyle = "#ffffff"
            ctx.globalAlpha = 0.7
            ctx.fill()
            ctx.globalAlpha = 1
          }
        }
      }
    }

    // Create background particles
    class Particle {
      x: number
      y: number
      size: number
      speed: number
      color: string

      constructor() {
        if (!canvas) return

        const width = canvas.width / window.devicePixelRatio
        const height = canvas.height / window.devicePixelRatio

        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = 0.5 + Math.random() * 1.5
        this.speed = 0.2 + Math.random() * 0.3
        this.color = Math.random() > 0.5 ? "rgba(124, 58, 237, 0.7)" : "rgba(56, 189, 248, 0.7)"
      }

      update() {
        if (!canvas || !ctx) return

        const width = canvas.width / window.devicePixelRatio
        const height = canvas.height / window.devicePixelRatio

        this.y += this.speed

        if (this.y > height) {
          this.y = 0
          this.x = Math.random() * width
        }

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Create nodes
    const nodes: Node[] = []
    const centerX = canvas.width / (2 * window.devicePixelRatio)
    const centerY = canvas.height / (2 * window.devicePixelRatio)

    // Central wallet node with score
    nodes.push(new Node(centerX, centerY, 20, "#7c3aed", false, 87))

    // Connected nodes including NFTs
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 2
      const distance = 80 + Math.random() * 60
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      // Alternate between purple and blue with occasional green
      let color
      if (i % 5 === 0) {
        color = "#10b981" // Green for variety
      } else if (i % 2 === 0) {
        color = "#38bdf8" // Blue
      } else {
        color = "#7c3aed" // Purple
      }

      // Make some nodes NFTs
      const isNFT = i % 4 === 0

      nodes.push(new Node(x, y, 6 + Math.random() * 6, color, isNFT, null))
    }

    // Create edges
    const edges: Edge[] = []
    for (let i = 1; i < nodes.length; i++) {
      edges.push(new Edge(nodes[0], nodes[i]))

      // Connect some nodes to each other for a more complex network
      if (i < nodes.length - 1) {
        if (Math.random() > 0.6) {
          edges.push(new Edge(nodes[i], nodes[i + 1]))
        }

        // Add some cross connections for more complexity
        if (Math.random() > 0.8 && i > 2) {
          const randomNode = Math.floor(Math.random() * i)
          edges.push(new Edge(nodes[i], nodes[randomNode]))
        }
      }
    }

    // Create background particles
    const particles: Particle[] = []
    for (let i = 0; i < 30; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

      // Draw background particles
      particles.forEach((particle) => particle.update())

      // Draw edges
      edges.forEach((edge) => edge.draw())

      // Draw and update nodes
      nodes.forEach((node) => node.update())

      // Add occasional energy burst from central node
      if (Math.random() < 0.02) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.fill()

        ctx.beginPath()
        ctx.arc(centerX, centerY, 40, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(124, 58, 237, 0.5)"
        ctx.lineWidth = 2
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      canvas.removeEventListener("mousemove", () => {})
    }
  }, [])

  return (
    <motion.div
      className="relative h-[400px] w-full max-w-[500px] rounded-xl border border-purple-500/20 bg-black/20 p-4 backdrop-blur-sm"
      animate={{
        boxShadow: [
          "0 0 15px 2px rgba(124, 58, 237, 0.2)",
          "0 0 20px 5px rgba(56, 189, 248, 0.2)",
          "0 0 15px 2px rgba(124, 58, 237, 0.2)",
        ],
      }}
      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </motion.div>
  )
}

"use client"

import { motion } from "framer-motion"
import { BarChart3, Fingerprint, Share2 } from "lucide-react"

const steps = [
  {
    title: "Analyze On-Chain Behavior",
    description: "Our AI analyzes wallet transactions, smart contract interactions, and on-chain activity.",
    icon: BarChart3,
    color: "from-purple-500 to-purple-700",
    delay: 0.1,
  },
  {
    title: "Mint a Soulbound Reputation NFT",
    description: "Receive a non-transferable SBT that represents your on-chain reputation score.",
    icon: Fingerprint,
    color: "from-blue-500 to-blue-700",
    delay: 0.3,
  },
  {
    title: "Use It Across Web3",
    description: "Leverage your reputation for better rates, access to exclusive opportunities, and more.",
    icon: Share2,
    color: "from-purple-500 to-blue-500",
    delay: 0.5,
  },
]

export default function Steps() {
  return (
    <section className="container py-20">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
        <p className="mt-4 text-lg text-muted-foreground">Three simple steps to establish your on-chain reputation</p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="glass flex flex-col items-center rounded-xl border border-border/50 p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: step.delay }}
          >
            <div
              className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${step.color}`}
            >
              <step.icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
            <p className="text-muted-foreground">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

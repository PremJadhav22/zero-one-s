"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/use-wallet"
import WalletGraph from "@/components/home/wallet-graph"

export default function Hero() {
  const { connectWallet } = useWallet()

  return (
    <section className="container py-20 md:py-32">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <motion.div
          className="flex flex-col justify-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated Text */}
          <motion.h1
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl relative text-gradient shimmer-effect"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.span
              className="reflective-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              AI-Powered Reputation
            </motion.span>{" "}
            for Web3
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Know who to trust in a trustless world.
          </motion.p>

          <motion.div
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Button
              onClick={connectWallet}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Connect Wallet
            </Button>

            <Link href="/dashboard?demo=true">
              <Button variant="outline" size="lg" className="border-purple-500/50 hover:border-purple-500 glow-purple">
                Explore Demo
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <WalletGraph />
        </motion.div>
      </div>
    </section>
  )
}

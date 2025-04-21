"use client"

import { motion } from "framer-motion"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/use-wallet"

export default function WalletConnect() {
  const { connectWallet } = useWallet()

  return (
    <motion.div
      className="flex flex-col items-center space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex h-24 w-24 items-center justify-center rounded-full bg-purple-500/20"
        animate={{
          boxShadow: [
            "0 0 0 rgba(124, 58, 237, 0.4)",
            "0 0 20px rgba(124, 58, 237, 0.6)",
            "0 0 0 rgba(124, 58, 237, 0.4)",
          ],
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <Wallet className="h-12 w-12 text-purple-500" />
      </motion.div>

      <div className="text-center">
        <p className="text-muted-foreground">
          Connect your wallet to analyze your on-chain reputation and mint your Soulbound Token (SBT).
        </p>
      </div>

      <Button
        onClick={connectWallet}
        size="lg"
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
      >
        Connect Wallet
      </Button>

      <p className="text-xs text-muted-foreground">
        By connecting, you agree to our Terms of Service and Privacy Policy.
      </p>
    </motion.div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/use-wallet"
import WalletConnect from "@/components/connect/wallet-connect"
import WalletAnalysis from "@/components/connect/wallet-analysis"

export default function ConnectPage() {
  const { isConnected } = useWallet()
  const router = useRouter()
  const [stage, setStage] = useState<"connect" | "analyze" | "complete">(isConnected ? "analyze" : "connect")

  useEffect(() => {
    if (isConnected && stage === "connect") {
      setStage("analyze")
    }

    if (stage === "analyze") {
      const timer = setTimeout(() => {
        setStage("complete")
      }, 5000)

      return () => clearTimeout(timer)
    }

    if (stage === "complete") {
      const timer = setTimeout(() => {
        router.push("/dashboard")
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [isConnected, stage, router])

  return (
    <main className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass border-purple-500/20 backdrop-blur-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">NeuralTrust – Your Reputation Awaits</CardTitle>
            <CardDescription>Connect your wallet to analyze your on-chain reputation</CardDescription>
          </CardHeader>
          <CardContent>
            {stage === "connect" && <WalletConnect />}
            {stage === "analyze" && <WalletAnalysis />}
            {stage === "complete" && (
              <motion.div
                className="flex flex-col items-center space-y-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
                  <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Analysis Complete!</h3>
                <p className="text-muted-foreground">Your SBT has been minted successfully.</p>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  View Your Dashboard
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  )
}

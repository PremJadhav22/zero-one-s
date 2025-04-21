"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { useWallet } from "@/hooks/use-wallet"
import NftDisplay from "@/components/dashboard/nft-display"
import ScoreBreakdown from "@/components/dashboard/score-breakdown"
import GraphView from "@/components/dashboard/graph-view"

export default function DashboardPage() {
  const { isConnected, ensName } = useWallet()
  const searchParams = useSearchParams()
  const isDemo = searchParams.get("demo") === "true"
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!isConnected && !isDemo) {
    return (
      <main className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
        <Card className="glass max-w-md border-purple-500/20 p-8 text-center backdrop-blur-lg">
          <h2 className="text-2xl font-bold">Connect Your Wallet</h2>
          <p className="mt-2 text-muted-foreground">Please connect your wallet to view your dashboard.</p>
        </Card>
      </main>
    )
  }

  return (
    <main className="container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold tracking-tight">
          {isDemo ? "Demo Dashboard" : `Dashboard ${ensName ? `for ${ensName}` : ""}`}
        </h1>
        <p className="mt-2 text-muted-foreground">View your reputation score and on-chain analytics</p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <NftDisplay isLoading={isLoading} />
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="breakdown" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="breakdown">Score Breakdown</TabsTrigger>
                <TabsTrigger value="graph">Graph View</TabsTrigger>
              </TabsList>
              <TabsContent value="breakdown">
                <ScoreBreakdown isLoading={isLoading} />
              </TabsContent>
              <TabsContent value="graph">
                <GraphView isLoading={isLoading} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </main>
  )
}

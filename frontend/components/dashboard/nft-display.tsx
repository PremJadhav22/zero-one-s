"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface NftDisplayProps {
  isLoading: boolean
}

export default function NftDisplay({ isLoading }: NftDisplayProps) {
  const score = 87
  const tier = score >= 80 ? "Trusted" : score >= 50 ? "New" : "Suspicious"
  const tierColor = tier === "Trusted" ? "bg-green-500" : tier === "New" ? "bg-blue-500" : "bg-red-500"

  return (
    <Card className="glass border-purple-500/20 backdrop-blur-lg">
      <CardHeader>
        <CardTitle>Soulbound Reputation NFT</CardTitle>
        <CardDescription>Your on-chain reputation token</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        {isLoading ? (
          <Skeleton className="h-[300px] w-full rounded-xl" />
        ) : (
          <motion.div
            className="relative h-[300px] w-full overflow-hidden rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-blue-900/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <motion.div
                className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.span
                  className="text-3xl font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {score}
                </motion.span>
              </motion.div>

              <motion.h3
                className="text-xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Reputation Score
              </motion.h3>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
                <Badge className={`mt-2 ${tierColor}`}>{tier}</Badge>
              </motion.div>

              <motion.p
                className="mt-4 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                SBT ID: #NT-
                {Math.floor(Math.random() * 10000)
                  .toString()
                  .padStart(4, "0")}
              </motion.p>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl"
              animate={{
                opacity: [0.4, 0.6, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.div
              className="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        )}

        {!isLoading && (
          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Minted</span>
              <span>April 20, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Updated</span>
              <span>April 20, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Token Standard</span>
              <span>ERC-5192 (Soulbound)</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

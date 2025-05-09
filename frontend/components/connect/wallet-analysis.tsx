"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const stages = [
  { id: 1, text: "Analyzing wallet transactions..." },
  { id: 2, text: "Calculating reputation score..." },
  { id: 3, text: "Minting Soulbound Token..." },
]

export default function WalletAnalysis() {
  const [currentStage, setCurrentStage] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 33 && currentStage === 0) {
      setCurrentStage(1)
    } else if (progress >= 66 && currentStage === 1) {
      setCurrentStage(2)
    }
  }, [progress, currentStage])

  return (
    <motion.div
      className="flex flex-col space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center">
        <motion.div
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/20"
          animate={{
            boxShadow: [
              "0 0 0 rgba(124, 58, 237, 0.4)",
              "0 0 20px rgba(124, 58, 237, 0.6)",
              "0 0 0 rgba(124, 58, 237, 0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
        </motion.div>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-medium">{stages[currentStage].text}</h3>
        </div>

        <Progress value={progress} className="h-2 bg-muted" />

        <div className="space-y-2">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              className="flex items-center space-x-2"
              initial={{ opacity: 0.5 }}
              animate={{
                opacity: index <= currentStage ? 1 : 0.5,
                color: index < currentStage ? "#7c3aed" : "inherit",
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  index < currentStage
                    ? "bg-purple-500 text-white"
                    : index === currentStage
                      ? "border-2 border-purple-500"
                      : "border-2 border-muted"
                }`}
              >
                {index < currentStage && (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm">{stage.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

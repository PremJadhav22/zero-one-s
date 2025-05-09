"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
  Legend,
} from "recharts"

interface ScoreBreakdownProps {
  isLoading: boolean
}

const pieData = [
  { name: "TX History", value: 35, color: "#7c3aed" },
  { name: "DAO Participation", value: 20, color: "#38bdf8" },
  { name: "Contract Diversity", value: 15, color: "#10b981" },
  { name: "NFT Activity", value: 15, color: "#f59e0b" },
  { name: "Social Graph", value: 15, color: "#ef4444" },
]

const radarData = [
  {
    category: "TX History",
    score: 85,
    fullMark: 100,
  },
  {
    category: "DAO Participation",
    score: 75,
    fullMark: 100,
  },
  {
    category: "Contract Diversity",
    score: 90,
    fullMark: 100,
  },
  {
    category: "NFT Activity",
    score: 80,
    fullMark: 100,
  },
  {
    category: "Social Graph",
    score: 95,
    fullMark: 100,
  },
]

export default function ScoreBreakdown({ isLoading }: ScoreBreakdownProps) {
  return (
    <Card className="glass border-purple-500/20 backdrop-blur-lg">
      <CardHeader>
        <CardTitle>Score Breakdown</CardTitle>
        <CardDescription>Analysis of your on-chain reputation factors</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[300px] w-full rounded-xl" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-20 rounded-lg" />
                ))}
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 text-center text-lg font-medium">Score Composition</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-center text-lg font-medium">Performance by Category</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" />
                      <Radar name="Score" dataKey="score" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.6} />
                      <Tooltip />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-5">
              {pieData.map((item) => (
                <Card key={item.name} className="overflow-hidden">
                  <div className="h-2" style={{ backgroundColor: item.color }} />
                  <CardContent className="p-4">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-2xl font-bold">{item.value}%</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

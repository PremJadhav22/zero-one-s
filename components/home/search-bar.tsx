"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function SearchBar() {
  const [address, setAddress] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (address.trim()) {
      router.push(`/dashboard?address=${encodeURIComponent(address)}`)
    }
  }

  return (
    <section className="container py-20">
      <motion.div
        className="mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore Wallets</h2>
          <p className="mt-4 text-lg text-muted-foreground">Enter an Ethereum address to view its reputation score</p>
        </div>

        <form onSubmit={handleSearch} className="mt-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="0x... or ENS name"
              className="h-12 pl-10"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Search
          </Button>
        </form>
      </motion.div>
    </section>
  )
}

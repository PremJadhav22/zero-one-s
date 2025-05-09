"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/hooks/use-wallet"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Dev Tools", path: "/dev-tools" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { isConnected, connectWallet } = useWallet()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
            <motion.div
              className="absolute inset-0 opacity-80"
              animate={{
                background: [
                  "radial-gradient(circle at 30% 30%, rgba(124, 58, 237, 0.8), transparent 70%)",
                  "radial-gradient(circle at 70% 70%, rgba(56, 189, 248, 0.8), transparent 70%)",
                  "radial-gradient(circle at 30% 30%, rgba(124, 58, 237, 0.8), transparent 70%)",
                ],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
          <span className="text-xl font-bold">NeuralTrust</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.path ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {!isConnected ? (
            <Button
              onClick={connectWallet}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Connect Wallet
            </Button>
          ) : (
            <Link href="/dashboard">
              <Button variant="outline" className="border-purple-500/50 hover:border-purple-500 glow-purple">
                Dashboard
              </Button>
            </Link>
          )}

          <button className="block rounded-md p-2.5 text-foreground md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <span className="sr-only">Toggle menu</span>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="glass fixed inset-x-0 top-16 z-50 border-b border-border/40 py-4 md:hidden"
        >
          <nav className="container flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.path ? "text-foreground" : "text-muted-foreground",
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  )
}

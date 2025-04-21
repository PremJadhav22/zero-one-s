"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type WalletContextType = {
  isConnected: boolean
  address: string | null
  ensName: string | null
  connectWallet: () => void
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  ensName: null,
  connectWallet: () => {},
  disconnectWallet: () => {},
})

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [ensName, setEnsName] = useState<string | null>(null)
  const router = useRouter()

  // This is a mock implementation - in a real app, you'd use RainbowKit/wagmi
  const connectWallet = () => {
    // Simulate wallet connection
    setTimeout(() => {
      const mockAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
      setAddress(mockAddress)
      setEnsName("neural.eth")
      setIsConnected(true)
      router.push("/connect")
    }, 500)
  }

  const disconnectWallet = () => {
    setAddress(null)
    setEnsName(null)
    setIsConnected(false)
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        ensName,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)

export { WalletContext }

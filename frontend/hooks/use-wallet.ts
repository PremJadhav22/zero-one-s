"use client"

import { useContext } from "react"
import { WalletContext } from "@/components/providers/wallet-provider"

export const useWallet = () => useContext(WalletContext)

"use client"

import React from "react"
import { useAuth } from "@shared/hooks/useAuth"

export default function ClientAuth() {
  const { isAuthenticated, login, logout } = useAuth()

  return (
    <div className="p-4">
      {isAuthenticated ? (
        <button onClick={logout} className="text-red-500">
          Logout
        </button>
      ) : (
        <button onClick={login} className="text-green-500">
          Login
        </button>
      )}
    </div>
  )
}
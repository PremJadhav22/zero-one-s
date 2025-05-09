"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Check, Download, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function DevToolsPage() {
  const [apiKeyCopied, setApiKeyCopied] = useState(false)
  const [sdkCopied, setSDKCopied] = useState(false)

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText("nt_live_7c3aed38bdf8c084fc10b981f59e0b")
    setApiKeyCopied(true)
    setTimeout(() => setApiKeyCopied(false), 2000)
  }

  const handleCopySDK = () => {
    navigator.clipboard.writeText("npm install @neuraltrust/sdk")
    setSDKCopied(true)
    setTimeout(() => setSDKCopied(false), 2000)
  }

  return (
    <main className="container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold tracking-tight">Developer Tools</h1>
        <p className="mt-2 text-muted-foreground">Integrate NeuralTrust reputation scores into your dApp</p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <Card className="glass border-purple-500/20 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>API Key</CardTitle>
              <CardDescription>Your unique API key for accessing NeuralTrust services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Input value="nt_live_7c3aed38bdf8c084fc10b981f59e0b" readOnly className="font-mono text-sm" />
                <Button size="icon" variant="outline" onClick={handleCopyApiKey} className="flex-shrink-0">
                  {apiKeyCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  <span className="sr-only">Copy API key</span>
                </Button>
              </div>

              <div className="mt-4 rounded-lg bg-muted p-3">
                <h3 className="font-medium">Rate Limits</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>100 requests per minute</li>
                  <li>10,000 requests per day</li>
                  <li>Need more? Contact support</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-purple-500/20 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>SDK</CardTitle>
              <CardDescription>Install our SDK to easily integrate reputation scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Input value="npm install @neuraltrust/sdk" readOnly className="font-mono text-sm" />
                <Button size="icon" variant="outline" onClick={handleCopySDK} className="flex-shrink-0">
                  {sdkCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  <span className="sr-only">Copy SDK install command</span>
                </Button>
              </div>

              <div className="mt-4 flex space-x-2">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download SDK
                </Button>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-purple-500/20 backdrop-blur-lg lg:col-span-3">
            <CardHeader>
              <CardTitle>Integration Docs</CardTitle>
              <CardDescription>Learn how to integrate NeuralTrust into your dApp</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="javascript">
                <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                  <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  <TabsTrigger value="react">React</TabsTrigger>
                  <TabsTrigger value="solidity">Solidity</TabsTrigger>
                </TabsList>

                <TabsContent value="javascript" className="mt-4 space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <pre className="text-sm">
                      <code>{`
import { NeuralTrust } from '@neuraltrust/sdk';

// Initialize with your API key
const nt = new NeuralTrust('nt_live_7c3aed38bdf8c084fc10b981f59e0b');

// Get reputation score for a wallet
async function getReputationScore(walletAddress) {
  try {
    const score = await nt.getScore(walletAddress);
    console.log(\`Reputation Score: \${score.value}\`);
    console.log(\`Tier: \${score.tier}\`);
    return score;
  } catch (error) {
    console.error('Error fetching reputation score:', error);
  }
}

// Verify if a wallet is trusted
async function isTrustedWallet(walletAddress) {
  try {
    const { isTrusted } = await nt.verifyTrust(walletAddress);
    return isTrusted;
  } catch (error) {
    console.error('Error verifying trust:', error);
    return false;
  }
}
                      `}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="react" className="mt-4 space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <pre className="text-sm">
                      <code>{`
import { useEffect, useState } from 'react';
import { NeuralTrustProvider, useNeuralTrust } from '@neuraltrust/react';

// Wrap your app with the provider
function App() {
  return (
    <NeuralTrustProvider apiKey="nt_live_7c3aed38bdf8c084fc10b981f59e0b">
      <YourApp />
    </NeuralTrustProvider>
  );
}

// Use the hook in your components
function ReputationBadge({ walletAddress }) {
  const { getScore, loading, error } = useNeuralTrust();
  const [score, setScore] = useState(null);
  
  useEffect(() => {
    async function fetchScore() {
      const result = await getScore(walletAddress);
      setScore(result);
    }
    
    if (walletAddress) {
      fetchScore();
    }
  }, [walletAddress, getScore]);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!score) return null;
  
  return (
    <div className="reputation-badge">
      <span className="score">{score.value}</span>
      <span className="tier">{score.tier}</span>
    </div>
  );
}
                      `}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="solidity" className="mt-4 space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <pre className="text-sm">
                      <code>{`
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@neuraltrust/contracts/INeuralTrustOracle.sol";

contract TrustedTransaction {
    INeuralTrustOracle public oracle;
    uint256 public minimumScore = 70;
    
    constructor(address _oracleAddress) {
        oracle = INeuralTrustOracle(_oracleAddress);
    }
    
    // Only allow transactions from wallets with sufficient reputation
    modifier onlyTrusted() {
        (bool success, uint256 score) = oracle.getReputationScore(msg.sender);
        require(success, "Failed to fetch reputation score");
        require(score >= minimumScore, "Insufficient reputation score");
        _;
    }
    
    // Example function that requires trust
    function executeTrustedTransaction() external onlyTrusted {
        // Your transaction logic here
    }
    
    // Update minimum required score
    function setMinimumScore(uint256 _newScore) external {
        // Add your access control here
        minimumScore = _newScore;
    }
}
                      `}</code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </main>
  )
}

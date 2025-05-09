"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import * as d3 from "d3"

interface GraphViewProps {
  isLoading: boolean
}

interface Node {
  id: string
  group: number
  label: string
  size: number
}

interface Link {
  source: string
  target: string
  value: number
}

const graphData = {
  nodes: [
    { id: "wallet", group: 1, label: "Your Wallet", size: 20 },
    { id: "dao1", group: 2, label: "Uniswap DAO", size: 15 },
    { id: "dao2", group: 2, label: "Aave DAO", size: 15 },
    { id: "dao3", group: 2, label: "MakerDAO", size: 15 },
    { id: "contract1", group: 3, label: "Uniswap V3", size: 10 },
    { id: "contract2", group: 3, label: "Aave V2", size: 10 },
    { id: "contract3", group: 3, label: "Compound", size: 10 },
    { id: "contract4", group: 3, label: "OpenSea", size: 10 },
    { id: "nft1", group: 4, label: "BAYC", size: 8 },
    { id: "nft2", group: 4, label: "Azuki", size: 8 },
    { id: "social1", group: 5, label: "ENS", size: 12 },
    { id: "social2", group: 5, label: "Lens", size: 12 },
    { id: "sybil1", group: 6, label: "Sybil Wallet", size: 8 },
    { id: "sybil2", group: 6, label: "Sybil Wallet", size: 8 },
  ],
  links: [
    { source: "wallet", target: "dao1", value: 5 },
    { source: "wallet", target: "dao2", value: 3 },
    { source: "wallet", target: "dao3", value: 4 },
    { source: "wallet", target: "contract1", value: 8 },
    { source: "wallet", target: "contract2", value: 6 },
    { source: "wallet", target: "contract3", value: 4 },
    { source: "wallet", target: "contract4", value: 5 },
    { source: "wallet", target: "nft1", value: 3 },
    { source: "wallet", target: "nft2", value: 2 },
    { source: "wallet", target: "social1", value: 7 },
    { source: "wallet", target: "social2", value: 5 },
    { source: "dao1", target: "contract1", value: 2 },
    { source: "dao2", target: "contract2", value: 2 },
    { source: "dao3", target: "contract3", value: 2 },
    { source: "contract4", target: "nft1", value: 2 },
    { source: "contract4", target: "nft2", value: 2 },
    { source: "social1", target: "social2", value: 2 },
    { source: "sybil1", target: "sybil2", value: 6 },
  ],
}

export default function GraphView({ isLoading }: GraphViewProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (isLoading || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const width = svgRef.current.clientWidth
    const height = 500

    // Create a force simulation
    const simulation = d3
      .forceSimulation<Node, Link>(graphData.nodes as Node[])
      .force(
        "link",
        d3
          .forceLink<Node, Link>(graphData.links as Link[])
          .id((d) => (d as Node).id)
          .distance((d) => 100 / d.value),
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d) => (d as Node).size + 10),
      )

    // Define color scale for node groups
    const color = d3
      .scaleOrdinal<number, string>()
      .domain([1, 2, 3, 4, 5, 6])
      .range(["#7c3aed", "#38bdf8", "#10b981", "#f59e0b", "#ef4444", "#6b7280"])

    // Create links
    const link = svg
      .append("g")
      .selectAll("line")
      .data(graphData.links)
      .enter()
      .append("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value))
      .attr("stroke", (d) => {
        const sourceNode = graphData.nodes.find((n) => n.id === d.source) || graphData.nodes[0]
        return d3.color(color(sourceNode.group))?.darker().toString() || "#999"
      })
      .attr("stroke-opacity", 0.6)

    // Create nodes
    const node = svg
      .append("g")
      .selectAll("g")
      .data(graphData.nodes)
      .enter()
      .append("g")
      .call(d3.drag<SVGGElement, Node>().on("start", dragstarted).on("drag", dragged).on("end", dragended))

    // Add circles to nodes
    node
      .append("circle")
      .attr("r", (d) => d.size)
      .attr("fill", (d) => color(d.group))
      .attr("stroke", (d) => d3.color(color(d.group))?.darker().toString() || "#fff")
      .attr("stroke-width", 1.5)

    // Add labels to nodes
    node
      .append("text")
      .attr("dx", (d) => d.size + 5)
      .attr("dy", ".35em")
      .text((d) => d.label)
      .style("font-size", "10px")
      .style("fill", "#fff")

    // Add title for hover tooltip
    node.append("title").text((d) => d.label)

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as Node).x || 0)
        .attr("y1", (d) => (d.source as Node).y || 0)
        .attr("x2", (d) => (d.target as Node).x || 0)
        .attr("y2", (d) => (d.target as Node).y || 0)

      node.attr("transform", (d) => `translate(${d.x || 0},${d.y || 0})`)
    })

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    return () => {
      simulation.stop()
    }
  }, [isLoading])

  return (
    <Card className="glass border-purple-500/20 backdrop-blur-lg">
      <CardHeader>
        <CardTitle>Graph View</CardTitle>
        <CardDescription>Visualize your on-chain connections</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[500px] w-full rounded-xl" />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-[500px] w-full overflow-hidden rounded-xl border border-purple-500/30"
          >
            <svg ref={svgRef} width="100%" height="100%" />

            <div className="absolute bottom-4 right-4 rounded-lg bg-background/80 p-3 backdrop-blur-sm">
              <h4 className="mb-2 text-sm font-medium">Legend</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                  <span>Your Wallet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span>DAOs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span>Contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <span>NFTs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span>Social</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-gray-500" />
                  <span>Sybil Wallets</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

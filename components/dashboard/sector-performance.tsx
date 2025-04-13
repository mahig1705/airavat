"use client"

import { motion } from "framer-motion"
import type { Sector } from "@/lib/types"
import { cn } from "@/lib/utils"

const sectors: Sector[] = [
  { id: "1", name: "Technology", performance: 12.5 },
  { id: "2", name: "Healthcare", performance: 8.3 },
  { id: "3", name: "Consumer Cyclical", performance: -2.1 },
  { id: "4", name: "Financial Services", performance: 5.7 },
  { id: "5", name: "Energy", performance: -4.2 },
  { id: "6", name: "Industrials", performance: 3.8 },]

export function SectorPerformance() {
  return (
    <div className="rounded-xl border bg-card shadow-sm p-4 h-[400px]">
      <h3 className="text-lg font-medium mb-4">Sector Performance</h3>

      <div className="space-y-4 mt-6">
        {sectors.map((sector, index) => (
          <div key={sector.id} className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm">{sector.name}</span>
              <span
                className={cn(
                  "text-sm font-medium",
                  sector.performance > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
                )}
              >
                {sector.performance > 0 ? "+" : ""}
                {sector.performance}%
              </span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.abs(sector.performance) * 5}%` }}
                transition={{ duration: 1, delay: 0.1 * index }}
                className={cn("h-full rounded-full", sector.performance > 0 ? "bg-green-500" : "bg-red-500")}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-lg border border-dashed">
        <h4 className="text-sm font-medium mb-2">Sector Insights</h4>
        <p className="text-sm text-muted-foreground">
          Technology continues to lead market performance, driven by AI advancements and strong earnings. Energy sector
          faces headwinds from regulatory changes and shifting demand patterns.
        </p>
      </div>
    </div>
  )
}

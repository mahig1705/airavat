"use client"

import type { KPI } from "@/lib/types"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Percent } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  kpi: KPI
}

export function KPICard({ kpi }: KPICardProps) {
  const getIcon = () => {
    switch (kpi.icon) {
      case "dollar":
        return <DollarSign className="h-5 w-5" />
      case "trending":
        return <TrendingUp className="h-5 w-5" />
      case "percent":
        return <Percent className="h-5 w-5" />
      case "alert":
        return <AlertTriangle className="h-5 w-5" />
      default:
        return <TrendingUp className="h-5 w-5" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl overflow-hidden border backdrop-blur-sm bg-card/50 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{kpi.name}</h3>
          <div
            className={cn(
              "p-2 rounded-full",
              kpi.trend === "up"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : kpi.trend === "down"
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
            )}
          >
            {getIcon()}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-2xl font-bold">{kpi.value}</p>
          <div className="flex items-center gap-1">
            {kpi.trend === "up" ? (
              <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />
            )}
            <p
              className={cn(
                "text-xs font-medium",
                kpi.trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
              )}
            >
              {kpi.change}%
            </p>
          </div>
        </div>
      </div>

      <div className="h-1 w-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.abs(kpi.change || 0) * 5}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className={cn("h-full", kpi.trend === "up" ? "bg-green-500" : "bg-red-500")}
        />
      </div>
    </motion.div>
  )
}

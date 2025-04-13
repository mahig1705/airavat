"use client"

import { motion } from "framer-motion"
import type { NewsItem } from "@/lib/types"
import { cn } from "@/lib/utils"

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Tesla Announces New Battery Technology",
    source: "TechCrunch",
    date: new Date(Date.now() - 2 * 86400000),
    summary: "Tesla unveiled a new battery technology that could significantly increase range and reduce costs.",
    sentiment: "positive",
  },
  {
    id: "2",
    title: "Q2 Earnings Beat Analyst Expectations",
    source: "Bloomberg",
    date: new Date(Date.now() - 7 * 86400000),
    summary: "Tesla reported Q2 earnings above analyst expectations, with revenue growing 18% year-over-year.",
    sentiment: "positive",
  },
  {
    id: "3",
    title: "Production Delays at Berlin Gigafactory",
    source: "Reuters",
    date: new Date(Date.now() - 14 * 86400000),
    summary: "Tesla faces production delays at its Berlin Gigafactory due to supply chain constraints.",
    sentiment: "negative",
  },
]

export function NewsWidget() {
  return (
    <div className="rounded-xl border bg-card shadow-sm h-full overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="font-medium">Recent News</h3>
      </div>

      <div className="overflow-y-auto max-h-[calc(100%-4rem)]">
        {newsItems.map((news, index) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm">{news.title}</h4>
              <span
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  news.sentiment === "positive"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                )}
              >
                {news.sentiment === "positive" ? "Positive" : "Negative"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{news.summary}</p>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{news.source}</span>
              <span>{news.date.toLocaleDateString()}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

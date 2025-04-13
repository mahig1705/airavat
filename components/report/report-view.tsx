"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Download, ChevronDown, ChevronUp, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ReportViewProps {
  compact?: boolean
}

export function ReportView({ compact = false }: ReportViewProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    metrics: false,
    news: false,
    outlook: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className={cn("rounded-xl border bg-card shadow-sm overflow-hidden", compact ? "h-full" : "")}>
      <div className="p-4 border-b bg-card flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Tesla, Inc. (TSLA) Analysis</h3>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </div>

      <div className={cn("overflow-y-auto", compact ? "max-h-[calc(100%-4rem)]" : "")}>
        <ReportSection
          title="Overview"
          id="overview"
          isExpanded={expandedSections["overview"]}
          onToggle={() => toggleSection("overview")}
        >
          <p className="mb-4">
            Tesla, Inc. (NASDAQ: TSLA) is an American electric vehicle and clean energy company founded in 2003. The
            company designs, manufactures, and sells electric vehicles, battery energy storage, solar panels, and
            related products and services.
          </p>
          <p className="mb-4">
            Tesla's market position remains strong despite increasing competition in the electric vehicle space. The
            company continues to lead in EV technology innovation and has expanded its manufacturing capacity globally
            with Gigafactories in the United States, China, and Germany.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <h4 className="text-sm font-medium mb-2">Market Cap</h4>
              <p className="text-2xl font-bold">$789.5B</p>
              <p className="text-xs text-muted-foreground mt-1">+2.3% YTD</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <h4 className="text-sm font-medium mb-2">Stock Price</h4>
              <p className="text-2xl font-bold">$248.50</p>
              <p className="text-xs text-muted-foreground mt-1">+1.7% today</p>
            </div>
          </div>
        </ReportSection>

        <ReportSection
          title="Key Metrics"
          id="metrics"
          isExpanded={expandedSections["metrics"]}
          onToggle={() => toggleSection("metrics")}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard title="Revenue (TTM)" value="$96.8B" change="+18.7%" />
              <MetricCard title="Gross Margin" value="23.4%" change="-1.2%" negative />
              <MetricCard title="EPS" value="$4.30" change="+22.1%" />
              <MetricCard title="P/E Ratio" value="57.8" change="-5.3%" negative />
            </div>

            <div className="p-4 rounded-lg border">
              <h4 className="text-sm font-medium mb-3">Quarterly Revenue (in billions)</h4>
              <div className="h-40 flex items-end justify-between gap-2">
                {[18.8, 21.3, 23.4, 24.9, 25.1, 24.3, 25.7, 26.5].map((value, i) => (
                  <div key={i} className="relative flex-1 group">
                    <div
                      className="bg-primary/80 hover:bg-primary transition-colors rounded-t-sm"
                      style={{ height: `${(value / 26.5) * 100}%` }}
                    />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      ${value}B
                    </div>
                    <div className="text-xs text-center mt-1">Q{i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ReportSection>

        <ReportSection
          title="News Summary"
          id="news"
          isExpanded={expandedSections["news"]}
          onToggle={() => toggleSection("news")}
        >
          <div className="space-y-4">
            {[
              {
                title: "Tesla Announces New Battery Technology",
                source: "TechCrunch",
                date: "2 days ago",
                summary:
                  "Tesla unveiled a new battery technology that could significantly increase range and reduce costs.",
                sentiment: "positive",
              },
              {
                title: "Q2 Earnings Beat Analyst Expectations",
                source: "Bloomberg",
                date: "1 week ago",
                summary:
                  "Tesla reported Q2 earnings above analyst expectations, with revenue growing 18% year-over-year.",
                sentiment: "positive",
              },
              {
                title: "Production Delays at Berlin Gigafactory",
                source: "Reuters",
                date: "2 weeks ago",
                summary: "Tesla faces production delays at its Berlin Gigafactory due to supply chain constraints.",
                sentiment: "negative",
              },
            ].map((news, i) => (
              <div key={i} className="p-4 rounded-lg border">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{news.title}</h4>
                  <span
                    className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      news.sentiment === "positive"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                    )}
                  >
                    {news.sentiment === "positive" ? "Positive" : "Negative"}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{news.summary}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{news.source}</span>
                  <span>{news.date}</span>
                </div>
              </div>
            ))}
          </div>
        </ReportSection>

        <ReportSection
          title="Investment Outlook"
          id="outlook"
          isExpanded={expandedSections["outlook"]}
          onToggle={() => toggleSection("outlook")}
        >
          <div className="space-y-4">
            <p>
              Tesla continues to maintain its position as a leader in the electric vehicle market, though competition is
              intensifying from both traditional automakers and new EV startups. The company's strong brand,
              technological advantages, and expanding production capacity provide a solid foundation for future growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-lg border">
                <h4 className="text-sm font-medium mb-2">Strengths</h4>
                <ul className="text-sm space-y-2">
                  <li>• Market leader in EV technology</li>
                  <li>• Strong brand recognition</li>
                  <li>• Vertical integration</li>
                  <li>• Global manufacturing footprint</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border">
                <h4 className="text-sm font-medium mb-2">Weaknesses</h4>
                <ul className="text-sm space-y-2">
                  <li>• High valuation multiples</li>
                  <li>• Production scalability challenges</li>
                  <li>• Regulatory uncertainties</li>
                  <li>• Increasing competition</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg border">
                <h4 className="text-sm font-medium mb-2">Opportunities</h4>
                <ul className="text-sm space-y-2">
                  <li>• Energy storage market growth</li>
                  <li>• Autonomous driving technology</li>
                  <li>• International expansion</li>
                  <li>• New vehicle segments</li>
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 mt-6">
              <h4 className="font-medium mb-2">12-Month Price Target</h4>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">$310</span>
                <span className="text-sm text-green-600 dark:text-green-400">+24.7% upside potential</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Based on discounted cash flow analysis and comparable company valuation.
              </p>
            </div>
          </div>
        </ReportSection>
      </div>
    </div>
  )
}

interface ReportSectionProps {
  title: string
  id: string
  children: React.ReactNode
  isExpanded: boolean
  onToggle: () => void
}

function ReportSection({ title, id, children, isExpanded, onToggle }: ReportSectionProps) {
  return (
    <div className="border-b last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-muted/50 transition-colors"
      >
        <h3 className="font-medium text-lg">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-6"
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  negative?: boolean
}

function MetricCard({ title, value, change, negative = false }: MetricCardProps) {
  return (
    <div className="p-3 rounded-lg border">
      <h4 className="text-xs font-medium text-muted-foreground mb-1">{title}</h4>
      <p className="text-lg font-bold">{value}</p>
      <p
        className={cn(
          "text-xs mt-1",
          negative ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400",
        )}
      >
        {change}
      </p>
    </div>
  )
}

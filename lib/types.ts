export type UserType = "normal" | "professional"

export type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export type Report = {
  id: string
  title: string
  date: Date
  sections: ReportSection[]
}

export type ReportSection = {
  id: string
  title: string
  content: string
}

export type FinancialMetric = {
  id: string
  name: string
  value: string | number
  change?: number
  trend?: "up" | "down" | "neutral"
}

export type KPI = {
  id: string
  name: string
  value: string | number
  change?: number
  trend?: "up" | "down" | "neutral"
  icon?: string
}

export type Sector = {
  id: string
  name: string
  performance: number
}

export type NewsItem = {
  id: string
  title: string
  source: string
  date: Date
  summary: string
  sentiment: "positive" | "negative" | "neutral"
}

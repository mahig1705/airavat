"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, Bell, ChevronRight, FileText, LineChart, MessageSquare, Plus, Search, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [showChatbot, setShowChatbot] = useState(false)

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's an overview of your financial insights.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] lg:w-[300px] pl-8 rounded-2xl bg-background"
              />
            </div>
            <Button variant="outline" size="icon" className="relative rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                3
              </span>
            </Button>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Premium Plan</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Reports",
              value: "24",
              change: "+12%",
              trend: "up",
              icon: <FileText className="h-5 w-5" />,
            },
            {
              title: "Market Insights",
              value: "156",
              change: "+8%",
              trend: "up",
              icon: <BarChart3 className="h-5 w-5" />,
            },
            {
              title: "AI Recommendations",
              value: "38",
              change: "+24%",
              trend: "up",
              icon: <Zap className="h-5 w-5" />,
            },
            {
              title: "Saved Searches",
              value: "12",
              change: "-3%",
              trend: "down",
              icon: <Search className="h-5 w-5" />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-colors rounded-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-y-0">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl font-bold">{item.value}</p>
                        <p
                          className={cn("text-xs font-medium", item.trend === "up" ? "text-green-500" : "text-red-500")}
                        >
                          {item.change}
                        </p>
                      </div>
                    </div>
                    <div className="rounded-full bg-primary/10 p-2 text-primary">{item.icon}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm rounded-2xl h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Market Performance</CardTitle>
                  <CardDescription>Overview of key market indices</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Daily</Badge>
                  <Badge variant="outline">Weekly</Badge>
                  <Badge variant="secondary">Monthly</Badge>
                </div>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full flex items-center justify-center">
                  <LineChart className="h-64 w-64 text-muted-foreground/50" />
                  <p className="text-muted-foreground text-sm absolute">Chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm rounded-2xl h-full">
              <CardHeader>
                <CardTitle>Trending Sectors</CardTitle>
                <CardDescription>Top performing sectors this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Technology", value: "+12.4%", color: "bg-blue-500" },
                    { name: "Healthcare", value: "+8.7%", color: "bg-green-500" },
                    { name: "Energy", value: "+6.2%", color: "bg-yellow-500" },
                    { name: "Finance", value: "+4.8%", color: "bg-purple-500" },
                    { name: "Consumer Goods", value: "+3.5%", color: "bg-pink-500" },
                  ].map((sector, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${sector.color}`} />
                        <span>{sector.name}</span>
                      </div>
                      <span className="font-medium text-green-500">{sector.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm rounded-2xl h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Your latest financial analyses</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Tesla, Inc. Analysis",
                      date: "2 hours ago",
                      type: "Company",
                    },
                    {
                      title: "Tech Sector Overview",
                      date: "Yesterday",
                      type: "Sector",
                    },
                    {
                      title: "Market Trends Q2 2023",
                      date: "3 days ago",
                      type: "Market",
                    },
                    {
                      title: "Renewable Energy Outlook",
                      date: "1 week ago",
                      type: "Industry",
                    },
                  ].map((report, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{report.title}</p>
                          <p className="text-xs text-muted-foreground">{report.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm rounded-2xl h-full">
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>Latest AI-generated recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      insight:
                        "Consider increasing exposure to renewable energy stocks as the sector shows strong growth potential.",
                      confidence: "High",
                    },
                    {
                      insight: "Tech sector valuations appear stretched; consider rebalancing portfolio allocation.",
                      confidence: "Medium",
                    },
                    {
                      insight: "Emerging markets show favorable risk-reward profile for long-term investors.",
                      confidence: "Medium",
                    },
                  ].map((insight, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Zap className="h-5 w-5 text-primary mt-0.5" />
                        <Badge variant={insight.confidence === "High" ? "default" : "secondary"} className="text-xs">
                          {insight.confidence} Confidence
                        </Badge>
                      </div>
                      <p className="text-sm">{insight.insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm rounded-2xl h-full">
              <CardHeader>
                <CardTitle>Market Movers</CardTitle>
                <CardDescription>Top performing stocks today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { symbol: "AAPL", name: "Apple Inc.", change: "+2.4%", price: "$182.63" },
                    { symbol: "MSFT", name: "Microsoft Corp.", change: "+1.8%", price: "$378.92" },
                    { symbol: "NVDA", name: "NVIDIA Corp.", change: "+3.5%", price: "$824.15" },
                    { symbol: "AMZN", name: "Amazon.com Inc.", change: "+1.2%", price: "$178.35" },
                    { symbol: "GOOGL", name: "Alphabet Inc.", change: "+0.9%", price: "$142.17" },
                  ].map((stock, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{stock.symbol}</p>
                        <p className="text-xs text-muted-foreground">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-500">{stock.change}</p>
                        <p className="text-xs text-muted-foreground">{stock.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button for Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowChatbot(!showChatbot)}
        >
          <MessageSquare className="h-6 w-6" />
          <motion.div
            className="absolute inset-0 rounded-full bg-primary"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </motion.button>
      </div>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChatbot(false)}
            />
            <motion.div
              className="relative z-50 w-full max-w-3xl rounded-2xl border bg-card shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="flex h-[600px] flex-col">
                <div className="flex items-center justify-between border-b p-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="font-semibold">AI Research Assistant</h2>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setShowChatbot(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </Button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8 bg-primary/10">
                        <AvatarFallback className="text-primary">AI</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg bg-muted p-3">
                        <p className="text-sm">
                          Hello! I'm your AI research assistant. How can I help with your financial research today?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-end gap-3">
                      <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                        <p className="text-sm">Can you analyze Tesla's recent performance?</p>
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8 bg-primary/10">
                        <AvatarFallback className="text-primary">AI</AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg bg-muted p-3">
                        <p className="text-sm">
                          I'm analyzing Tesla's recent performance data. The stock has shown volatility in the past
                          quarter with a general upward trend of 12.4%. Key factors include:
                        </p>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>• Strong delivery numbers exceeding analyst expectations</li>
                          <li>• Expansion of manufacturing capacity in new markets</li>
                          <li>• Increased competition in the EV space affecting market share</li>
                          <li>• Regulatory challenges in certain regions</li>
                        </ul>
                        <p className="mt-2 text-sm">Would you like a more detailed analysis of any specific aspect?</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type your message..."
                      className="rounded-full bg-muted focus-visible:ring-primary"
                    />
                    <Button size="icon" className="rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                      </svg>
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}

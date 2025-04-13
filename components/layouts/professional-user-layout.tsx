"use client"

import { useState, useRef } from "react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { ChatInterface } from "@/components/chat/chat-interface"
import { ReportView } from "@/components/report/report-view"
import type { Message, KPI } from "@/lib/types"
import { motion } from "framer-motion"
import {
  BarChart3,
  FileText,
  Layers,
  LineChart,
  PieChart,
  Plus,
  Search,
  Settings,
  Upload,
  Sparkles,
  FileUp,
} from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { KPICard } from "@/components/dashboard/kpi-card"
import { NewsWidget } from "@/components/dashboard/news-widget"
import { Button } from "@/components/ui/button"
import { FileUploader } from "@/components/file-uploader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfessionalUserLayout() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [showUploader, setShowUploader] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Call backend API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I've analyzed your query and prepared a report.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      // Fallback response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, there was an error processing your request. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setIsLoading(true)
    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i])
    }

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()

      // Add system message about successful upload
      const systemMessage: Message = {
        id: Date.now().toString(),
        content: `Successfully uploaded ${files.length} file(s). ${data.message || ""}`,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, systemMessage])
      setShowUploader(false)
    } catch (error) {
      console.error("Upload error:", error)
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "There was an error uploading your files. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const kpis: KPI[] = [
    {
      id: "1",
      name: "Revenue",
      value: "$4.2B",
      change: 12.5,
      trend: "up",
      icon: "dollar",
    },
    {
      id: "2",
      name: "Valuation",
      value: "$78.5B",
      change: 8.3,
      trend: "up",
      icon: "trending",
    },
    {
      id: "3",
      name: "CAGR",
      value: "18.7%",
      change: 2.1,
      trend: "up",
      icon: "percent",
    },
    {
      id: "4",
      name: "Risk Score",
      value: "Medium",
      change: -5.2,
      trend: "down",
      icon: "alert",
    },
  ]

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-background/90 to-background flex">
        <Sidebar variant="inset" collapsible="icon" className="border-r border-border/50">
          <SidebarHeader className="flex flex-col items-center justify-center py-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">AURA</h1>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeSection === "dashboard"}
                      onClick={() => setActiveSection("dashboard")}
                      tooltip="Dashboard"
                    >
                      <BarChart3 />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeSection === "reports"}
                      onClick={() => setActiveSection("reports")}
                      tooltip="Reports"
                    >
                      <FileText />
                      <span>Reports</span>

              
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Tools</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeSection === "upload"}
                      onClick={() => {
                        setActiveSection("upload")
                        setShowUploader(true)
                      }}
                      tooltip="Upload Documents"
                    >
                      <Upload />
                      <span>Upload Docs</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeSection === "prompt-lab"}
                      onClick={() => setActiveSection("prompt-lab")}
                      tooltip="Custom Prompt Lab"
                    >
                      <Layers />
                      <span>Prompt Lab</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="py-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <div className="px-3 mt-4">
              <ModeToggle />
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 h-screen overflow-hidden flex flex-col">
          <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="container mx-auto py-3 px-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h2 className="text-lg font-medium">
                  {activeSection === "dashboard" && "Financial Dashboard"}
                  {activeSection === "reports" && "Research Reports"}

                  {activeSection === "upload" && "Upload Documents"}
                  {activeSection === "prompt-lab" && "Custom Prompt Lab"}
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-64 md:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search companies, reports, or metrics..."
                    className="w-full pl-10 pr-4 py-2 rounded-md border bg-background/50 focus:ring-2 focus:ring-primary/50 focus:outline-none text-sm"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={() => {
                    setShowUploader(true)
                    setActiveSection("upload")
                  }}
                >
                  <FileUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            <div className="container mx-auto p-4">
              {activeSection === "upload" && showUploader && (
                <div className="mb-6">
                  <FileUploader onUpload={handleFileUpload} />
                </div>
              )}

              {activeSection === "dashboard" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {kpis.map((kpi) => (
                      <KPICard key={kpi.id} kpi={kpi} />
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="rounded-xl border bg-card shadow-sm p-4 h-[400px]">
                        <h3 className="text-lg font-medium mb-4">Financial Performance</h3>
                        <div className="h-[340px] flex items-center justify-center">
                          <LineChart className="h-64 w-64 text-muted-foreground/50" />
                          <p className="text-muted-foreground text-sm absolute">
                            Interactive chart will be displayed here
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <ReportView compact />
                    </div>

                    <div>
                      <NewsWidget />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "reports" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-medium">Recent Reports</h3>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm">
                      <Plus className="h-4 w-4" />
                      <span>New Report</span>
                    </button>
                  </div>

                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All Reports</TabsTrigger>
                      <TabsTrigger value="company">Company</TabsTrigger>
                      <TabsTrigger value="market">Market</TabsTrigger>
                      <TabsTrigger value="sector">Sector</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h4 className="font-medium">
                                {
                                  [
                                    "Tesla, Inc. Analysis",
                                    "Market Trends Q2 2023",
                                    "Tech Sector Overview",
                                    "Apple Financial Report",
                                    "Renewable Energy Outlook",
                                    "Banking Sector Analysis",
                                  ][i % 6]
                                }
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                              Comprehensive analysis of financial performance, market position, and future outlook.
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                {["Company", "Market", "Sector", "Company", "Industry", "Sector"][i % 6]}
                              </span>
                              <button className="text-xs text-primary hover:underline">View Report</button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="company" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[0, 3].map((i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h4 className="font-medium">
                                {["Tesla, Inc. Analysis", "Apple Financial Report"][i === 0 ? 0 : 1]}
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                              Comprehensive analysis of financial performance, market position, and future outlook.
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Company</span>
                              <button className="text-xs text-primary hover:underline">View Report</button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>

                    {/* Other tabs would follow the same pattern */}
                  </Tabs>
                </div>
              )}

              {activeSection === "sectors" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-medium">Sector Analysis</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <SectorPerformance />
                    <div className="rounded-xl border bg-card shadow-sm p-4 h-[400px]">
                      <h3 className="text-lg font-medium mb-4">Sector Comparison</h3>
                      <div className="h-[340px] flex items-center justify-center">
                        <PieChart className="h-64 w-64 text-muted-foreground/50" />
                        <p className="text-muted-foreground text-sm absolute">
                          Interactive chart will be displayed here
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "prompt-lab" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-medium">Custom Prompt Lab</h3>
                  <p className="text-muted-foreground">Create and save custom prompts for your research needs.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl border bg-card shadow-sm p-4">
                      <h4 className="font-medium mb-4">Create New Prompt</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Prompt Name</label>
                          <input
                            type="text"
                            placeholder="E.g., SWOT Analysis"
                            className="w-full px-3 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary/50 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Prompt Template</label>
                          <textarea
                            rows={5}
                            placeholder="Create a SWOT analysis for {{company}} focusing on {{aspect}}."
                            className="w-full px-3 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary/50 focus:outline-none"
                          ></textarea>
                        </div>
                        <Button className="w-full">Save Prompt Template</Button>
                      </div>
                    </div>

                    <div className="rounded-xl border bg-card shadow-sm p-4">
                      <h4 className="font-medium mb-4">Saved Prompts</h4>
                      <div className="space-y-3">
                        {["SWOT Analysis", "Financial Ratio Analysis", "Market Trend Prediction"].map((prompt, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                          >
                            <h5 className="font-medium">{prompt}</h5>
                            <p className="text-xs text-muted-foreground mt-1">
                              Last used: {new Date(Date.now() - i * 86400000 * 2).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto p-4">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                professional
                onFileUpload={handleFileUpload}
              />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

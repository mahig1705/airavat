"use client"

import { useState, useRef } from "react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { ChatInterface } from "@/components/chat/chat-interface"
import { ReportView } from "@/components/report/report-view"
import type { Message } from "@/lib/types"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Sparkles, FileUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileUploader } from "@/components/file-uploader"

export default function NormalUserLayout() {
  const [messages, setMessages] = useState<Message[]>([])
  const [showReport, setShowReport] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState("")
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
        content: data.response || "I've analyzed your query and prepared a report for you. You can view it below.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setShowReport(true)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">AI Research Assistant</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => setShowUploader(true)}>
              <FileUp className="h-4 w-4" />
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        {showUploader && (
          <div className="mb-6">
            <FileUploader onUpload={handleFileUpload} />
          </div>
        )}

        {messages.length === 0 && !showReport ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col items-center justify-center"
          >
            <div className="max-w-2xl w-full text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Your AI Research Assistant</h2>
              <p className="text-muted-foreground text-lg">
                Ask about companies, sectors, or markets to get comprehensive research insights.
              </p>

              <div className="relative mt-8 max-w-xl mx-auto">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter a topic or company..."
                  className="w-full px-4 py-3 rounded-lg border bg-background shadow-lg focus:ring-2 focus:ring-primary/50 focus:outline-none text-lg"
                />
                <button
                  onClick={() => handleSendMessage(query)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                {["Company Analysis", "Market Trends", "Sector Overview"].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleSendMessage(item)}
                  >
                    <h3 className="font-medium text-lg">{item}</h3>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Get detailed insights about {item.toLowerCase()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            <div className="lg:col-span-5 xl:col-span-4 h-[calc(100vh-8rem)]">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                onFileUpload={handleFileUpload}
              />
            </div>

            <AnimatePresence>
              {showReport && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="lg:col-span-7 xl:col-span-8 h-[calc(100vh-8rem)] overflow-y-auto"
                >
                  <ReportView />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  )
}

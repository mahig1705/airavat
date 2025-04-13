"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { Message } from "@/lib/types"
import { AnimatePresence, motion } from "framer-motion"
import { Send, User, Bot, Loader2, FileUp } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  messages: Message[]
  onSendMessage: (content: string) => void
  isLoading: boolean
  professional?: boolean
  onFileUpload?: (files: FileList | null) => void
}

export function ChatInterface({
  messages,
  onSendMessage,
  isLoading,
  professional = false,
  onFileUpload,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input)
      setInput("")
    }
  }

  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onFileUpload) {
      onFileUpload(e.target.files)
      // Reset the input so the same file can be uploaded again if needed
      e.target.value = ""
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div
      className={cn(
        "flex flex-col h-full rounded-xl border bg-card shadow-sm overflow-hidden",
        professional ? "bg-card/50 backdrop-blur-sm" : "",
      )}
    >
      <div className="p-4 border-b bg-card">
        <h3 className="font-medium">AI Research Assistant</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <Bot className="h-12 w-12 text-primary/20 mb-4" />
            <h3 className="text-lg font-medium">How can I help with your research?</h3>
            <p className="text-muted-foreground text-sm mt-2 max-w-md">
              Ask about companies, markets, or sectors to get comprehensive insights and analysis.
            </p>
          </div>
        ) : (
          <>
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn("flex items-start gap-3 max-w-full", message.role === "user" ? "justify-end" : "")}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </Avatar>
                  )}

                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 max-w-[80%]",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                    <div className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </Avatar>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3"
              >
                <Avatar className="h-8 w-8 bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-muted flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm">Analyzing data...</p>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-card">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a company, sector, or market..."
            className="w-full px-4 py-3 pr-24 rounded-lg border bg-background focus:ring-2 focus:ring-primary/50 focus:outline-none"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
            {onFileUpload && (
              <>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={handleFileButtonClick}
                  disabled={isLoading}
                >
                  <FileUp className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button type="submit" size="icon" className="h-8 w-8" disabled={!input.trim() || isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

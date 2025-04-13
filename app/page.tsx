"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, FileText, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
      </main>
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient-slow" />
      </div>

      <div className="container px-4 md:px-6 flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="block">Your AI Research Assistant</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Decode, Discover, Draft
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Transform complex financial data into actionable insights with our AI assistant.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link href="/normal-user">
              <Card className="p-6 h-full border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors rounded-2xl cursor-pointer">
                <div className="flex flex-col h-full items-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">User Mode</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    Simple summaries and insights for quick research.
                  </p>
                  <Button className="w-full rounded-xl">
                    <span className="flex items-center gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </div>
              </Card>
            </Link>

            <Link href="/professional-user">
              <Card className="p-6 h-full border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors rounded-2xl cursor-pointer">
                <div className="flex flex-col h-full items-center text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Professional Mode</h3>
                  <p className="text-muted-foreground mb-4 flex-grow">
                    Advanced analysis and reporting for financial professionals.
                  </p>
                  <Button className="w-full rounded-xl">
                    <span className="flex items-center gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Button>
                </div>
              </Card>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/components/layout/dashboard-layout"

export default function SettingsPage() {
  const [userType, setUserType] = useState("normal")

  return (
    <DashboardLayout>
      <div className="container py-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences.</p>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4 gap-4">
              <TabsTrigger value="general" className="rounded-lg">
                General
              </TabsTrigger>
              <TabsTrigger value="appearance" className="rounded-lg">
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="rounded-lg">
                Notifications
              </TabsTrigger>
              <TabsTrigger value="api" className="rounded-lg">
                API Integrations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="mt-6 space-y-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>User Mode</CardTitle>
                  <CardDescription>Select your preferred user mode.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    defaultValue={userType}
                    onValueChange={setUserType}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="normal"
                        id="normal"
                        className="peer sr-only"
                        aria-label="Normal User Mode"
                      />
                      <Label
                        htmlFor="normal"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className="mb-3 rounded-full bg-primary/10 p-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-primary"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </motion.div>
                        <div className="text-center">
                          <h3 className="font-medium">Normal User</h3>
                          <p className="text-sm text-muted-foreground">For simple summaries and insights</p>
                        </div>
                        {userType === "normal" && (
                          <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem
                        value="professional"
                        id="professional"
                        className="peer sr-only"
                        aria-label="Professional User Mode"
                      />
                      <Label
                        htmlFor="professional"
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className="mb-3 rounded-full bg-primary/10 p-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-primary"
                          >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                          </svg>
                        </motion.div>
                        <div className="text-center">
                          <h3 className="font-medium">Professional User</h3>
                          <p className="text-sm text-muted-foreground">For VCs, IB/PE, and analysts</p>
                        </div>
                        {userType === "professional" && (
                          <div className="absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>Language & Region</CardTitle>
                  <CardDescription>Configure your language and regional preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger id="language" className="rounded-lg">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Select defaultValue="us">
                        <SelectTrigger id="region" className="rounded-lg">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="eu">Europe</SelectItem>
                          <SelectItem value="asia">Asia</SelectItem>
                          <SelectItem value="latam">Latin America</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone">Language Tone</Label>
                    <Select defaultValue="informative">
                      <SelectTrigger id="tone" className="rounded-lg">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="informative">Informative</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>Default Domain</CardTitle>
                  <CardDescription>Set your default research domain.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="domain">Research Domain</Label>
                    <Select defaultValue="equities">
                      <SelectTrigger id="domain" className="rounded-lg">
                        <SelectValue placeholder="Select domain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equities">Equities</SelectItem>
                        <SelectItem value="vc">Venture Capital</SelectItem>
                        <SelectItem value="ib">Investment Banking</SelectItem>
                        <SelectItem value="pe">Private Equity</SelectItem>
                        <SelectItem value="crypto">Cryptocurrency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="mt-6 space-y-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>Customize the appearance of the application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Color Theme</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="system">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="light" id="light" />
                            <Label htmlFor="light">Light</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dark" id="dark" />
                            <Label htmlFor="dark">Dark</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="system" id="system" />
                            <Label htmlFor="system">System</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroup defaultValue="medium">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="small" id="small" />
                            <Label htmlFor="small">Small</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="medium" />
                            <Label htmlFor="medium">Medium</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="large" id="large" />
                            <Label htmlFor="large">Large</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="animations" defaultChecked />
                    <Label htmlFor="animations">Enable animations</Label>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>Accessibility</CardTitle>
                  <CardDescription>Configure accessibility settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="high-contrast" />
                    <Label htmlFor="high-contrast">High contrast mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="reduce-motion" />
                    <Label htmlFor="reduce-motion">Reduce motion</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="screen-reader" />
                    <Label htmlFor="screen-reader">Screen reader optimized</Label>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-6 space-y-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Configure how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications in the browser</p>
                      </div>
                      <Switch id="push-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="report-notifications">Report Completion</Label>
                        <p className="text-sm text-muted-foreground">Get notified when reports are ready</p>
                      </div>
                      <Switch id="report-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="news-notifications">News Alerts</Label>
                        <p className="text-sm text-muted-foreground">Get notified about important market news</p>
                      </div>
                      <Switch id="news-notifications" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api" className="mt-6 space-y-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>API Integrations</CardTitle>
                  <CardDescription>Connect to external financial data providers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Financial Modeling Prep</Label>
                        <p className="text-sm text-muted-foreground">Access financial statements and company data</p>
                      </div>
                      <Button variant="outline" className="rounded-lg">
                        Connect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>News API</Label>
                        <p className="text-sm text-muted-foreground">Access financial news and market updates</p>
                      </div>
                      <Button variant="outline" className="rounded-lg">
                        Connect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Screener API</Label>
                        <p className="text-sm text-muted-foreground">Access stock screening and filtering tools</p>
                      </div>
                      <Button variant="outline" className="rounded-lg">
                        Connect
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-key">Custom API Key</Label>
                    <div className="flex space-x-2">
                      <Input id="api-key" placeholder="Enter your API key" className="rounded-lg" />
                      <Button className="rounded-lg">Save</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Citation Style</Label>
                    <Select defaultValue="harvard">
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select citation style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="harvard">Harvard</SelectItem>
                        <SelectItem value="apa">APA</SelectItem>
                        <SelectItem value="mla">MLA</SelectItem>
                        <SelectItem value="chicago">Chicago</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle>Report Templates</CardTitle>
                  <CardDescription>Configure your default report templates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Template</Label>
                    <Select defaultValue="comprehensive">
                      <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic Report</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                        <SelectItem value="executive">Executive Summary</SelectItem>
                        <SelectItem value="financial">Financial Deep Dive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4">
                    <Button className="rounded-lg w-full">
                      <Save className="mr-2 h-4 w-4" />
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}

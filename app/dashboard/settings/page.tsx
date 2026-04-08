"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lock, Mail, User, Shield, CreditCard, Bell, Key, Copy, AlertCircle } from "lucide-react"

export default function SettingsPage() {
  const [copiedKey, setCopiedKey] = useState(false)

  const handleCopyKey = () => {
    setCopiedKey(true)
    setTimeout(() => setCopiedKey(false), 2000)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-charcoal-900 text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-5xl mx-auto space-y-8">
          
          <div className="border-b border-charcoal-700 pb-6">
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1 text-sm">Manage your account preferences, billing, and API integrations.</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-charcoal-800 border border-charcoal-700 p-1">
              <TabsTrigger value="profile" className="data-[state=active]:bg-brand data-[state=active]:text-white">Profile</TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-brand data-[state=active]:text-white">Account & Billing</TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-brand data-[state=active]:text-white">Notifications</TabsTrigger>
              <TabsTrigger value="apikeys" className="data-[state=active]:bg-brand data-[state=active]:text-white">API Keys</TabsTrigger>
            </TabsList>

            {/* PROFILE TAB */}
            <TabsContent value="profile" className="space-y-6 mt-4">
              <Card className="bg-charcoal-800 border-charcoal-700">
                <CardHeader>
                  <CardTitle>Public Profile</CardTitle>
                  <CardDescription>This information will be displayed on your generated reports.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-charcoal-600 border-4 border-charcoal-700 overflow-hidden">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgsgxhbfi6L5-IgT4O5zM7L8Zojh-czaFsTA-GtTSEXt1btmNrqCHsbNdxJdb_F1QlkOztf5hfq-1CRO5dkDo-lHoUhgHePYK4zuGQQ0tyiuqcB_VvqZKb_E5giPu6kf5MJDBskR0YtsBFjhD_-inQuMp25o1LbKTibVYERKMnyUlya2qw7XhBmWV1NOSawb7nLH1ag09RqGIfEsGAHYZCGSiCuAQ7vpSmqfjm_ODpga0uOYC-kM6hzaGdkXg7blpZ1-nLpy5gkpE" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" className="border-charcoal-600">Change Avatar</Button>
                      <Button variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-2">Remove</Button>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input defaultValue="John Doe" className="pl-9 bg-charcoal-900 border-charcoal-600 focus-visible:ring-brand" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input readOnly defaultValue="john@example.com" className="pl-9 bg-charcoal-700/50 border-charcoal-600 text-muted-foreground cursor-not-allowed" />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea placeholder="A little about yourself and your design work..." className="bg-charcoal-900 border-charcoal-600 focus-visible:ring-brand min-h-[100px]" defaultValue="Professional UI/UX designer focused on accessible web applications." />
                  </div>
                  
                  <div className="space-y-2 max-w-sm">
                    <label className="text-sm font-medium">Primary Role</label>
                    <Select defaultValue="designer">
                      <SelectTrigger className="bg-charcoal-900 border-charcoal-600">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent className="bg-charcoal-800 border-charcoal-700">
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="pm">Product Manager</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-charcoal-700 px-6 py-4">
                  <Button className="ml-auto bg-brand hover:bg-brand-dark">Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* ACCOUNT TAB */}
            <TabsContent value="account" className="space-y-6 mt-4">
              <Card className="bg-charcoal-800 border-charcoal-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-brand" /> Subscription Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center p-4 bg-charcoal-900 rounded-lg border border-charcoal-600/50">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-lg">Pro Plan</span>
                        <Badge variant="secondary" className="bg-brand/20 text-brand">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">$12/month. Next billing date: May 15, 2026</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xl">142<span className="text-sm text-muted-foreground"> / ∞</span></p>
                      <p className="text-xs text-muted-foreground">Analyses this month</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-charcoal-700 px-6 py-4 flex gap-3">
                  <Button variant="outline" className="border-charcoal-600">Manage Subscription</Button>
                  <Button className="bg-charcoal-700 hover:bg-charcoal-600">View Invoices</Button>
                </CardFooter>
              </Card>

              <Card className="bg-charcoal-800 border-charcoal-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-brand" /> Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Magic Link Authentication</p>
                      <p className="text-sm text-muted-foreground">You currently sign in via email magic links.</p>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-500/30">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-charcoal-700/50">
                    <div>
                      <p className="font-medium">Account Password</p>
                      <p className="text-sm text-muted-foreground">Add a password as an alternative sign-in method.</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-charcoal-600">Set Password</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
                <h3 className="text-lg font-semibold text-red-500 mb-2">Danger Zone</h3>
                <p className="text-sm text-red-400/80 mb-4">Permanently delete your account and all of your data. This action cannot be undone.</p>
                <Button variant="destructive" className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/50">Delete Account</Button>
              </div>
            </TabsContent>

            {/* NOTIFICATIONS TAB */}
            <TabsContent value="notifications" className="space-y-6 mt-4">
              <Card className="bg-charcoal-800 border-charcoal-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-brand" /> Communication Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Analysis Complete Alert</p>
                      <p className="text-sm text-muted-foreground">Receive an email when a large batch analysis finishes.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Weekly Design Summary</p>
                      <p className="text-sm text-muted-foreground">A weekly digest of your design scores and common improvement areas.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Product Updates</p>
                      <p className="text-sm text-muted-foreground">News about new AI models, features, and platform updates.</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">Marketing Emails</p>
                      <p className="text-sm text-muted-foreground">Promotions, surveys, and third-party offers.</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* API KEYS TAB */}
            <TabsContent value="apikeys" className="space-y-6 mt-4">
              <div className="p-4 bg-brand/10 border border-brand/20 rounded-xl flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <p className="text-sm text-brand-light">Use API keys to integrate DesignCritiq automated analysis into your CI/CD pipeline or custom applications. Keep these keys secret.</p>
              </div>

              <Card className="bg-charcoal-800 border-charcoal-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2"><Key className="h-5 w-5 text-brand" /> API Keys</CardTitle>
                  </div>
                  <Button className="bg-brand hover:bg-brand-dark">Generate New Key</Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-muted-foreground uppercase bg-charcoal-900 border-b border-charcoal-700">
                        <tr>
                          <th className="px-4 py-3 rounded-tl-lg">Name</th>
                          <th className="px-4 py-3">Key</th>
                          <th className="px-4 py-3">Created</th>
                          <th className="px-4 py-3">Last Used</th>
                          <th className="px-4 py-3 rounded-tr-lg">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-charcoal-700/50 hover:bg-charcoal-700/20">
                          <td className="px-4 py-3 font-medium">Production Website</td>
                          <td className="px-4 py-3 font-mono text-muted-foreground">dc_live_****a8f2</td>
                          <td className="px-4 py-3 text-muted-foreground">Jan 12, 2026</td>
                          <td className="px-4 py-3 text-muted-foreground">2 hrs ago</td>
                          <td className="px-4 py-3"><Button variant="link" className="text-red-400 p-0 h-auto">Revoke</Button></td>
                        </tr>
                        <tr className="border-b border-charcoal-700/50 hover:bg-charcoal-700/20">
                          <td className="px-4 py-3 font-medium">Figma Plugin Dev</td>
                          <td className="px-4 py-3 font-mono text-muted-foreground">dc_live_****3c91</td>
                          <td className="px-4 py-3 text-muted-foreground">Mar 02, 2026</td>
                          <td className="px-4 py-3 text-muted-foreground">Yesterday</td>
                          <td className="px-4 py-3"><Button variant="link" className="text-red-400 p-0 h-auto">Revoke</Button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-sm font-semibold mb-3">Example Usage</h4>
                    <div className="relative">
                      <pre className="bg-charcoal-900 border border-charcoal-700 rounded-xl p-4 overflow-x-auto">
                        <code className="text-xs text-brand-light font-mono">
{`curl -X POST https://api.designcritiq.com/v1/analyze \\
  -H "Authorization: Bearer dc_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"image_url": "https://example.com/design.jpg"}'`}
                        </code>
                      </pre>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={handleCopyKey}
                        className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        {copiedKey ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </main>
    </div>
  )
}

"use client"

import { Clock, TrendingUp, AlertTriangle, CheckCircle, Search, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Sidebar } from "@/components/sidebar"

// Mock Data
const statsData = [
  { label: "Total Analyses", value: "142", trend: "+12% this week", icon: <TrendingUp className="h-4 w-4 text-brand" /> },
  { label: "Avg. Score", value: "76/100", trend: "+3 pts vs last month", icon: <CheckCircle className="h-4 w-4 text-green-400" /> },
  { label: "Critical Issues Found", value: "38", trend: "-5% this week", icon: <AlertTriangle className="h-4 w-4 text-red-400" /> },
  { label: "Improvements Made", value: "112", trend: "Based on suggestions", icon: <CheckCircle className="h-4 w-4 text-brand" /> },
]

const historyData = [
  { id: 1, name: "Landing_Page_v2.png", date: "2 hours ago", score: 82, thumb: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&q=80&w=100&h=100", issues: { critical: 0, warning: 2, suggestion: 3 } },
  { id: 2, name: "Social_Promo_Q4.jpg", date: "Yesterday", score: 45, thumb: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&q=80&w=100&h=100", issues: { critical: 3, warning: 1, suggestion: 1 } },
  { id: 3, name: "App_Dashboard_Dark.fig", date: "Mar 15, 2026", score: 92, thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=100&h=100", issues: { critical: 0, warning: 0, suggestion: 2 } },
  { id: 4, name: "Marketing_Banner.png", date: "Mar 12, 2026", score: 68, thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=100&h=100", issues: { critical: 1, warning: 4, suggestion: 2 } },
  { id: 5, name: "Email_Newsletter_Template_final.jpg", date: "Mar 10, 2026", score: 75, thumb: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=100&h=100", issues: { critical: 0, warning: 3, suggestion: 4 } },
]

const trendData = [
  { date: "Mon", score: 65 },
  { date: "Tue", score: 72 },
  { date: "Wed", score: 68 },
  { date: "Thu", score: 85 },
  { date: "Fri", score: 82 },
  { date: "Sat", score: 90 },
  { date: "Sun", score: 94 },
]

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-400 bg-green-500/10 border-green-500/20"
  if (score >= 50) return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
  return "text-red-400 bg-red-500/10 border-red-500/20"
}

export default function HistoryPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-charcoal-900 text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-charcoal-700 pb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Feedback History</h1>
              <p className="text-muted-foreground mt-1 text-sm">Review your past design analyses and track improvements.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search history..." className="pl-9 bg-charcoal-800 border-charcoal-700 w-[200px]" />
              </div>
              <Button variant="outline" className="border-charcoal-700 hover:bg-charcoal-800 text-foreground">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-brand hover:bg-brand-dark">Export All</Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {statsData.map((stat, i) => (
              <Card key={i} className="bg-charcoal-800 border-charcoal-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className="p-2 bg-charcoal-700/50 rounded-lg">{stat.icon}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">{stat.trend}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Timeline List */}
            <div className="xl:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold mb-4">Recent Analyses</h2>
              {historyData.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-charcoal-800 border border-charcoal-700 p-4 rounded-xl hover:bg-charcoal-700/50 transition-colors">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-charcoal-600">
                    <img src={item.thumb} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-sm truncate pr-4">{item.name}</h4>
                      <div className={`shrink-0 px-2.5 py-1 rounded-md text-xs font-bold border ${getScoreColor(item.score)}`}>
                        {item.score}/100
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.issues.critical > 0 && (
                        <Badge variant="secondary" className="bg-red-500/10 text-red-400 text-[10px] px-1.5 uppercase border-red-500/20">
                          {item.issues.critical} Critical
                        </Badge>
                      )}
                      {item.issues.warning > 0 && (
                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-400 text-[10px] px-1.5 uppercase border-yellow-500/20">
                          {item.issues.warning} Warning
                        </Badge>
                      )}
                      {item.issues.suggestion > 0 && (
                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 text-[10px] px-1.5 uppercase border-blue-500/20">
                          {item.issues.suggestion} Suggestion
                        </Badge>
                      )}
                      {item.issues.critical === 0 && item.issues.warning === 0 && item.issues.suggestion === 0 && (
                         <Badge variant="secondary" className="bg-green-500/10 text-green-400 text-[10px] px-1.5 uppercase border-green-500/20">
                         Perfect Score
                       </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="shrink-0 hidden sm:block">
                    <Button variant="outline" size="sm" className="border-charcoal-600 text-muted-foreground hover:text-foreground">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" className="w-full mt-4 text-brand hover:text-brand-light hover:bg-brand/10">
                Load More History
              </Button>
            </div>

            {/* Side Column: Chart */}
            <div className="space-y-8">
              <Card className="bg-charcoal-800 border-charcoal-700">
                <CardHeader>
                  <CardTitle className="text-lg">Score Trend (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 100]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f0f14', borderColor: '#334155', borderRadius: '8px' }}
                          itemStyle={{ color: '#ffffff' }}
                        />
                        <Line type="monotone" dataKey="score" stroke="#7c3aed" strokeWidth={3} dot={{ fill: '#7c3aed', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-charcoal-800 border-charcoal-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Weekly Insights</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your average design score has increased by 3 points this week. You've significantly reduced color contrast issues, but typography hierarchy warnings are up by 2%. 
                  </p>
                  <Button variant="link" className="text-brand px-0 mt-2">View full report &rarr;</Button>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

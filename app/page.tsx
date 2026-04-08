import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Image as ImageIcon, Zap, UploadCloud, CheckCircle2, ChevronRight, Menu } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f0f14] text-white selection:bg-brand/30">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand/20 blur-[120px] rounded-full mix-blend-screen opacity-70"></div>
        <div className="absolute top-[40%] -left-40 w-96 h-96 bg-rose-500/10 blur-[120px] rounded-full mix-blend-screen opacity-50"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-md border-b border-charcoal-700/50 sticky top-0 bg-[#0f0f14]/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">DesignCritiq</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-white text-muted-foreground transition-colors">Sign In</Link>
          <Link href="/dashboard" className="text-sm font-semibold bg-brand hover:bg-brand-dark px-4 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]">
            Get Started
          </Link>
        </div>
        
        <button className="md:hidden text-muted-foreground">
          <Menu />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold mb-8">
            <span className="flex h-2 w-2 rounded-full bg-brand animate-pulse"></span>
            Gemini 1.5 Flash Vision Enabled
         </div>
         
         <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
           Spot Design Mistakes Before Your Audience Does
         </h1>
         
         <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
           Upload any poster, ad, or UI mockup. Our multimodal AI analyzes typography, color contrast, and visual hierarchy to provide actionable fixes and beautiful generated variants.
         </p>

         <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Link href="/dashboard" className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand hover:bg-brand-dark text-white font-semibold text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              Try Free Analysis <ChevronRight className="w-5 h-5" />
            </Link>
            <Link href="#demo" className="w-full sm:w-auto px-8 py-3 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 border border-charcoal-600 text-white font-semibold text-lg flex items-center justify-center transition-all">
              Watch Demo
            </Link>
         </div>

         <div className="mt-20 w-full max-w-5xl rounded-2xl border border-charcoal-700 bg-charcoal-800/50 p-2 md:p-4 backdrop-blur-sm shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-transparent to-transparent z-10 rounded-2xl pointer-events-none align-bottom h-1/2 bottom-0 mt-auto"></div>
            <img 
              src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=1200&h=600" 
              alt="Dashboard Preview" 
              className="rounded-xl w-full h-auto border border-charcoal-700/50 shadow-inner opacity-80"
            />
         </div>
      </section>

      {/* Social Proof */}
      <section className="relative z-10 py-10 border-y border-charcoal-800 bg-charcoal-900/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">Trusted by 2,000+ Designers Worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mock Logos */}
             <div className="text-xl font-bold font-serif italic">Nova Studio</div>
             <div className="text-xl font-bold tracking-tighter">Vertex.</div>
             <div className="text-xl font-black">LUMEN</div>
             <div className="text-xl font-medium tracking-widest">KINETIC</div>
             <div className="text-xl font-bold font-mono">/O-R-B/</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">Three simple steps to elevate your graphic design.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", icon: <UploadCloud />, title: "Upload Your Design", desc: "Drag and drop any JPG, PNG, or PDF. We support posters, ads, social media graphics, and UI mockups." },
            { step: "02", icon: <Sparkles />, title: "AI Analyzes Everything", desc: "Our AI powered by Gemini Vision checks typography, color contrast, spacing, hierarchy, and accessibility in seconds." },
            { step: "03", icon: <ImageIcon />, title: "Get Fixes + Variants", desc: "Receive categorized issues with severity levels, specific fixes, and 3 AI-generated improved variants via Flux." },
          ].map((item, i) => (
             <div key={i} className="relative bg-charcoal-800 border border-charcoal-700 rounded-3xl p-8 hover:border-brand/50 hover:bg-charcoal-800/80 transition-all group">
               <div className="absolute top-6 right-8 text-6xl font-black text-charcoal-700/30 group-hover:text-brand/10 transition-colors">{item.step}</div>
               <div className="w-14 h-14 rounded-2xl bg-charcoal-700 flex items-center justify-center mb-6 text-brand">
                 {item.icon}
               </div>
               <h3 className="text-xl font-bold mb-3">{item.title}</h3>
               <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
             </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 py-32 px-6 bg-charcoal-900 border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-left md:text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need Details</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A complete suite of automated design critique tools.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Typography Audit", desc: "Checks font sizes, pairing logic, text hierarchy, and guarantees excellent readability across all viewports." },
              { title: "Color Contrast Checker", desc: "Automatically verifies text-to-background contrast against WCAG AA and AAA accessibility standards." },
              { title: "Spacing & Alignment", desc: "Using computer vision to detect misaligned elements and inconsistent padding in your grid structures." },
              { title: "AI-Generated Variants", desc: "Takes your upload and produces 3 gorgeous, redesigned iterative options using Replicate's Flux model." },
              { title: "Severity Tagging", desc: "Triage feedback fast: we classify every issue into Critical, Warning, or Suggestion." },
              { title: "Export Ready", desc: "Download high-quality PDF reports of your feedback to share with stakeholders or clients." },
            ].map((f, i) => (
               <div key={i} className="bg-charcoal-800/50 border border-charcoal-700/50 p-6 rounded-2xl flex gap-4 backdrop-blur-sm">
                 <div className="shrink-0 mt-1"><CheckCircle2 className="w-5 h-5 text-brand" /></div>
                 <div>
                   <h4 className="font-bold text-lg mb-2">{f.title}</h4>
                   <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg">Choose the tier that fits your design workflow.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free */}
          <div className="bg-charcoal-800 border border-charcoal-700 rounded-3xl p-8 flex flex-col">
            <h3 className="text-xl font-bold mb-2">Starter</h3>
            <p className="text-muted-foreground text-sm mb-6">Perfect for occasional feedback.</p>
            <p className="text-5xl font-bold mb-8">Free</p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-brand" /> 5 analyses / month</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-brand" /> Basic text feedback</li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground opacity-50"><CheckCircle2 className="w-4 h-4" /> No AI variants</li>
            </ul>
            <Link href="/login" className="w-full py-3 rounded-xl bg-charcoal-700 hover:bg-charcoal-600 font-semibold text-center mt-auto transition-colors">Start Free</Link>
          </div>
          
          {/* Pro */}
          <div className="bg-charcoal-800 border-2 border-brand relative rounded-3xl p-8 flex flex-col transform md:-translate-y-4 shadow-[0_0_30px_rgba(124,58,237,0.15)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="text-muted-foreground text-sm mb-6">For professional freelance designers.</p>
            <p className="text-5xl font-bold mb-1"><span className="text-2xl text-muted-foreground align-top">$</span>12<span className="text-lg text-muted-foreground font-normal">/mo</span></p>
            <p className="text-xs text-brand-light mb-8">Billed annually</p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-brand" /> Unlimited analyses</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-brand" /> 3 AI Redesign Variants per file</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-brand" /> PDF Report Exports</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-brand" /> Priority Server Queue</li>
            </ul>
            <Link href="/login" className="w-full py-3 rounded-xl bg-brand hover:bg-brand-dark text-white font-semibold text-center mt-auto transition-colors">Go Pro</Link>
          </div>

          {/* Team */}
          <div className="bg-charcoal-800 border border-charcoal-700 rounded-3xl p-8 flex flex-col">
            <h3 className="text-xl font-bold mb-2">Team</h3>
            <p className="text-muted-foreground text-sm mb-6">For agencies and product teams.</p>
            <p className="text-5xl font-bold mb-1"><span className="text-2xl text-muted-foreground align-top">$</span>29<span className="text-lg text-muted-foreground font-normal">/mo</span></p>
            <p className="text-xs text-muted-foreground mb-8">Includes 3 seats</p>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-brand" /> Everything in Pro</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-brand" /> Shared Team Workspace</li>
              <li className="flex items-center gap-3 text-sm"><CheckCircle2 className="w-4 h-4 text-brand" /> Developer API Access</li>
            </ul>
            <Link href="/login" className="w-full py-3 rounded-xl bg-charcoal-700 hover:bg-charcoal-600 font-semibold text-center mt-auto transition-colors">Start Trial</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-charcoal-800 bg-[#07070a] pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-b border-charcoal-800 pb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-brand" />
              <span className="text-xl font-bold tracking-tight">DesignCritiq</span>
            </div>
            <p className="text-sm text-muted-foreground">Elevating the world's standard of visual design through intelligent feedback.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Integration</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center md:text-left text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>© 2026 DesignCritiq Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             {/* Social Links placeholders */}
             <div className="w-8 h-8 rounded-full bg-charcoal-800 hover:bg-brand/20 flex items-center justify-center cursor-pointer transition-colors">X</div>
             <div className="w-8 h-8 rounded-full bg-charcoal-800 hover:bg-brand/20 flex items-center justify-center cursor-pointer transition-colors">in</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

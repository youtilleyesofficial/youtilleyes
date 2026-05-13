import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401-Photoroom_1774903197281.png";
import footerLogoImg from "@assets/20260331_030902_1774906812939.png";
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Vision", href: "/vision" },
  { label: "Contact Us", href: "/contact" },
];

function VisionSVG() {
  return (
    <svg viewBox="0 0 420 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-xs mx-auto md:max-w-full">
      <rect width="420" height="320" rx="24" fill="#1A428A" fillOpacity="0.04" />
      <path d="M210 38 L388 282 L32 282 Z" fill="#1A428A" fillOpacity="0.05" stroke="#1A428A" strokeWidth="1.5" strokeOpacity="0.14" />
      <circle cx="210" cy="38" r="20" fill="#F58220" fillOpacity="0.85" />
      <circle cx="210" cy="38" r="11" fill="#F58220" />
      <circle cx="388" cy="282" r="16" fill="#1A428A" fillOpacity="0.55" />
      <circle cx="32" cy="282" r="16" fill="#1A428A" fillOpacity="0.55" />
      <circle cx="210" cy="148" r="42" fill="#1A428A" fillOpacity="0.07" stroke="#1A428A" strokeWidth="1" strokeOpacity="0.18" />
      <circle cx="210" cy="148" r="26" fill="#1A428A" fillOpacity="0.11" />
      <circle cx="210" cy="148" r="13" fill="#1A428A" fillOpacity="0.45" />
      <line x1="210" y1="58" x2="210" y2="106" stroke="#F58220" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3" />
      <rect x="50" y="200" width="128" height="36" rx="10" fill="#1A428A" fillOpacity="0.08" />
      <rect x="242" y="200" width="128" height="36" rx="10" fill="#F58220" fillOpacity="0.1" />
      <text x="80" y="222" fontSize="11" fill="#1A428A" fontWeight="800" opacity="0.7">Identify People</text>
      <text x="268" y="222" fontSize="11" fill="#F58220" fontWeight="800" opacity="0.9">Connect Force</text>
      <text x="168" y="24" fontSize="11" fill="#F58220" fontWeight="900" opacity="0.85">Vision</text>
      <text x="12" y="310" fontSize="10" fill="#1A428A" fontWeight="700" opacity="0.55">Execution</text>
      <text x="350" y="310" fontSize="10" fill="#1A428A" fontWeight="700" opacity="0.55">Results</text>
      {/* orbit dots */}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 210 + 76 * Math.cos(rad);
        const cy = 148 + 76 * Math.sin(rad);
        return <circle key={i} cx={cx} cy={cy} r="4" fill={i % 2 === 0 ? "#1A428A" : "#F58220"} fillOpacity="0.45" />;
      })}
    </svg>
  );
}

const steps = [
  { n: "01", emoji: "👁️", title: "Identify Yourself", tag: "Who Are You?", desc: "We envision a world where every person deeply understands their own personality, strengths, mindset, and purpose. Self-awareness is the first step to a meaningful life and we believe everyone deserves the space to discover themselves fully.", color: "#1A428A" },
  { n: "02", emoji: "🎯", title: "Identify Your Objectives", tag: "What Do You Want?", desc: "A future where individuals are empowered to clearly define their goals, ambitions, and direction. They have the support structures, communities, and tools to pursue them with confidence and clarity.", color: "#F58220" },
  { n: "03", emoji: "⭐", title: "Identify Your Skills", tag: "What Can You Do?", desc: "We envision a platform where talent, from art to technology, from trades to leadership, is recognized, showcased, and valued equally. Every skill matters, and every skill has a market.", color: "#1A428A" },
  { n: "04", emoji: "✅", title: "Identify Your Eligibility", tag: "Where Do You Fit?", desc: "A world where qualifications and capabilities are matched intelligently to the right roles and opportunities, creating perfect fits that benefit both the individual and the organization they serve.", color: "#F58220" },
  { n: "05", emoji: "⚡", title: "Identify Your Tasks", tag: "What Work Suits You?", desc: "We see a future where meaningful work finds the right person. Every project, mission, and responsibility is connected to the most capable and passionate individual perfectly suited for that role.", color: "#1A428A" },
  { n: "06", emoji: "🌐", title: "Identify Your Platform", tag: "Where Will You Grow?", desc: "Our ultimate vision is that every individual finds their perfect environment. The right community, network, and ecosystem to grow, collaborate, thrive, and leave a lasting impact on the world.", color: "#F58220" },
];

export default function Vision() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const dashboardHref =
    user?.role === "ADMIN" ? "/admin/dashboard" :
    user?.role === "CLIENT" ? "/client/dashboard" : "/user/dashboard";

  return (
    <div className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/"><img src={logoImg} alt="YouTillEyes" className="h-9 md:h-10 w-auto cursor-pointer" /></Link>
          <nav className="hidden md:flex gap-7 text-sm font-medium">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href} className={`transition-colors ${l.href === "/vision" ? "text-primary font-bold" : "text-slate-500 hover:text-primary"}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <Link href={dashboardHref}><Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold text-xs md:text-sm">Dashboard</Button></Link>
            ) : (
              <>
                <Link href="/login"><Button variant="ghost" size="sm" className="hidden sm:flex text-slate-600">Log in</Button></Link>
                <Link href="/register"><Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white font-semibold text-xs md:text-sm">Get Started</Button></Link>
              </>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-100">
              {mobileOpen ? <X className="h-5 w-5 text-slate-700" /> : <Menu className="h-5 w-5 text-slate-700" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/98">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(l => (
                <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${l.href === "/vision" ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50"}`}>
                  {l.label}
                </Link>
              ))}
              <div className="flex gap-3 mt-3 pt-3 border-t border-slate-100">
                <Link href="/login" className="flex-1"><Button variant="outline" className="w-full">Log in</Button></Link>
                <Link href="/register" className="flex-1"><Button className="w-full bg-secondary text-white">Get Started</Button></Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-14 md:py-28 px-4 md:px-6" style={{ background: "linear-gradient(145deg, #eef2ff 0%, #fafbff 50%, #fff8f0 100%)" }}>
          <div className="absolute top-8 right-6 w-3 h-3 rounded-full bg-orange-400 animate-pulse opacity-50" />
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs md:text-sm font-bold mb-6" style={{ background: "rgba(26,66,138,0.08)", borderColor: "rgba(26,66,138,0.2)", color: "#1A428A" }}>
                  👁️ Our Vision
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-[1.1]">
                  A World Where Every Individual Is Seen
                </h1>
                <p className="text-sm md:text-lg text-slate-600 leading-relaxed mb-8">
                  We envision a future where no talent goes unnoticed, no potential remains unused, and every person finds their right place in the world. Aap Nazro Tak, until you are truly seen.
                </p>
                {/* Mobile 3 mini cards */}
                <div className="flex gap-3 flex-wrap md:hidden mb-8">
                  {[
                    { icon: "👁️", label: "Identify" },
                    { icon: "🤝", label: "Connect" },
                    { icon: "⚡", label: "Create" },
                  ].map((c, i) => (
                    <div key={i} className="rounded-2xl px-4 py-3 flex items-center gap-2 border" style={{ background: "rgba(255,255,255,0.9)", borderColor: "rgba(26,66,138,0.15)", boxShadow: "0 4px 16px rgba(26,66,138,0.08)" }}>
                      <span className="text-xl">{c.icon}</span>
                      <span className="font-black text-sm text-slate-800">{c.label}</span>
                    </div>
                  ))}
                </div>
                <Link href="/register">
                  <Button size="lg" className="h-12 md:h-14 px-7 md:px-8 font-bold text-sm md:text-base text-white shadow-lg" style={{ background: "#1A428A", boxShadow: "0 8px 30px rgba(26,66,138,0.28)" }}>
                    Be Part of the Vision
                  </Button>
                </Link>
              </div>
              {/* SVG visible on all screens */}
              <div className="flex items-center justify-center mt-6 md:mt-0">
                <VisionSVG />
              </div>
            </div>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="py-14 md:py-20 px-4 md:px-6" style={{ background: "linear-gradient(135deg, #1A428A 0%, #0d2a5e 100%)" }}>
          <div className="container mx-auto max-w-4xl text-center text-white">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-5" style={{ color: "#F58220" }}>The Big Picture</p>
            <h2 className="text-2xl md:text-4xl font-black mb-5 md:mb-6">Aap Nazro Tak. Until You Are Seen.</h2>
            <p className="text-blue-100 text-sm md:text-xl leading-relaxed mb-8 md:mb-10 max-w-3xl mx-auto">
              Our vision is to create a world where every individual's identity, skills, and purpose are identified, recognized, and put to meaningful use. Talent meets opportunity at every level of society.
            </p>
            <blockquote className="text-lg md:text-2xl font-black italic text-left max-w-2xl mx-auto py-5 px-6 md:py-6 md:px-8 rounded-2xl" style={{ background: "rgba(245, 130, 32, 0.15)", borderLeft: "5px solid #F58220" }}>
              "The strength of society begins with the identification of individual potential."
            </blockquote>
          </div>
        </section>

        {/* 6 Steps Vision */}
        <section className="py-14 md:py-24 px-4 md:px-6 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10 md:mb-16">
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>The Identify Yourself Framework</p>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 md:mb-5">Our Vision for Every Individual</h2>
              <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto">We see a future where every person walks through these six stages of self-identification and finds their rightful place in the world.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {steps.map((step, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                  <div className="h-1.5" style={{ background: step.color }} />
                  <div className="p-5 md:p-8">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl text-white font-black text-base md:text-xl flex items-center justify-center shadow-md shrink-0" style={{ background: step.color }}>
                        {step.n}
                      </div>
                      <div className="text-3xl md:text-4xl">{step.emoji}</div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{step.tag}</p>
                        <h3 className="font-black text-slate-900 text-sm md:text-base leading-tight">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs md:text-base leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Utilize Point */}
        <section className="py-14 md:py-24 px-4 md:px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10 md:mb-16">
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>Utilize Point</p>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 md:mb-5">What We Want to Create</h2>
              <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto">Our vision is built on a simple promise. Every individual will be exposed, empowered, connected, and enabled to live their fullest life.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
              {[
                { emoji: "👁️", title: "Expose", color: "#1A428A", bg: "#EEF2FF", border: "#C7D2FE", desc: "Be exposed around the society and make yourself visible everywhere at once. True visibility means freedom and the ability to get your needs fulfilled from anywhere by someone who can truly help you." },
                { emoji: "💪", title: "Empower", color: "#F58220", bg: "#FFF7ED", border: "#FED7AA", desc: "Every talent, every skill, every individual ability deserves a platform to grow. We envision a world where people are empowered to utilize themselves at every level, personally, professionally, and socially." },
                { emoji: "🌐", title: "Connect", color: "#1A428A", bg: "#EEF2FF", border: "#C7D2FE", desc: "Building bridges between people who have skills and people who need them. From students to businesses, from artists to organizations, the right connection changes everything and opens invisible doors." },
                { emoji: "💡", title: "Enable", color: "#F58220", bg: "#FFF7ED", border: "#FED7AA", desc: "Creating the conditions where ideas become actions, where potential becomes achievement, and where individuals become the leaders of their own success story, supported by a community that believes in them." },
              ].map((item, i) => (
                <div key={i} className="rounded-3xl p-7 md:p-10 hover:shadow-xl transition-all duration-300 border" style={{ background: item.bg, borderColor: item.border }}>
                  <div className="text-5xl md:text-6xl mb-4 md:mb-5">{item.emoji}</div>
                  <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4" style={{ color: item.color }}>{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Folks-Force Vision */}
        <section className="py-14 md:py-24 px-4 md:px-6 bg-slate-900 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#F58220" }}>Folks-Force Platform</p>
            <h2 className="text-2xl md:text-4xl font-black mb-6 md:mb-8">When the Right People Connect, Everything Becomes Possible</h2>
            <p className="text-blue-100 text-sm md:text-xl leading-relaxed mb-10 md:mb-14 max-w-3xl mx-auto">
              Through the Folks-Force Platform, we are building a powerful global network. A collaborative force that identifies the right individuals for the right opportunities, missions, and projects. One connection at a time, we are changing lives.
            </p>
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              {[
                { emoji: "👁️", label: "Identify", desc: "Capable individuals across all fields" },
                { emoji: "🤝", label: "Connect", desc: "Build strong collaborative networks" },
                { emoji: "⚡", label: "Create", desc: "Transform ideas into real outcomes" },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl p-5 md:p-8 hover:bg-white/10 transition-colors border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="text-3xl md:text-5xl mb-3 md:mb-4">{item.emoji}</div>
                  <h4 className="font-black text-white text-base md:text-xl mb-1 md:mb-2">{item.label}</h4>
                  <p className="text-blue-200 text-xs md:text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 md:py-20 px-4 md:px-6 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F58220 0%, #e06b0a 100%)" }}>
          <div className="container mx-auto max-w-3xl text-white">
            <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-6">Help Us Build This Future</h2>
            <p className="text-white/85 text-base md:text-xl mb-8 md:mb-10 leading-relaxed">Join the Folks-Force Platform. Be seen. Utilize yourself. Together, we will create a world where every individual's potential is recognized and realized.</p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link href="/register" className="w-full sm:w-auto"><Button size="lg" className="w-full h-12 md:h-14 px-8 font-bold bg-white text-slate-900 hover:bg-slate-100">Join YouTillEyes</Button></Link>
              <Link href="/about" className="w-full sm:w-auto"><Button size="lg" variant="outline" className="w-full h-12 md:h-14 px-8 font-semibold border-white text-white hover:bg-white/10">Read About Us</Button></Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 pt-12 md:pt-16 pb-8 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
              <div className="col-span-2 lg:col-span-1">
                <img src={footerLogoImg} alt="YouTillEyes" className="h-10 md:h-12 w-auto mb-4" />
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">Aap Nazro Tak. Utilize Yourself.</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400"><MapPin className="h-3 w-3 shrink-0" style={{ color: "#F58220" }} />Uttar Pradesh, India</div>
                  <div className="flex items-center gap-2 text-xs text-slate-400"><Phone className="h-3 w-3 shrink-0" style={{ color: "#F58220" }} />+91 7084424242</div>
                  <div className="flex items-center gap-2 text-xs text-slate-400"><Mail className="h-3 w-3 shrink-0" style={{ color: "#F58220" }} />info@youtilleyes.com</div>
                </div>
                <div className="flex gap-2">
                  {[Linkedin, Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="h-8 w-8 rounded-full bg-slate-700 hover:bg-orange-500 flex items-center justify-center transition-colors"><Icon className="h-3.5 w-3.5" /></a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Our Pages</h4>
                <ul className="space-y-2.5 text-xs">
                  {navLinks.map(link => (
                    <li key={link.label}><Link href={link.href} className="text-slate-400 hover:text-orange-400 transition-colors">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-2.5 text-xs">
                  {[{ label: "Browse Projects", href: "/user/projects" }, { label: "Post a Project", href: "/client/projects/new" }, { label: "My Bids", href: "/user/bids" }, { label: "My Wallet", href: "/user/wallet" }].map(link => (
                    <li key={link.label}><Link href={link.href} className="text-slate-400 hover:text-orange-400 transition-colors">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Legal</h4>
                <ul className="space-y-2.5 text-xs">
                  {["Terms and Conditions", "Privacy Policy", "Cookie Policy", "Refund Policy", "Disclaimer"].map(label => (
                    <li key={label}><a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">{label}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
              <p>&copy; {new Date().getFullYear()} YouTillEyes. All rights reserved.</p>
              <p>Made with love by Niskutech &nbsp;|&nbsp; ₹ INR</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

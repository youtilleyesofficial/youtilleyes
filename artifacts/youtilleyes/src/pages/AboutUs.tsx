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

function AboutSVG() {
  return (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-xs mx-auto md:max-w-full">
      <rect width="400" height="320" rx="24" fill="#1A428A" fillOpacity="0.04" />
      <circle cx="200" cy="150" r="90" fill="#1A428A" fillOpacity="0.06" />
      <circle cx="200" cy="150" r="62" fill="#1A428A" fillOpacity="0.08" />
      <circle cx="200" cy="150" r="36" fill="#F58220" fillOpacity="0.15" />
      <circle cx="200" cy="150" r="18" fill="#F58220" fillOpacity="0.85" />
      <circle cx="200" cy="150" r="9" fill="#F58220" />
      {[
        { cx: 68, cy: 68 }, { cx: 332, cy: 68 }, { cx: 345, cy: 215 },
        { cx: 68, cy: 215 }, { cx: 200, cy: 28 }, { cx: 200, cy: 278 },
      ].map((p, i) => (
        <g key={i}>
          <line x1={p.cx} y1={p.cy} x2="200" y2="150" stroke="#1A428A" strokeWidth="1" strokeOpacity="0.18" strokeDasharray="5 4" />
          <circle cx={p.cx} cy={p.cy} r="22" fill={i % 2 === 0 ? "#1A428A" : "#F58220"} fillOpacity="0.07" />
          <circle cx={p.cx} cy={p.cy} r="13" fill={i % 2 === 0 ? "#1A428A" : "#F58220"} fillOpacity="0.15" />
          <circle cx={p.cx} cy={p.cy} r="7" fill={i % 2 === 0 ? "#1A428A" : "#F58220"} fillOpacity="0.75" />
        </g>
      ))}
      <rect x="60" y="296" width="280" height="16" rx="6" fill="#1A428A" fillOpacity="0.06" />
      <text x="108" y="307" fontSize="10.5" fill="#1A428A" fontWeight="800" opacity="0.5">Aap Nazro Tak — Utilize Yourself</text>
    </svg>
  );
}

export default function AboutUs() {
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
              <Link key={l.label} href={l.href} className={`transition-colors ${l.href === "/about" ? "text-primary font-bold" : "text-slate-500 hover:text-primary"}`}>{l.label}</Link>
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
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${l.href === "/about" ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50"}`}>
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
          <div className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-blue-500 animate-pulse opacity-40" />
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs md:text-sm font-bold mb-6" style={{ background: "rgba(26,66,138,0.08)", borderColor: "rgba(26,66,138,0.2)", color: "#1A428A" }}>
                  About YouTillEyes
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-3 leading-[1.1]">
                  Utilize Yourself.
                </h1>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-5 md:mb-6" style={{ color: "#F58220" }}>Aap Nazro Tak.</h2>
                <p className="text-sm md:text-lg text-slate-600 leading-relaxed mb-8">
                  We are a people-powered ecosystem designed to help individuals identify their true abilities, purpose, and place in society — because every person carries unique value that deserves to be seen and utilized.
                </p>
                {/* Mobile stat pills */}
                <div className="flex flex-wrap gap-3 md:hidden mb-8">
                  {[
                    { n: "5000+", label: "Talents", color: "#1A428A" },
                    { n: "100+", label: "Projects", color: "#F58220" },
                    { n: "2026", label: "Founded", color: "#1A428A" },
                  ].map((s, i) => (
                    <div key={i} className="rounded-2xl px-4 py-2.5 text-center border" style={{ background: "rgba(255,255,255,0.9)", borderColor: s.color + "25", boxShadow: "0 4px 16px " + s.color + "15" }}>
                      <span className="font-black text-lg mr-1.5" style={{ color: s.color }}>{s.n}</span>
                      <span className="text-xs text-slate-500 font-medium">{s.label}</span>
                    </div>
                  ))}
                </div>
                <Link href="/register">
                  <Button size="lg" className="h-12 md:h-14 px-7 md:px-8 font-bold text-sm md:text-base text-white shadow-lg" style={{ background: "#1A428A", boxShadow: "0 8px 30px rgba(26,66,138,0.28)" }}>
                    Join YouTillEyes
                  </Button>
                </Link>
              </div>
              {/* SVG — visible on all screens */}
              <div className="flex items-center justify-center mt-6 md:mt-0">
                <AboutSVG />
              </div>
            </div>
          </div>
        </section>

        {/* What We Believe */}
        <section className="py-14 md:py-20 px-4 md:px-6 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#F58220" }}>What We Believe</p>
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-5">Everyone Carries Unique Value</h2>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm md:text-lg">
                  YouTillEyes was born from a simple but powerful belief — every person carries unique value, skills, and potential that can contribute meaningfully to the world.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4 text-sm md:text-base">
                  We believe that everyone has skills in their life that need to be utilized in the right directions to reach the right places and connections.
                </p>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Our platform creates a structured journey of self-identification, growth, collaboration, and opportunity, enabling people to connect through shared objectives, talents, and tasks.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 md:space-y-0 md:grid-cols-1 md:gap-0 md:space-y-5">
                {[
                  { n: "5000+", label: "Talented Individuals", sub: "waiting to be identified", color: "#1A428A" },
                  { n: "100+", label: "Active Projects", sub: "posted by real clients", color: "#F58220" },
                  { n: "6", label: "Identify Steps", sub: "in your growth journey", color: "#1A428A" },
                  { n: "1", label: "Mission", sub: "to utilize you, fully", color: "#F58220" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-2xl p-4 md:p-5 border" style={{ background: s.color + "08", borderColor: s.color + "20" }}>
                    <div className="text-2xl md:text-3xl font-black shrink-0 w-16 md:w-20 text-center" style={{ color: s.color }}>{s.n}</div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{s.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-14 md:py-20 px-4 md:px-6" style={{ background: "linear-gradient(135deg, #1A428A 0%, #0d2a5e 100%)" }}>
          <div className="container mx-auto max-w-4xl text-center text-white">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-5" style={{ color: "#F58220" }}>Our Philosophy</p>
            <blockquote className="text-xl md:text-4xl font-black italic leading-relaxed mb-6 md:mb-8">
              "The strength of society begins with the identification of individual potential."
            </blockquote>
            <p className="text-blue-100 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">
              YouTillEyes represents a modern framework of origin, existence, and human utilization — where individuals are recognized not only for who they are, but for what they can create, contribute, and achieve together.
            </p>
          </div>
        </section>

        {/* Mission Cards */}
        <section className="py-14 md:py-24 px-4 md:px-6 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10 md:mb-16">
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>The Folks-Force Mission</p>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 md:mb-5">What We Do Every Day</h2>
              <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto">Through the Folks-Force Platform, we build a powerful network that helps identify the right individuals for the right opportunities.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { emoji: "🎯", title: "Identify Capable Individuals", desc: "We help people discover who they truly are — their strengths, skills, and purpose. No talent goes unnoticed.", bg: "#EEF2FF", border: "#C7D2FE" },
                { emoji: "🤝", title: "Build Collaborative Networks", desc: "Connecting like-minded people, professionals, and businesses so they can achieve shared goals together.", bg: "#FFF7ED", border: "#FED7AA" },
                { emoji: "⚡", title: "Match People with Opportunities", desc: "Every person finds the right project or mission that fits their unique profile — no mismatches, only perfect connections.", bg: "#EEF2FF", border: "#C7D2FE" },
                { emoji: "💪", title: "Empower Communities", desc: "Strengthening communities by putting individual talents to work for collective progress and shared success.", bg: "#FFF7ED", border: "#FED7AA" },
                { emoji: "🚀", title: "Real-World Execution", desc: "Transforming ideas, ambitions, and skills into real outcomes through structured collaboration. We deliver.", bg: "#EEF2FF", border: "#C7D2FE" },
                { emoji: "✨", title: "A Force of Creation", desc: "When the right people connect, everything becomes possible. We make those connections happen every day.", bg: "#FFF7ED", border: "#FED7AA" },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl p-5 md:p-7 hover:shadow-xl transition-all hover:-translate-y-1 duration-300 border" style={{ background: item.bg, borderColor: item.border }}>
                  <div className="text-4xl md:text-5xl mb-4 md:mb-5">{item.emoji}</div>
                  <h4 className="font-bold text-slate-900 text-base md:text-lg mb-2 md:mb-3">{item.title}</h4>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-14 md:py-24 px-4 md:px-6 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-10 md:mb-12">
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>Our Story</p>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 md:mb-5">From Uttar Pradesh to the World</h2>
            </div>
            <div className="rounded-3xl p-7 md:p-14 border border-slate-100 shadow-sm" style={{ background: "linear-gradient(135deg, #fafbff, #fff8f0)" }}>
              <p className="text-sm md:text-lg text-slate-600 leading-relaxed mb-5 md:mb-6">
                YouTillEyes was founded in Uttar Pradesh, India, with the vision of creating a platform where every individual — regardless of background, qualification, or location — can be seen, valued, and utilized for their unique capabilities.
              </p>
              <p className="text-sm md:text-lg text-slate-600 leading-relaxed mb-5 md:mb-6">
                We saw a gap: countless talented people with extraordinary skills going unnoticed, while businesses and clients struggled to find the right people for their projects. We built YouTillEyes to bridge that gap — not just as a marketplace, but as a full ecosystem of identification, connection, and growth.
              </p>
              <p className="text-base md:text-xl text-slate-800 leading-relaxed font-semibold italic" style={{ borderLeft: "4px solid #F58220", paddingLeft: "1.25rem" }}>
                This is more than a platform — it is a Force of Capability, Collaboration, and Creation. And we are just getting started.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 md:py-20 px-4 md:px-6 text-center" style={{ background: "linear-gradient(135deg, #1A428A 0%, #0d2a5e 100%)" }}>
          <div className="container mx-auto max-w-3xl text-white">
            <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-6">Be Part of the Movement</h2>
            <p className="text-blue-100 text-base md:text-xl mb-8 md:mb-10 leading-relaxed">Join the Folks-Force Platform and help us build a world where every individual's potential is identified, valued, and utilized.</p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link href="/register" className="w-full sm:w-auto"><Button size="lg" className="w-full h-12 md:h-14 px-8 font-bold text-white shadow-xl" style={{ background: "#F58220" }}>Join YouTillEyes</Button></Link>
              <Link href="/vision" className="w-full sm:w-auto"><Button size="lg" variant="outline" className="w-full h-12 md:h-14 px-8 font-semibold border-white text-white hover:bg-white/10">Read Our Vision</Button></Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 pt-12 md:pt-16 pb-8 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
              <div className="col-span-2 lg:col-span-1">
                <img src={footerLogoImg} alt="YouTillEyes" className="h-10 md:h-12 w-auto mb-4" />
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">Aap Nazro Tak — Utilize Yourself.</p>
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

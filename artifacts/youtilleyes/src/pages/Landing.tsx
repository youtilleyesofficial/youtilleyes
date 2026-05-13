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

function MeshBg() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="rg1" cx="20%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#1A428A" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1A428A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rg2" cx="80%" cy="70%" r="50%">
          <stop offset="0%" stopColor="#F58220" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#F58220" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#rg1)" />
      <rect width="100%" height="100%" fill="url(#rg2)" />
    </svg>
  );
}

function HeroSVG() {
  return (
    <svg viewBox="0 0 480 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-sm mx-auto">
      <circle cx="240" cy="190" r="130" fill="#1A428A" fillOpacity="0.06" />
      <circle cx="240" cy="190" r="90" fill="#1A428A" fillOpacity="0.08" />
      <circle cx="240" cy="190" r="55" fill="#F58220" fillOpacity="0.13" />
      <circle cx="240" cy="190" r="28" fill="#F58220" fillOpacity="0.75" />
      <circle cx="240" cy="190" r="14" fill="#F58220" />
      {[
        { cx: 100, cy: 80, label: "Talent", o: "#1A428A" },
        { cx: 380, cy: 80, label: "Client", o: "#F58220" },
        { cx: 430, cy: 250, label: "Growth", o: "#1A428A" },
        { cx: 300, cy: 350, label: "Skills", o: "#F58220" },
        { cx: 100, cy: 300, label: "Identify", o: "#1A428A" },
        { cx: 50, cy: 180, label: "Connect", o: "#F58220" },
        { cx: 190, cy: 50, label: "Purpose", o: "#1A428A" },
        { cx: 380, cy: 310, label: "Mission", o: "#F58220" },
      ].map((n, i) => (
        <g key={i}>
          <line x1={n.cx} y1={n.cy} x2="240" y2="190" stroke={n.o} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="5 4" />
          <circle cx={n.cx} cy={n.cy} r="24" fill={n.o} fillOpacity="0.07" />
          <circle cx={n.cx} cy={n.cy} r="14" fill={n.o} fillOpacity="0.14" />
          <circle cx={n.cx} cy={n.cy} r="7" fill={n.o} fillOpacity="0.75" />
          <text x={n.cx - 16} y={n.cy + 34} fontSize="9.5" fill={n.o} fontWeight="700" opacity="0.75">{n.label}</text>
        </g>
      ))}
      <text x="180" y="230" fontSize="11" fill="#1A428A" fontWeight="900" opacity="0.55">Folks-Force</text>
    </svg>
  );
}

function NetworkIllustration() {
  return (
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="400" height="260" rx="16" fill="#1A428A" fillOpacity="0.04" />
      {[60, 160, 260, 340].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={90} r="28" fill={i % 2 === 0 ? "#1A428A" : "#F58220"} fillOpacity="0.13" />
          <circle cx={x} cy={90} r="16" fill={i % 2 === 0 ? "#1A428A" : "#F58220"} fillOpacity="0.22" />
          <circle cx={x} cy={90} r="8" fill={i % 2 === 0 ? "#1A428A" : "#F58220"} fillOpacity="0.8" />
          {i < 3 && <line x1={x + 16} y1={90} x2={[60, 160, 260, 340][i + 1] - 16} y2={90} stroke="#1A428A" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="6 4" />}
        </g>
      ))}
      <rect x="30" y="140" width="80" height="8" rx="4" fill="#1A428A" fillOpacity="0.15" />
      <rect x="130" y="140" width="80" height="8" rx="4" fill="#F58220" fillOpacity="0.2" />
      <rect x="230" y="140" width="80" height="8" rx="4" fill="#1A428A" fillOpacity="0.15" />
      <rect x="310" y="140" width="60" height="8" rx="4" fill="#F58220" fillOpacity="0.2" />
      <circle cx="200" cy="210" r="30" fill="#F58220" fillOpacity="0.1" />
      <circle cx="200" cy="210" r="16" fill="#F58220" fillOpacity="0.2" />
      <circle cx="200" cy="210" r="8" fill="#F58220" fillOpacity="0.85" />
    </svg>
  );
}

const marqueeItems = ["You Hire", "Freebies", "Yousocial", "Youdeo", "Youlogs", "Women Empowerment", "Youth Culture", "Volunteer Award", "Folks-Force Platform", "Aap Nazro Tak", "Utilize Yourself", "Identify Your Skills"];

export default function Landing() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const dashboardHref =
    user?.role === "ADMIN" ? "/admin/dashboard" :
    user?.role === "CLIENT" ? "/client/dashboard" : "/user/dashboard";

  return (
    <div className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/"><img src={logoImg} alt="YouTillEyes" className="h-9 md:h-10 w-auto" /></Link>
          <nav className="hidden md:flex gap-7 text-sm font-medium">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href} className={`transition-colors ${l.href === "/" ? "text-primary font-bold" : "text-slate-500 hover:text-primary"}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 md:gap-3">
            {user ? (
              <Link href={dashboardHref}><Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold text-xs md:text-sm">Dashboard</Button></Link>
            ) : (
              <>
                <Link href="/login"><Button variant="ghost" size="sm" className="hidden sm:flex text-slate-600 font-medium">Log in</Button></Link>
                <Link href="/register"><Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white font-semibold text-xs md:text-sm">Get Started</Button></Link>
              </>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
              {mobileOpen ? <X className="h-5 w-5 text-slate-700" /> : <Menu className="h-5 w-5 text-slate-700" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/98 backdrop-blur">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(l => (
                <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${l.href === "/" ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50"}`}>
                  {l.label}
                </Link>
              ))}
              <div className="flex gap-3 mt-3 pt-3 border-t border-slate-100">
                <Link href="/login" className="flex-1"><Button variant="outline" className="w-full font-semibold">Log in</Button></Link>
                <Link href="/register" className="flex-1"><Button className="w-full bg-secondary text-white font-semibold">Get Started</Button></Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-14 md:py-28 px-4 md:px-6" style={{ background: "linear-gradient(145deg, #f0f4ff 0%, #fafbff 50%, #fff8f0 100%)" }}>
          <MeshBg />
          <div className="absolute top-10 right-4 md:top-16 md:right-16 w-3 h-3 rounded-full bg-orange-400 animate-pulse opacity-60" />
          <div className="absolute bottom-20 left-8 w-2 h-2 rounded-full bg-blue-500 animate-pulse opacity-40" />
          <div className="absolute top-1/2 right-8 w-4 h-4 rounded-full bg-orange-300 opacity-30" />
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs md:text-sm font-bold mb-6 md:mb-8" style={{ background: "rgba(26,66,138,0.08)", borderColor: "rgba(26,66,138,0.2)", color: "#1A428A" }}>
                  <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: "#1A428A" }} />
                  Folks-Force Platform is Live Now
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-3 leading-[1.1]">
                  Aap Nazro Tak
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-5" style={{ color: "#F58220" }}>
                  Utilize Yourself
                </h2>
                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-3">
                  Discover your identity. Unlock your potential.
                </p>
                <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-8 md:mb-10">
                  YouTillEyes is a people-powered ecosystem that helps individuals identify their true abilities, purpose, and place in society. We connect talent with the right opportunities, projects, and missions.
                </p>

                {/* Floating glass stat cards — mobile prominent */}
                <div className="grid grid-cols-3 gap-2 mb-8 md:hidden">
                  {[
                    { num: "5000+", label: "Talents" },
                    { num: "100+", label: "Projects" },
                    { num: "3", label: "User Roles" },
                  ].map((s, i) => (
                    <div key={i} className="rounded-2xl p-3 text-center border" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", borderColor: "rgba(26,66,138,0.12)", boxShadow: "0 4px 20px rgba(26,66,138,0.08)" }}>
                      <div className="text-xl font-black" style={{ color: i % 2 === 0 ? "#1A428A" : "#F58220" }}>{s.num}</div>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Link href="/register" className="flex-1 sm:flex-none">
                    <Button size="lg" className="w-full sm:w-auto h-12 md:h-14 px-7 md:px-8 text-sm md:text-base font-bold text-white shadow-lg" style={{ background: "#1A428A", boxShadow: "0 8px 30px rgba(26,66,138,0.3)" }}>
                      Join as Talent
                    </Button>
                  </Link>
                  <Link href="/register" className="flex-1 sm:flex-none">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 md:h-14 px-7 md:px-8 text-sm md:text-base font-semibold border-2 hover:text-primary" style={{ borderColor: "rgba(26,66,138,0.3)" }}>
                      Post a Project
                    </Button>
                  </Link>
                </div>
                <div className="mt-6 md:mt-10 flex flex-wrap gap-4 text-xs md:text-sm text-slate-500 font-medium">
                  {["Identify Yourself", "Showcase Skills", "Grow and Earn"].map((t, i) => (
                    <span key={i} className="flex items-center gap-2">
                      <span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">✓</span>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Illustration — visible on mobile too */}
              <div className="flex items-center justify-center mt-4 md:mt-0 relative">
                <HeroSVG />
                {/* Floating glass cards — desktop */}
                <div className="hidden md:block absolute top-4 left-4 rounded-2xl px-4 py-3 border" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", borderColor: "rgba(26,66,138,0.12)", boxShadow: "0 8px 32px rgba(26,66,138,0.12)" }}>
                  <div className="text-2xl font-black" style={{ color: "#1A428A" }}>5000+</div>
                  <div className="text-xs text-slate-500 font-medium">Registered Talents</div>
                </div>
                <div className="hidden md:block absolute bottom-8 right-4 rounded-2xl px-4 py-3 border" style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", borderColor: "rgba(245,130,32,0.15)", boxShadow: "0 8px 32px rgba(245,130,32,0.12)" }}>
                  <div className="text-2xl font-black" style={{ color: "#F58220" }}>100%</div>
                  <div className="text-xs text-slate-500 font-medium">People Powered</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scrolling Marquee */}
        <div className="overflow-hidden py-3 border-y border-slate-100" style={{ background: "#1A428A" }}>
          <div className="flex gap-0 whitespace-nowrap" style={{ animation: "marqueeScroll 28s linear infinite" }}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3 px-6 text-sm font-bold text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
        <style>{`@keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>

        {/* Stats */}
        <section className="py-10 md:py-14 px-4 md:px-6 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              {[
                { num: "6", label: "Identify Steps", color: "#1A428A" },
                { num: "100%", label: "People Powered", color: "#F58220" },
                { num: "3", label: "User Roles", color: "#1A428A" },
                { num: "1", label: "Mission: You", color: "#F58220" },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl p-5 md:p-6 border border-slate-100 hover:shadow-md transition-shadow" style={{ background: "linear-gradient(135deg, #fafbff, #fff)" }}>
                  <div className="text-3xl md:text-5xl font-black mb-1" style={{ color: s.color }}>{s.num}</div>
                  <div className="text-xs md:text-sm text-slate-500 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-16 md:py-20 px-4 md:px-6" style={{ background: "linear-gradient(135deg, #1A428A 0%, #0d2a5e 100%)" }}>
          <div className="container mx-auto max-w-4xl text-center text-white">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-5" style={{ color: "#F58220" }}>The Philosophy Behind YouTillEyes</p>
            <blockquote className="text-xl md:text-4xl font-bold italic leading-relaxed mb-6 md:mb-8">
              "The strength of society begins with the identification of individual potential."
            </blockquote>
            <p className="text-blue-100 text-sm md:text-lg max-w-3xl mx-auto leading-relaxed">
              YouTillEyes represents a modern framework of origin, existence, and human utilization. Here individuals are recognized not only for who they are, but for what they can create, contribute, and achieve together. Through the Folks-Force Platform, we build powerful networks that help identify the right individuals for the right opportunities.
            </p>
          </div>
        </section>

        {/* 6-Step Journey */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10 md:mb-16">
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>It's All About You</p>
              <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 md:mb-5">The Identify Yourself Journey</h2>
              <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto">A structured path from self-discovery to real-world opportunity. Six steps that transform who you are into what you can achieve.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { n: "01", title: "Identify Yourself", tag: "Who Are You?", emoji: "👁️", desc: "Understand your personality, strengths, mindset, and purpose. Self-awareness is the foundation of everything great you will build.", color: "#1A428A" },
                { n: "02", title: "Identify Your Objectives", tag: "What Do You Want?", emoji: "🎯", desc: "Define your goals, ambitions, and future direction. A person with clear objectives moves forward with unstoppable momentum.", color: "#F58220" },
                { n: "03", title: "Identify Your Skills", tag: "What Can You Do?", emoji: "⭐", desc: "Showcase your talents, expertise, and practical abilities. Every skill you own has the power to change someone else's world.", color: "#1A428A" },
                { n: "04", title: "Identify Your Eligibility", tag: "Where Do You Fit?", emoji: "✅", desc: "Discover where your qualifications and capabilities fit best. The right fit creates extraordinary results for both you and those around you.", color: "#F58220" },
                { n: "05", title: "Identify Your Tasks", tag: "What Work Suits You?", emoji: "⚡", desc: "Connect with meaningful work, projects, and responsibilities. Purposeful work is not just a job. It is a contribution to something greater.", color: "#1A428A" },
                { n: "06", title: "Identify Your Platform", tag: "Where Will You Grow?", emoji: "🌐", desc: "Find the right environment, people, and opportunities to grow. The right platform amplifies your potential beyond what you imagined.", color: "#F58220" },
              ].map((item, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                  <div className="h-1.5" style={{ background: item.color }} />
                  <div className="p-5 md:p-7">
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
                      <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl text-white font-black text-base md:text-lg flex items-center justify-center shadow-md shrink-0" style={{ background: item.color }}>
                        {item.n}
                      </div>
                      <div className="text-3xl md:text-4xl">{item.emoji}</div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.tag}</p>
                        <h4 className="font-bold text-slate-900 text-xs md:text-sm leading-tight">{item.title}</h4>
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Can Join */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10 md:mb-16">
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>Time to Explore</p>
              <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 md:mb-5">Who Can Join YouTillEyes?</h2>
              <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto">Whether you are a student with extraordinary hobbies, an artist waiting to be discovered, or a professional with skills to share, your place is here.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { emoji: "🎓", title: "Students and Learners", desc: "Turn your passion into earnings and build your future today.", bg: "#EEF2FF", border: "#C7D2FE" },
                { emoji: "🏠", title: "Property Owners", desc: "Turn idle spaces into earnings and fulfill your needs.", bg: "#FFF7ED", border: "#FED7AA" },
                { emoji: "🎨", title: "Artists and Creators", desc: "Get the recognition your work deserves and showcase your talent.", bg: "#EEF2FF", border: "#C7D2FE" },
                { emoji: "⭐", title: "Multi-Talented Professionals", desc: "Let the world see the real star you are beyond your normal job.", bg: "#FFF7ED", border: "#FED7AA" },
                { emoji: "💡", title: "Buyers and Explorers", desc: "Discover everything you need from people who can deliver it.", bg: "#EEF2FF", border: "#C7D2FE" },
                { emoji: "🤝", title: "Helpful Individuals", desc: "Get recognized, get paid, and receive gratitude for your service.", bg: "#FFF7ED", border: "#FED7AA" },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl p-5 md:p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border" style={{ background: item.bg, borderColor: item.border }}>
                  <div className="text-4xl md:text-5xl mb-4 md:mb-5">{item.emoji}</div>
                  <h4 className="font-bold text-slate-900 text-base md:text-lg mb-2 md:mb-3">{item.title}</h4>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Folks-Force */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#F58220" }}>Folks-Force Platform</p>
                <h2 className="text-2xl md:text-5xl font-black mb-5 md:mb-6 leading-tight">A Force of Capability, Collaboration and Creation</h2>
                <p className="text-blue-200 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                  The Folks-Force Platform is designed to build a powerful network that helps identify the right individuals for the right opportunities, projects, and missions. This is more than a platform. It is a movement.
                </p>
                <p className="text-white font-bold text-sm md:text-lg italic mb-8 md:mb-10" style={{ borderLeft: "4px solid #F58220", paddingLeft: "1rem" }}>
                  "Because when the right people connect, everything becomes possible."
                </p>
                <Link href="/register">
                  <Button size="lg" className="h-12 md:h-14 px-6 md:px-8 font-bold text-sm md:text-base text-white shadow-xl" style={{ background: "#F58220" }}>
                    Join the Platform
                  </Button>
                </Link>
              </div>
              <div className="space-y-3 md:space-y-4">
                {[
                  { n: "01", text: "Identify capable individuals across all fields and backgrounds" },
                  { n: "02", text: "Build strong collaborative networks between people and organizations" },
                  { n: "03", text: "Match people with suitable opportunities, projects, and missions" },
                  { n: "04", text: "Empower communities through talent utilization and recognition" },
                  { n: "05", text: "Transform ideas into real-world execution through meaningful collaboration" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 rounded-xl p-4 md:p-5 border border-white/10 hover:bg-white/10 transition-colors" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <span className="text-xs font-black px-2.5 py-1 rounded-lg shrink-0" style={{ background: "#F58220", color: "white" }}>{item.n}</span>
                    <p className="text-blue-100 text-xs md:text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10 md:mb-16">
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>User-Friendly Portal</p>
              <h2 className="text-2xl md:text-5xl font-black text-slate-900 mb-4 md:mb-5">Platform Features</h2>
              <p className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto">Smart categorization and personalized selection, so you always find exactly where you belong.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="space-y-2 md:space-y-4">
                {[
                  { icon: "🎯", title: "Choose Your Interests", desc: "Personalize your entire experience by telling us what matters most to you." },
                  { icon: "🔀", title: "Select Your User Stream", desc: "Whether you are Talent, Client, or Explorer, your path is clearly defined." },
                  { icon: "📂", title: "Explore Relevant Categories", desc: "Browse curated categories that perfectly match your skills and objectives." },
                  { icon: "⚙️", title: "Set Default Preferences", desc: "Configure your settings once and let the platform work for you automatically." },
                  { icon: "🌐", title: "Connect with Community", desc: "Build real connections with like-minded people, collaborators, and supporters." },
                  { icon: "💼", title: "Discover Opportunities", desc: "Find the right work, projects, and missions that are meant specifically for you." },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 md:p-5 rounded-2xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-100">
                    <div className="text-2xl md:text-3xl w-10 md:w-12 shrink-0 text-center">{f.icon}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-0.5 text-sm md:text-base">{f.title}</h4>
                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden md:block">
                <NetworkIllustration />
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { label: "For Talent", sub: "Artists, Experts and More", color: "#1A428A" },
                    { label: "For Clients", sub: "Brands and Businesses", color: "#F58220" },
                    { label: "Grow and Earn", sub: "Collabs and Gigs", color: "#1A428A" },
                    { label: "Smart Matching", sub: "Right People, Right Jobs", color: "#F58220" },
                  ].map((c, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center hover:shadow-md transition-shadow">
                      <p className="font-bold text-slate-900 text-xs mb-0.5">{c.label}</p>
                      <p className="text-slate-400 text-xs">{c.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Mobile 4 cards */}
              <div className="md:hidden grid grid-cols-2 gap-3">
                {[
                  { label: "For Talent", sub: "Artists and Experts", color: "#1A428A" },
                  { label: "For Clients", sub: "Brands and Businesses", color: "#F58220" },
                  { label: "Grow and Earn", sub: "Collabs and Gigs", color: "#1A428A" },
                  { label: "Smart Matching", sub: "Right People, Right Jobs", color: "#F58220" },
                ].map((c, i) => (
                  <div key={i} className="rounded-2xl p-4 text-center border" style={{ background: c.color + "10", borderColor: c.color + "25" }}>
                    <p className="font-black text-xs mb-0.5" style={{ color: c.color }}>{c.label}</p>
                    <p className="text-slate-500 text-xs">{c.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 px-4 md:px-6 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F58220 0%, #e06b0a 100%)" }}>
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <svg viewBox="0 0 800 300" className="w-full h-full">
              <circle cx="100" cy="150" r="120" fill="white" />
              <circle cx="700" cy="80" r="90" fill="white" />
              <circle cx="600" cy="280" r="70" fill="white" />
            </svg>
          </div>
          <div className="container mx-auto max-w-3xl text-white relative z-10">
            <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6">Be Part of the Movement</h2>
            <p className="text-white/85 text-base md:text-xl mb-8 md:mb-10 leading-relaxed">Join YouTillEyes and start your journey of self-identification. Aap Nazro Tak, until you are truly seen.</p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link href="/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-12 md:h-14 px-8 text-sm md:text-base font-black bg-white text-slate-900 hover:bg-slate-100 shadow-xl">
                  Join YouTillEyes Free
                </Button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full h-12 md:h-14 px-8 text-sm md:text-base font-semibold border-white text-white hover:bg-white/10">
                  Explore Our Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 pt-12 md:pt-16 pb-8 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
              <div className="col-span-2 sm:col-span-1">
                <img src={footerLogoImg} alt="YouTillEyes" className="h-10 md:h-12 w-auto mb-4 md:mb-5" />
                <p className="text-xs md:text-sm leading-relaxed text-slate-400 mb-4 md:mb-6">Aap Nazro Tak. Utilize Yourself. A people-powered ecosystem connecting talent with opportunity.</p>
                <div className="space-y-2 mb-4 md:mb-6">
                  <div className="flex items-center gap-2 text-xs md:text-sm text-slate-400"><MapPin className="h-3 w-3 shrink-0" style={{ color: "#F58220" }} />Uttar Pradesh, India</div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-slate-400"><Phone className="h-3 w-3 shrink-0" style={{ color: "#F58220" }} />+91 7084424242</div>
                  <div className="flex items-center gap-2 text-xs md:text-sm text-slate-400"><Mail className="h-3 w-3 shrink-0" style={{ color: "#F58220" }} />info@youtilleyes.com</div>
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

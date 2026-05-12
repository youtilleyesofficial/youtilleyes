import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401-Photoroom_1774903197281.png";
import footerLogoImg from "@assets/20260331_030902_1774906812939.png";
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function VisionGraphic() {
  return (
    <svg viewBox="0 0 420 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="420" height="300" rx="20" fill="#1A428A" fillOpacity="0.04" />
      <path d="M210 40 L380 260 L40 260 Z" fill="#1A428A" fillOpacity="0.05" stroke="#1A428A" strokeWidth="1.5" strokeOpacity="0.15" />
      <circle cx="210" cy="40" r="18" fill="#F58220" fillOpacity="0.9" />
      <circle cx="210" cy="40" r="10" fill="#F58220" />
      <circle cx="380" cy="260" r="14" fill="#1A428A" fillOpacity="0.6" />
      <circle cx="40" cy="260" r="14" fill="#1A428A" fillOpacity="0.6" />
      {[
        { x: 210, y: 40, label: "Vision" },
        { x: 145, cy: 110, label: "Growth" },
        { x: 275, cy: 110, label: "Skills" },
      ].map((_, i) => null)}
      <circle cx="210" cy="130" r="35" fill="#1A428A" fillOpacity="0.08" stroke="#1A428A" strokeWidth="1" strokeOpacity="0.2" />
      <circle cx="210" cy="130" r="20" fill="#1A428A" fillOpacity="0.12" />
      <circle cx="210" cy="130" r="10" fill="#1A428A" fillOpacity="0.5" />
      <text x="170" y="24" fontSize="11" fill="#F58220" fontWeight="800" opacity="0.9">Vision</text>
      <text x="15" y="280" fontSize="10" fill="#1A428A" fontWeight="700" opacity="0.6">Execution</text>
      <text x="348" y="280" fontSize="10" fill="#1A428A" fontWeight="700" opacity="0.6">Results</text>
      <line x1="210" y1="58" x2="210" y2="95" stroke="#F58220" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 3" />
      <rect x="60" y="190" width="120" height="32" rx="8" fill="#1A428A" fillOpacity="0.08" />
      <rect x="240" y="190" width="120" height="32" rx="8" fill="#F58220" fillOpacity="0.1" />
      <text x="85" y="210" fontSize="10" fill="#1A428A" fontWeight="700" opacity="0.7">Identify People</text>
      <text x="263" y="210" fontSize="10" fill="#F58220" fontWeight="700" opacity="0.9">Connect Force</text>
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Vision", href: "/vision" },
  { label: "Contact Us", href: "/contact" },
];

const steps = [
  { n: "01", emoji: "👁️", title: "Identify Yourself", tag: "Who Are You?", desc: "We envision a world where every person deeply understands their own personality, strengths, mindset, and purpose. Self-awareness is the first step to a meaningful life — and we believe everyone deserves the space to discover themselves fully.", color: "#1A428A" },
  { n: "02", emoji: "🎯", title: "Identify Your Objectives", tag: "What Do You Want?", desc: "A future where individuals are empowered to clearly define their goals, ambitions, and direction — and have the support structures, communities, and tools to pursue them with confidence and clarity.", color: "#F58220" },
  { n: "03", emoji: "⭐", title: "Identify Your Skills", tag: "What Can You Do?", desc: "We envision a platform where talent — from art to technology, from trades to leadership — is recognized, showcased, and valued equally. Every skill matters, and every skill has a market.", color: "#1A428A" },
  { n: "04", emoji: "✅", title: "Identify Your Eligibility", tag: "Where Do You Fit?", desc: "A world where qualifications and capabilities are matched intelligently to the right roles and opportunities — creating perfect fits that benefit both the individual and the organization they serve.", color: "#F58220" },
  { n: "05", emoji: "⚡", title: "Identify Your Tasks", tag: "What Work Suits You?", desc: "We see a future where meaningful work finds the right person — every project, mission, and responsibility connected to the most capable, passionate individual perfectly suited for that role.", color: "#1A428A" },
  { n: "06", emoji: "🌐", title: "Identify Your Platform", tag: "Where Will You Grow?", desc: "Our ultimate vision: every individual finds their perfect environment — the right community, network, and ecosystem to grow, collaborate, thrive, and leave a lasting impact on the world around them.", color: "#F58220" },
];

export default function Vision() {
  const { user } = useAuth();
  const dashboardHref =
    user?.role === "ADMIN" ? "/admin/dashboard" :
    user?.role === "CLIENT" ? "/client/dashboard" : "/user/dashboard";

  return (
    <div className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/"><img src={logoImg} alt="YouTillEyes" className="h-10 w-auto cursor-pointer" /></Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href} className={`transition-colors ${l.href === "/vision" ? "text-primary font-bold" : "text-slate-500 hover:text-primary"}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <Link href={dashboardHref}><Button className="bg-primary hover:bg-primary/90 text-white font-semibold">Go to Dashboard</Button></Link>
            ) : (
              <>
                <Link href="/login"><Button variant="ghost" className="hidden sm:flex text-slate-600">Log in</Button></Link>
                <Link href="/register"><Button className="bg-secondary hover:bg-secondary/90 text-white font-semibold">Get Started</Button></Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 md:py-28 px-6" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #fff8f0 100%)" }}>
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm text-primary font-semibold mb-8">
                  👁️ Our Vision
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">A World Where Every Individual Is Seen</h1>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We envision a future where no talent goes unnoticed, no potential remains unused, and every person finds their right place in the world. Aap Nazro Tak — until you are truly seen.
                </p>
              </div>
              <div className="hidden md:block"><VisionGraphic /></div>
            </div>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #1A428A 0%, #0d2a5e 100%)" }}>
          <div className="container mx-auto max-w-4xl text-center text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] mb-6" style={{ color: "#F58220" }}>The Big Picture</p>
            <h2 className="text-3xl md:text-4xl font-black mb-6">Aap Nazro Tak — Until You Are Seen</h2>
            <p className="text-blue-100 text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
              Our vision is to create a world where every individual's identity, skills, and purpose are identified, recognized, and put to meaningful use — where talent meets opportunity at every level of society.
            </p>
            <blockquote className="text-2xl font-black italic text-left max-w-2xl mx-auto py-6 px-8 rounded-2xl" style={{ background: "rgba(245, 130, 32, 0.15)", borderLeft: "5px solid #F58220" }}>
              "The strength of society begins with the identification of individual potential."
            </blockquote>
          </div>
        </section>

        {/* 6 Steps Vision */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>The Identify Yourself Framework</p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-5">Our Vision for Every Individual</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">We see a future where every person walks through these six stages of self-identification and finds their rightful place in the world.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                  <div className="h-1.5" style={{ background: step.color }} />
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-14 h-14 rounded-2xl text-white font-black text-xl flex items-center justify-center shadow-md shrink-0" style={{ background: step.color }}>
                        {step.n}
                      </div>
                      <div className="text-4xl">{step.emoji}</div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{step.tag}</p>
                        <h3 className="font-black text-slate-900 text-base leading-tight">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Utilize Point */}
        <section className="py-24 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>Utilize Point</p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-5">What We Want to Create</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Our vision is built on a simple promise — every individual will be exposed, empowered, connected, and enabled to live their fullest life.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { emoji: "👁️", title: "Expose", color: "#1A428A", bg: "bg-blue-50 border-blue-100", desc: "Be exposed around the society — make yourself visible everywhere at once. Get your needs fulfilled from anywhere by someone who can carry and take care of your requirements wherever you are. True visibility means freedom." },
                { emoji: "💪", title: "Empower", color: "#F58220", bg: "bg-orange-50 border-orange-100", desc: "Every talent, every skill, every individual ability deserves a platform to grow. We envision a world where people are empowered to utilize themselves at every level — personally, professionally, and socially — without limitation." },
                { emoji: "🌐", title: "Connect", color: "#1A428A", bg: "bg-blue-50 border-blue-100", desc: "Building bridges between people who have skills and people who need them. From students to businesses, from artists to organizations — the right connection changes everything and opens doors that were once invisible." },
                { emoji: "💡", title: "Enable", color: "#F58220", bg: "bg-orange-50 border-orange-100", desc: "Creating the conditions where ideas become actions, where potential becomes achievement, and where individuals become the leaders of their own success story — supported by a community that believes in them." },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} border rounded-3xl p-10 hover:shadow-lg transition-all duration-300`}>
                  <div className="text-6xl mb-5">{item.emoji}</div>
                  <h3 className="text-2xl font-black mb-4" style={{ color: item.color }}>{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Folks-Force Vision */}
        <section className="py-24 px-6 bg-slate-900 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#F58220" }}>Folks-Force Platform</p>
            <h2 className="text-3xl md:text-4xl font-black mb-8">When the Right People Connect, Everything Becomes Possible</h2>
            <p className="text-blue-100 text-xl leading-relaxed mb-14 max-w-3xl mx-auto">
              Through the Folks-Force Platform, we are building a powerful global network — a collaborative force that identifies the right individuals for the right opportunities, missions, and projects. One connection at a time, we are changing lives.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { emoji: "👁️", label: "Identify", desc: "Capable individuals across all fields" },
                { emoji: "🤝", label: "Connect", desc: "Build strong collaborative networks" },
                { emoji: "⚡", label: "Create", desc: "Transform ideas into real outcomes" },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                  <div className="text-5xl mb-4">{item.emoji}</div>
                  <h4 className="font-black text-white text-xl mb-2">{item.label}</h4>
                  <p className="text-blue-200 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center" style={{ background: "linear-gradient(135deg, #F58220 0%, #e06b0a 100%)" }}>
          <div className="container mx-auto max-w-3xl text-white">
            <h2 className="text-3xl md:text-4xl font-black mb-6">Help Us Build This Future</h2>
            <p className="text-white/85 text-xl mb-10 leading-relaxed">Join the Folks-Force Platform. Be seen. Utilize yourself. Together, we will create a world where every individual's potential is recognized and realized.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register"><Button size="lg" className="h-14 px-8 text-base font-bold bg-white text-slate-900 hover:bg-slate-100">Join YouTillEyes</Button></Link>
              <Link href="/about"><Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold border-white text-white hover:bg-white/10">Read About Us</Button></Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              <div>
                <img src={footerLogoImg} alt="YouTillEyes" className="h-12 w-auto mb-5" />
                <p className="text-sm leading-relaxed text-slate-400 mb-6">Aap Nazro Tak — Utilize Yourself. A people-powered ecosystem connecting talent with opportunity.</p>
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2.5 text-sm text-slate-400"><MapPin className="h-4 w-4 shrink-0" style={{ color: "#F58220" }} />Uttar Pradesh, India</div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-400"><Phone className="h-4 w-4 shrink-0" style={{ color: "#F58220" }} />+91 7084424242</div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-400"><Mail className="h-4 w-4 shrink-0" style={{ color: "#F58220" }} />info@youtilleyes.com</div>
                </div>
                <div className="flex gap-2.5">
                  {[Linkedin, Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="h-9 w-9 rounded-full bg-slate-700 hover:bg-orange-500 flex items-center justify-center transition-colors"><Icon className="h-4 w-4" /></a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Our Pages</h4>
                <ul className="space-y-3 text-sm">
                  {navLinks.map(link => (
                    <li key={link.label}><Link href={link.href} className="text-slate-400 hover:text-orange-400 transition-colors">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-3 text-sm">
                  {[{ label: "Browse Projects", href: "/user/projects" }, { label: "Post a Project", href: "/client/projects/new" }, { label: "My Bids", href: "/user/bids" }, { label: "My Wallet", href: "/user/wallet" }].map(link => (
                    <li key={link.label}><Link href={link.href} className="text-slate-400 hover:text-orange-400 transition-colors">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Legal</h4>
                <ul className="space-y-3 text-sm">
                  {["Terms and Conditions", "Privacy Policy", "Cookie Policy", "Refund Policy", "Disclaimer"].map(label => (
                    <li key={label}><a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">{label}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <p>&copy; {new Date().getFullYear()} YouTillEyes. All rights reserved.</p>
              <p>Made with love by Niskutech &nbsp;|&nbsp; Currency: ₹ INR</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

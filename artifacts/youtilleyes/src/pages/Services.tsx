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

function ServicesHeroGraphic() {
  return (
    <svg viewBox="0 0 480 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="480" height="320" rx="24" fill="#1A428A" fillOpacity="0.04" />
      {[
        { cx: 100, cy: 80, label: "Hire", color: "#1A428A" },
        { cx: 300, cy: 60, label: "Freebies", color: "#F58220" },
        { cx: 420, cy: 160, label: "Social", color: "#1A428A" },
        { cx: 340, cy: 270, label: "Videos", color: "#F58220" },
        { cx: 120, cy: 260, label: "Blogs", color: "#1A428A" },
      ].map((node, i) => (
        <g key={i}>
          <line x1={node.cx} y1={node.cy} x2="240" y2="160" stroke={node.color} strokeWidth="1.2" strokeOpacity="0.2" strokeDasharray="5 4" />
          <circle cx={node.cx} cy={node.cy} r="30" fill={node.color} fillOpacity="0.07" />
          <circle cx={node.cx} cy={node.cy} r="18" fill={node.color} fillOpacity="0.14" />
          <circle cx={node.cx} cy={node.cy} r="9" fill={node.color} fillOpacity="0.8" />
          <text x={node.cx - 14} y={node.cy + 42} fontSize="10" fill={node.color} fontWeight="700" opacity="0.8">{node.label}</text>
        </g>
      ))}
      <circle cx="240" cy="160" r="48" fill="#1A428A" fillOpacity="0.06" />
      <circle cx="240" cy="160" r="30" fill="#F58220" fillOpacity="0.12" />
      <circle cx="240" cy="160" r="16" fill="#F58220" fillOpacity="0.85" />
      <text x="215" y="200" fontSize="11" fill="#1A428A" fontWeight="800" opacity="0.6">YouTillEyes</text>
    </svg>
  );
}

const services = [
  {
    id: "01",
    slug: "you-hire",
    title: "You Hire",
    subtitle: "Consulting and Hiring",
    emoji: "💼",
    color: "#1A428A",
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-100",
    tagColor: "bg-blue-100 text-blue-700",
    desc: "Connecting businesses and individuals with the right talent through organized consulting and hiring solutions. Whether you need a professional, a skilled worker, or an extraordinary performer, YouTillEyes brings the right person to your door.",
    points: [
      "Unorganized manpower and labour support for businesses of all sizes",
      "Local hiring assistance for startups, shops, and growing enterprises",
      "Auditions, talent hunts, and event participation opportunities",
      "Collaboration with local entities to publish event schedules and opportunities",
    ],
  },
  {
    id: "02",
    slug: "freebies",
    title: "Freebies",
    subtitle: "Rewards, Coupons and Product Sampling",
    emoji: "🎁",
    color: "#F58220",
    bg: "from-orange-50 to-yellow-50",
    border: "border-orange-100",
    tagColor: "bg-orange-100 text-orange-700",
    desc: "Helping users discover and experience new brands, products, food, and services through exclusive offers and reward programs. Get access to the best deals and samples from brands that want to reach you directly.",
    points: [
      "Free samples and promotional giveaways from new and established brands",
      "Coupons for local and online shopping platforms",
      "Product launch campaigns and city-based exclusive offers",
      "Hyperlocal rewards and discount opportunities in your area",
      "Home delivery or on-spot redemption options for selected campaigns",
    ],
  },
  {
    id: "03",
    slug: "yousocial",
    title: "Yousocial",
    subtitle: "A Real Life Star",
    emoji: "⭐",
    color: "#1A428A",
    bg: "from-blue-50 to-sky-50",
    border: "border-blue-100",
    tagColor: "bg-blue-100 text-blue-700",
    desc: "A social recognition platform dedicated to appreciating people who create a positive impact in society. Every ordinary person who does extraordinary things deserves to be seen, celebrated, and remembered.",
    points: [
      "Weekly recognition for social workers, volunteers, and inspiring individuals",
      "Showcase extraordinary hobbies, humanitarian efforts, and community work",
      "Testimonials and featured stories to encourage positive social influence",
      "Promoting Being Human values through real-life achievements and stories",
    ],
  },
  {
    id: "04",
    slug: "youdeo",
    title: "Youdeo",
    subtitle: "Watch, Like and Subscribe",
    emoji: "🎬",
    color: "#F58220",
    bg: "from-orange-50 to-red-50",
    border: "border-orange-100",
    tagColor: "bg-orange-100 text-orange-700",
    desc: "A creator-focused entertainment and marketing space for digital content and community engagement. Whether you are a YouTuber, a local creator, or a brand, Youdeo gives your content the audience it deserves.",
    points: [
      "Platform for YouTubers, creators, vloggers, and short video makers",
      "Concept marketing through personal and promotional video content",
      "Showcase products, services, and creative storytelling to real audiences",
      "Community interaction through watching, liking, and subscribing",
    ],
  },
  {
    id: "05",
    slug: "youlogs",
    title: "Youlogs",
    subtitle: "Blogs and Local Trends",
    emoji: "📝",
    color: "#1A428A",
    bg: "from-slate-50 to-blue-50",
    border: "border-slate-100",
    tagColor: "bg-slate-100 text-slate-700",
    desc: "A blogging and updates section focused on local engagement and trending activities. Stay informed, share your voice, and connect with your community through content that actually matters to your city and surroundings.",
    points: [
      "Blogs on current trends, social topics, and community issues",
      "Daily local updates related to businesses, products, and services",
      "Community discussions and awareness-driven content creation",
      "Platform for connecting people through shared interests and local activities",
    ],
  },
];

const welfarePrograms = [
  {
    emoji: "👩",
    title: "Women Empowerment",
    color: "#F58220",
    bg: "from-orange-50 to-pink-50",
    border: "border-orange-100",
    desc: "Empowering women by identifying their skills and helping them showcase their products and services to society. Every woman with a talent or a dream deserves a platform that sees her and helps her grow.",
    points: [
      "Skill identification and active promotion for women creators",
      "Business and self-employment opportunities through the platform",
      "Visibility for local women entrepreneurs, artists, and service providers",
    ],
  },
  {
    emoji: "🌟",
    title: "Youth and Culture",
    color: "#1A428A",
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-100",
    desc: "Encouraging talent, creativity, and cultural participation among youth. Young people are the builders of tomorrow and they deserve a stage to perform, learn, compete, and collaborate today.",
    points: [
      "Talent discovery and hobby-based engagement for young individuals",
      "Partnerships with academies, coaching centers, and organizations",
      "Online and offline competitions, workshops, and cultural events",
      "Creative and cultural development programs across disciplines",
    ],
  },
  {
    emoji: "🤍",
    title: "Old Age Help",
    color: "#F58220",
    bg: "from-orange-50 to-yellow-50",
    border: "border-orange-100",
    desc: "Supporting senior citizens with opportunities, engagement, and empowerment initiatives. Experience and wisdom should never go to waste. Our platform ensures elderly individuals stay active, valued, and connected.",
    points: [
      "Programs for active participation and social inclusion",
      "Opportunities to reconnect with skills, hobbies, and community life",
      "Assistance and support-driven activities for elderly well-being",
    ],
  },
  {
    emoji: "🏆",
    title: "Volunteer Award",
    color: "#1A428A",
    bg: "from-slate-50 to-blue-50",
    border: "border-slate-100",
    desc: "Recognizing individuals who contribute positively to humanity and society. Being kind is a superpower and those who use it to help others deserve to be seen, appreciated, and celebrated by all.",
    points: [
      "Appreciation for social and humanitarian work done quietly and sincerely",
      "Community recognition programs for inspiring individuals",
      "Encouraging common people to become social role models",
      "Promoting kindness, responsibility, and public contribution in society",
    ],
  },
];

export default function Services() {
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
          <Link href="/"><img src={logoImg} alt="YouTillEyes" className="h-9 md:h-10 w-auto cursor-pointer" /></Link>
          <nav className="hidden md:flex gap-7 text-sm font-medium">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href} className={`transition-colors ${l.href === "/services" ? "text-primary font-bold" : "text-slate-500 hover:text-primary"}`}>{l.label}</Link>
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
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${l.href === "/services" ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50"}`}>
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
        <section className="relative overflow-hidden py-20 md:py-28 px-6" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #fff8f0 100%)" }}>
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm text-primary font-semibold mb-8">
                  🚀 Our Services
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
                  Everything You Need to
                </h1>
                <h2 className="text-3xl font-extrabold mb-6" style={{ color: "#F58220" }}>Identify, Grow and Thrive</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  YouTillEyes offers a complete ecosystem of services, from hiring and freebies to social recognition, video content, and community blogging, all designed to help you utilize yourself to the fullest.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["You Hire", "Freebies", "Yousocial", "Youdeo", "Youlogs"].map((s, i) => (
                    <a key={i} href={`#${s.toLowerCase().replace(" ", "-")}`} className="px-4 py-2 rounded-full text-sm font-bold border-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-200">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden md:block"><ServicesHeroGraphic /></div>
            </div>
          </div>
        </section>

        {/* Services Count Bar */}
        <section className="py-12 px-6 border-y border-slate-100 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {services.map((s) => (
                <a key={s.id} href={`#${s.slug}`} className="group cursor-pointer">
                  <div className="text-4xl mb-2">{s.emoji}</div>
                  <div className="font-black text-slate-900 text-sm group-hover:text-primary transition-colors">{s.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.subtitle.split(" ")[0]}</div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="py-8 px-6 bg-slate-50">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16 pt-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>What We Offer</p>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-5">Our Core Services</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Five powerful platforms working together inside the YouTillEyes ecosystem, each designed to serve a specific need while contributing to the bigger mission.</p>
            </div>
            <div className="space-y-10">
              {services.map((svc, i) => (
                <div key={svc.id} id={svc.slug} className={`bg-gradient-to-br ${svc.bg} border ${svc.border} rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 scroll-mt-24`}>
                  <div className="p-8 md:p-10">
                    <div className="flex flex-wrap items-start gap-5 mb-6">
                      <div className="text-6xl">{svc.emoji}</div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-xs font-black px-3 py-1 rounded-full" style={{ background: svc.color + "18", color: svc.color }}>Service {svc.id}</span>
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/80 text-slate-600">{svc.subtitle}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900">{svc.title}</h3>
                      </div>
                    </div>
                    <p className="text-slate-700 text-lg leading-relaxed mb-8">{svc.desc}</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {svc.points.map((point, j) => (
                        <div key={j} className="flex items-start gap-3 bg-white/70 rounded-xl p-4">
                          <span className="mt-0.5 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0" style={{ background: svc.color }}>
                            {j + 1}
                          </span>
                          <p className="text-slate-700 text-sm leading-relaxed">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-1.5" style={{ background: svc.color }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #1A428A 0%, #0d2a5e 100%)" }}>
          <div className="container mx-auto max-w-4xl text-center text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] mb-5" style={{ color: "#F58220" }}>Beyond Business</p>
            <h2 className="text-3xl md:text-5xl font-black mb-6">Social Welfare Programs</h2>
            <p className="text-blue-100 text-xl leading-relaxed max-w-3xl mx-auto">
              YouTillEyes is not just a business platform. We are a people's ecosystem built on the belief that every section of society, women, youth, elders, and volunteers, deserves recognition, opportunity, and support.
            </p>
          </div>
        </section>

        {/* Welfare Programs */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              {welfarePrograms.map((program, i) => (
                <div key={i} className={`bg-gradient-to-br ${program.bg} border ${program.border} rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="text-5xl">{program.emoji}</div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900">{program.title}</h3>
                        <div className="h-1 w-12 rounded-full mt-2" style={{ background: program.color }} />
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed mb-6">{program.desc}</p>
                    <div className="space-y-3">
                      {program.points.map((point, j) => (
                        <div key={j} className="flex items-start gap-3 bg-white/60 rounded-xl p-3.5">
                          <span className="mt-0.5 h-5 w-5 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0" style={{ background: program.color }}>
                            {j + 1}
                          </span>
                          <p className="text-slate-600 text-sm leading-relaxed">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-1.5" style={{ background: program.color }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Services Summary */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Everything Under One Roof</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">From discovering your identity to building your community. YouTillEyes covers every step of your journey.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { emoji: "💼", label: "You Hire", desc: "Hire talent and find work through organized consulting" },
                { emoji: "🎁", label: "Freebies", desc: "Discover rewards, coupons, and free product samples" },
                { emoji: "⭐", label: "Yousocial", desc: "Get recognized as a real-life star in your community" },
                { emoji: "🎬", label: "Youdeo", desc: "Publish, watch, and grow through video content" },
                { emoji: "📝", label: "Youlogs", desc: "Read and write blogs on local trends and topics" },
                { emoji: "👩", label: "Women Empowerment", desc: "Skill promotion and visibility for women creators" },
                { emoji: "🌟", label: "Youth and Culture", desc: "Talent, creativity, and cultural programs for young people" },
                { emoji: "🤍", label: "Old Age Help", desc: "Engagement and empowerment for senior citizens" },
                { emoji: "🏆", label: "Volunteer Award", desc: "Recognizing kindness and social contribution" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200 flex items-start gap-4">
                  <div className="text-4xl shrink-0">{item.emoji}</div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-1">{item.label}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F58220 0%, #e06b0a 100%)" }}>
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <svg viewBox="0 0 800 300" className="w-full h-full">
              <circle cx="100" cy="150" r="120" fill="white" />
              <circle cx="700" cy="80" r="90" fill="white" />
              <circle cx="600" cy="280" r="70" fill="white" />
            </svg>
          </div>
          <div className="container mx-auto max-w-3xl text-white relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Get Started?</h2>
            <p className="text-white/85 text-xl leading-relaxed mb-10">
              Join YouTillEyes today and access all our services, from hiring and freebies to social recognition and community blogs. Your identity is waiting to be discovered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="h-14 px-10 text-lg font-black bg-white text-slate-900 hover:bg-slate-100 shadow-xl">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-semibold border-white text-white hover:bg-white/10">
                  Talk to Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              <div>
                <img src={footerLogoImg} alt="YouTillEyes" className="h-12 w-auto mb-5" />
                <p className="text-sm leading-relaxed text-slate-400 mb-6">Aap Nazro Tak. Utilize Yourself. A people-powered ecosystem connecting talent with opportunity.</p>
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
                <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Our Services</h4>
                <ul className="space-y-3 text-sm">
                  {services.map(s => (
                    <li key={s.id}><a href={`/services#${s.slug}`} className="text-slate-400 hover:text-orange-400 transition-colors">{s.title}</a></li>
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

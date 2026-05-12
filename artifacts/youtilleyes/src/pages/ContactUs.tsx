import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401-Photoroom_1774903197281.png";
import footerLogoImg from "@assets/20260331_030902_1774906812939.png";
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Phone, Mail, MapPin, Send } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

function ContactIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="400" height="300" rx="20" fill="#1A428A" fillOpacity="0.04" />
      <rect x="60" y="60" width="280" height="180" rx="16" fill="white" stroke="#1A428A" strokeWidth="1.5" strokeOpacity="0.15" />
      <rect x="60" y="60" width="280" height="45" rx="12" fill="#1A428A" fillOpacity="0.08" />
      <circle cx="88" cy="82" r="8" fill="#F58220" fillOpacity="0.8" />
      <circle cx="112" cy="82" r="8" fill="#1A428A" fillOpacity="0.3" />
      <circle cx="136" cy="82" r="8" fill="#1A428A" fillOpacity="0.15" />
      <rect x="85" y="125" width="100" height="8" rx="4" fill="#1A428A" fillOpacity="0.12" />
      <rect x="215" y="125" width="110" height="8" rx="4" fill="#1A428A" fillOpacity="0.12" />
      <rect x="85" y="148" width="240" height="8" rx="4" fill="#1A428A" fillOpacity="0.08" />
      <rect x="85" y="168" width="240" height="8" rx="4" fill="#1A428A" fillOpacity="0.08" />
      <rect x="85" y="188" width="200" height="8" rx="4" fill="#1A428A" fillOpacity="0.08" />
      <rect x="130" y="215" width="140" height="20" rx="8" fill="#F58220" fillOpacity="0.85" />
      <text x="168" y="229" fontSize="10" fill="white" fontWeight="800">Send Message</text>
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

export default function ContactUs() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const dashboardHref =
    user?.role === "ADMIN" ? "/admin/dashboard" :
    user?.role === "CLIENT" ? "/client/dashboard" : "/user/dashboard";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Message Sent!", description: "Thank you for reaching out. We will get back to you within 24 hours." });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/"><img src={logoImg} alt="YouTillEyes" className="h-10 w-auto cursor-pointer" /></Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href} className={`transition-colors ${l.href === "/contact" ? "text-primary font-bold" : "text-slate-500 hover:text-primary"}`}>{l.label}</Link>
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
                  💬 Contact Us
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
                  We're Here to Help You
                </h1>
                <h2 className="text-3xl font-extrabold mb-6" style={{ color: "#F58220" }}>Get in Touch</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Have a question, an idea, or want to collaborate? The YouTillEyes team is always ready to listen, guide, and help you find your place on the Folks-Force Platform.
                </p>
              </div>
              <div className="hidden md:block"><ContactIllustration /></div>
            </div>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Info */}
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-5">Reach Out to Us</h2>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                  Whether you are a talent looking to showcase your skills, a client with a project to post, or simply curious about what YouTillEyes and the Folks-Force Platform can do for you — we are just one message away.
                </p>
                <div className="space-y-6 mb-12">
                  {[
                    { icon: "📞", title: "Phone and WhatsApp", value: "+91 7084424242", sub: "Available for calls and WhatsApp messages", href: "tel:+917084424242", color: "#1A428A" },
                    { icon: "✉️", title: "Email Address", value: "info@youtilleyes.com", sub: "We reply to every message within 24 hours", href: "mailto:info@youtilleyes.com", color: "#F58220" },
                    { icon: "📍", title: "Location", value: "Uttar Pradesh, India", sub: "Serving talent and clients across India", href: null, color: "#1A428A" },
                    { icon: "🕐", title: "Support Hours", value: "Monday to Saturday, 9 AM to 7 PM", sub: "Indian Standard Time (IST)", href: null, color: "#F58220" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all">
                      <div className="text-3xl w-12 text-center shrink-0">{item.icon}</div>
                      <div>
                        <p className="font-bold text-slate-900 mb-1">{item.title}</p>
                        {item.href ? (
                          <a href={item.href} className="text-lg font-semibold hover:opacity-80 transition-opacity" style={{ color: item.color }}>{item.value}</a>
                        ) : (
                          <p className="text-lg font-semibold" style={{ color: item.color }}>{item.value}</p>
                        )}
                        <p className="text-sm text-slate-400 mt-1">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-4">Follow Us on Social Media</p>
                  <div className="flex gap-3 mb-3">
                    {[
                      { Icon: Instagram, label: "Instagram" },
                      { Icon: Linkedin, label: "LinkedIn" },
                      { Icon: Twitter, label: "Twitter" },
                      { Icon: Facebook, label: "Facebook" },
                      { Icon: Youtube, label: "YouTube" },
                    ].map(({ Icon, label }) => (
                      <a key={label} href="#" aria-label={label} className="h-11 w-11 rounded-full bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200">
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                  <p className="text-sm text-slate-400">Find us as @YouTillEyes on all major platforms</p>
                </div>
              </div>

              {/* Form */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm">
                <h3 className="text-2xl font-black text-slate-900 mb-2">Send Us a Message</h3>
                <p className="text-slate-500 mb-8">Fill in the form below and we will get back to you as soon as possible.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                      <Input placeholder="Your full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="bg-white h-12 rounded-xl border-slate-200 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                      <Input placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="bg-white h-12 rounded-xl border-slate-200 focus:border-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <Input type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required className="bg-white h-12 rounded-xl border-slate-200 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                    <Input placeholder="What is this message about?" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} required className="bg-white h-12 rounded-xl border-slate-200 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Your Message</label>
                    <Textarea placeholder="Tell us how we can help you..." rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required className="bg-white rounded-xl border-slate-200 focus:border-primary resize-none" />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full h-13 text-base font-black bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20">
                    {submitting ? (
                      <span className="flex items-center gap-3">
                        <span className="h-5 w-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending your message...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        <Send className="h-5 w-5" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Connect */}
        <section className="py-16 px-6" style={{ background: "linear-gradient(135deg, #1A428A 0%, #0d2a5e 100%)" }}>
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h2 className="text-2xl md:text-3xl font-black mb-4">Need Immediate Assistance?</h2>
            <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              Call or WhatsApp us directly. Our team is ready to assist you in identifying the right path, answering your questions, and helping you get started on the Folks-Force Platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+917084424242">
                <Button size="lg" className="h-14 px-8 text-base font-black gap-3" style={{ background: "#F58220", color: "white" }}>
                  <Phone className="h-5 w-5" /> Call: +91 7084424242
                </Button>
              </a>
              <a href="mailto:info@youtilleyes.com">
                <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold border-white text-white hover:bg-white/10 gap-3">
                  <Mail className="h-5 w-5" /> Email Us
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">Still Have Questions?</h2>
            <p className="text-slate-500 text-lg mb-10">Check out our frequently asked questions on the home page or write to us directly — we are always happy to help.</p>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { emoji: "🎯", title: "For Talent", desc: "Questions about joining, bidding, or getting paid? We have all the answers." },
                { emoji: "🏢", title: "For Clients", desc: "Want to post a project or understand how the platform works? Just ask." },
                { emoji: "🤝", title: "For Partnerships", desc: "Interested in partnering with YouTillEyes or the Folks-Force Platform? Reach out." },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
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

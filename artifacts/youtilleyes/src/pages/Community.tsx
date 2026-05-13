import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Heart, MessageCircle, Share2, Bookmark, Search, Plus, X,
  ChevronDown, ChevronUp, Send, Pin, TrendingUp, HelpCircle,
  Lightbulb, ShoppingBag, Users, Bell, Filter, MoreHorizontal,
  ThumbsUp, Award, Flame
} from "lucide-react";

type Role = "ADMIN" | "CLIENT" | "USER";

interface Comment {
  id: number;
  userId: number;
  userName: string;
  userRole: Role;
  avatar: string;
  content: string;
  likes: number;
  liked: boolean;
  timeAgo: string;
  replies?: Comment[];
  replyOpen?: boolean;
}

interface Post {
  id: number;
  userId: number;
  userName: string;
  userRole: Role;
  avatar: string;
  category: "question" | "tip" | "announcement" | "discussion" | "sale";
  title: string;
  content: string;
  tags: string[];
  likes: number;
  liked: boolean;
  bookmarked: boolean;
  comments: Comment[];
  timeAgo: string;
  pinned?: boolean;
  views: number;
  solved?: boolean;
}

const ROLE_BADGE: Record<Role, { label: string; bg: string; color: string }> = {
  ADMIN: { label: "Admin", bg: "#1A428A15", color: "#1A428A" },
  CLIENT: { label: "Client", bg: "#F5822015", color: "#b85e00" },
  USER: { label: "Talent", bg: "#16a34a15", color: "#16a34a" },
};

const CATEGORY_STYLE: Record<Post["category"], { label: string; icon: any; color: string; bg: string }> = {
  question: { label: "Question", icon: HelpCircle, color: "#7c3aed", bg: "#7c3aed15" },
  tip: { label: "Tip", icon: Lightbulb, color: "#d97706", bg: "#d9770615" },
  announcement: { label: "Announcement", icon: Bell, color: "#1A428A", bg: "#1A428A15" },
  discussion: { label: "Discussion", icon: Users, color: "#0891b2", bg: "#0891b215" },
  sale: { label: "For Sale", icon: ShoppingBag, color: "#16a34a", bg: "#16a34a15" },
};

const initPosts: Post[] = [
  {
    id: 1,
    userId: 0,
    userName: "YouTillEyes Team",
    userRole: "ADMIN",
    avatar: "Y",
    category: "announcement",
    pinned: true,
    title: "Welcome to the YouTillEyes Community!",
    content: "Namaste sabko! Yeh hamara official community space hai jahan aap apne sawaal pooch sakte hain, tips share kar sakte hain, aur ek doosre se seekh sakte hain.\n\nKuch guidelines:\n• Respectful rehna\n• Helpful jawab dena\n• Spam bilkul nahi\n• Dusron ko motivate karo\n\nAap Nazro Tak — Utilize Yourself! 🙌",
    tags: ["Welcome", "Guidelines", "Community"],
    likes: 87,
    liked: false,
    bookmarked: false,
    views: 1240,
    timeAgo: "3 days ago",
    comments: [
      { id: 101, userId: 1, userName: "Rahul Sharma", userRole: "USER", avatar: "R", content: "Bahut badhiya initiative hai! Hum sab ek saath seekhenge aur grow karenge. Jai ho YouTillEyes! 🎉", likes: 12, liked: false, timeAgo: "3 days ago", replies: [] },
      { id: 102, userId: 6, userName: "Aarav Business", userRole: "CLIENT", avatar: "A", content: "Excellent platform. As a client, I'm looking forward to connecting with talented individuals here.", likes: 8, liked: false, timeAgo: "2 days ago", replies: [] },
    ],
  },
  {
    id: 2,
    userId: 1,
    userName: "Rahul Sharma",
    userRole: "USER",
    avatar: "R",
    category: "question",
    title: "Graphic Design mein shuru kaise karein? Portfolio ke liye kya banayein?",
    content: "Hello community! Main ek beginner graphic designer hoon. Mujhe nahi pata ki apna first portfolio kaise banayein.\n\nMain Canva aur basic Photoshop jaanta hoon. Kya yeh platforms enough hain clients attract karne ke liye? Aur first client milne se pehle kuch free projects karne chahiye?",
    tags: ["Graphic Design", "Portfolio", "Beginner", "Freelancing"],
    likes: 34,
    liked: false,
    bookmarked: false,
    views: 312,
    timeAgo: "2 days ago",
    solved: false,
    comments: [
      {
        id: 201, userId: 2, userName: "Priya Singh", userRole: "USER", avatar: "P",
        content: "Bilkul! Portfolio ke liye 5-6 best work showcase karo. Free nahi karna, rather very low price pe 2-3 projects lo. Fiverr par dekho kya trending hai aur usi style mein samples banao.",
        likes: 18, liked: false, timeAgo: "2 days ago",
        replies: [
          { id: 2011, userId: 1, userName: "Rahul Sharma", userRole: "USER", avatar: "R", content: "Thank you Priya! Fiverr idea bahut helpful hai. Main woh try karunga.", likes: 3, liked: false, timeAgo: "1 day ago", replies: [] }
        ]
      },
      {
        id: 202, userId: 6, userName: "Aarav Business", userRole: "CLIENT", avatar: "A",
        content: "As a client, I look for creativity and consistency. Make a PDF portfolio showing before/after work and your design process. That impresses more than just final outputs.",
        likes: 22, liked: false, timeAgo: "1 day ago", replies: []
      },
    ],
  },
  {
    id: 3,
    userId: 2,
    userName: "Priya Singh",
    userRole: "USER",
    avatar: "P",
    category: "tip",
    title: "Freelancing ka pehla Rule — Apni Value Know Karo!",
    content: "Meri personal journey se kuch seekha:\n\n1. Hamesha apni skills ki proper value lagao. Underpricing se clients respect nahi karte.\n2. Contract/agreement zaroor likho, chahe chhota kaam ho.\n3. 50% advance payment pehle lo — yeh professional practice hai.\n4. YouTillEyes pe apna profile strong banao, kyunki clients wahan se dekh ke contact karte hain.\n\n5 saal ke experience ka nichodh yeh hai — tumhara time value hai! 💪",
    tags: ["Freelancing", "Tips", "Business", "Self-Worth"],
    likes: 56,
    liked: false,
    bookmarked: false,
    views: 478,
    timeAgo: "1 day ago",
    comments: [
      { id: 301, userId: 3, userName: "Mohit Kumar", userRole: "USER", avatar: "M", content: "Gold hai yeh advice! Especially 50% advance wala point. Main baar baar yahi mistake karta tha.", likes: 9, liked: false, timeAgo: "23 hours ago", replies: [] },
      { id: 302, userId: 4, userName: "Sneha Verma", userRole: "USER", avatar: "S", content: "Priya ji bilkul sahi keh rahe hain. Mujhe bhi bahut time laga samajhne mein ki underpricing actually clients ko doubt mein daalta hai.", likes: 7, liked: false, timeAgo: "20 hours ago", replies: [] },
    ],
  },
  {
    id: 4,
    userId: 3,
    userName: "Mohit Kumar",
    userRole: "USER",
    avatar: "M",
    category: "question",
    title: "Video Editing ke liye best software kaunsa hai under ₹0 budget?",
    content: "Mujhe video editing seekhni hai but abhi paid tools afford nahi ho sakte.\n\nKya DaVinci Resolve free version se professional quality kaam ho sakta hai? Ya koi aur better free option hai? Android pe bhi koi achha app ho toh batao.",
    tags: ["Video Editing", "Free Tools", "DaVinci", "YouTube"],
    likes: 28,
    liked: false,
    bookmarked: false,
    views: 201,
    timeAgo: "18 hours ago",
    solved: false,
    comments: [
      { id: 401, userId: 5, userName: "Amit Patel", userRole: "USER", avatar: "A", content: "DaVinci Resolve bilkul professional level hai aur free mein! Hollywood movies bhi isme edit hoti hain. CapCut mobile ke liye best hai — bahut easy aur powerful.", likes: 15, liked: false, timeAgo: "17 hours ago", replies: [] },
      { id: 402, userId: 7, userName: "Digital Hub", userRole: "CLIENT", avatar: "D", content: "We use DaVinci Resolve for our in-house projects. The free version is more than enough for most work. Learn it well and you'll be hireable immediately!", likes: 11, liked: false, timeAgo: "16 hours ago", replies: [] },
    ],
  },
  {
    id: 5,
    userId: 7,
    userName: "Digital Hub",
    userRole: "CLIENT",
    avatar: "D",
    category: "discussion",
    title: "YouTillEyes pe Talent Dhundhne ka Experience Kaisa Raha?",
    content: "Mere liye yeh platform game-changer raha. Maine 3 projects post kiye aur 24 hours ke andar 8+ bids mili — sab genuine aur well-thought proposals ke saath.\n\nJo cheez mujhe sabse zyada pasand aayi: talent ka professionalism aur communication quality. Client hone ke naate main recommend karunga ki sab log profile pe portfolio zaroor daalen.\n\nAap logon ka experience kaisa raha?",
    tags: ["Client Experience", "Platform", "Talent", "Feedback"],
    likes: 45,
    liked: false,
    bookmarked: false,
    views: 389,
    timeAgo: "12 hours ago",
    comments: [
      { id: 501, userId: 1, userName: "Rahul Sharma", userRole: "USER", avatar: "R", content: "Shukriya Digital Hub ji! Humari taraf se bhi bahut positive experience raha hai. Clear project descriptions bahut help karti hain bidding mein.", likes: 8, liked: false, timeAgo: "11 hours ago", replies: [] },
      { id: 502, userId: 2, userName: "Priya Singh", userRole: "USER", avatar: "P", content: "Bilkul agree! Clients jo clear brief dete hain, unke saath kaam karna bahut smooth hota hai. Communication is key.", likes: 6, liked: false, timeAgo: "10 hours ago", replies: [] },
    ],
  },
  {
    id: 6,
    userId: 4,
    userName: "Sneha Verma",
    userRole: "USER",
    avatar: "S",
    category: "tip",
    title: "Instagram Content Creation se paise kaise kamayein — Meri Story",
    content: "2 saal pehle main sirf timepass ke liye reels banati thi. Aaj meri monthly earning ₹35,000+ hai sirf content creation se!\n\nMera journey:\n• Pehle 6 mahine: free kaam, portfolio build kiya\n• Phir YouTillEyes pe profile banaya\n• Pehla paid project: ₹1,500 ka logo design\n• Ab: regular clients, monthly retainers\n\nAap bhi kar sakte ho — bas consistency chahiye! 🔥",
    tags: ["Content Creation", "Instagram", "Income", "Success Story"],
    likes: 73,
    liked: false,
    bookmarked: false,
    views: 621,
    timeAgo: "8 hours ago",
    comments: [
      { id: 601, userId: 3, userName: "Mohit Kumar", userRole: "USER", avatar: "M", content: "Waah Sneha ji! Bahut inspiring story hai. Kya aap ek detailed post bhi likhegi about your journey? Bahut helpful hoga beginners ke liye.", likes: 14, liked: false, timeAgo: "7 hours ago", replies: [] },
      { id: 602, userId: 8, userName: "Meera Enterprises", userRole: "CLIENT", avatar: "M", content: "This is exactly the kind of talent we look for! Reached out to Sneha for our brand's Instagram — highly recommend her work.", likes: 19, liked: false, timeAgo: "5 hours ago", replies: [] },
    ],
  },
  {
    id: 7,
    userId: 5,
    userName: "Amit Patel",
    userRole: "USER",
    avatar: "A",
    category: "question",
    title: "Web Development mein kaunsa skill 2025 mein sabse zyada demand mein hai?",
    content: "Main currently HTML, CSS, JavaScript seekh raha hoon. Next kya seekhoon?\n\nOptions hain:\n- React.js\n- Next.js\n- Vue.js\n- Backend (Node.js)\n\nKya main React skip karke directly Next.js seekh sakta hoon?",
    tags: ["Web Development", "React", "JavaScript", "Career"],
    likes: 41,
    liked: false,
    bookmarked: false,
    views: 334,
    timeAgo: "5 hours ago",
    solved: false,
    comments: [
      { id: 701, userId: 2, userName: "Priya Singh", userRole: "USER", avatar: "P", content: "React zaroor seekho pehle! Next.js React ke upar hi build hoti hai. Bina React jaane Next.js confusing lagega. Order: HTML/CSS → JS → React → Next.js", likes: 21, liked: false, timeAgo: "4 hours ago", replies: [] },
    ],
  },
  {
    id: 8,
    userId: 8,
    userName: "Meera Enterprises",
    userRole: "CLIENT",
    avatar: "M",
    category: "sale",
    title: "Urgent: Logo Design + Brand Kit Project — Budget ₹5,000 to ₹8,000",
    content: "Humein ek professional logo design chahiye ek new startup ke liye.\n\nRequirements:\n• Modern, minimalist logo\n• Color palette + typography\n• Social media assets (5 templates)\n• Business card design\n• Delivery: 7 days\n\nInterested freelancers please bid on my project page ya directly comment karein. Looking for experienced designers only.",
    tags: ["Logo Design", "Branding", "Paid Project", "Urgent"],
    likes: 12,
    liked: false,
    bookmarked: false,
    views: 156,
    timeAgo: "2 hours ago",
    comments: [
      { id: 801, userId: 1, userName: "Rahul Sharma", userRole: "USER", avatar: "R", content: "I'm interested! I have 2 years of logo design experience. Will send you a DM with my portfolio. Expected delivery: 5 days.", likes: 3, liked: false, timeAgo: "1 hour ago", replies: [] },
      { id: 802, userId: 4, userName: "Sneha Verma", userRole: "USER", avatar: "S", content: "Please check my profile — I've done 15+ brand kits. Can deliver in 6 days within budget. Let's connect!", likes: 2, liked: false, timeAgo: "45 min ago", replies: [] },
    ],
  },
];

const FILTERS = ["All", "Questions", "Tips", "Discussions", "Announcements", "For Sale"];

function Avatar({ initial, size = "md", color }: { initial: string; size?: "sm" | "md" | "lg"; color?: string }) {
  const colors = ["#1A428A", "#F58220", "#7c3aed", "#16a34a", "#0891b2", "#d97706"];
  const bg = color || colors[initial.charCodeAt(0) % colors.length];
  const sizeClass = size === "sm" ? "h-7 w-7 text-[11px]" : size === "lg" ? "h-12 w-12 text-lg" : "h-9 w-9 text-sm";
  return (
    <div className={cn("rounded-full flex items-center justify-center font-black text-white shrink-0", sizeClass)} style={{ background: bg }}>
      {initial}
    </div>
  );
}

function RoleBadge({ role }: { role: Role }) {
  const b = ROLE_BADGE[role];
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: b.bg, color: b.color }}>{b.label}</span>
  );
}

function CategoryBadge({ category }: { category: Post["category"] }) {
  const c = CATEGORY_STYLE[category];
  const Icon = c.icon;
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: c.bg, color: c.color }}>
      <Icon className="h-3 w-3" />{c.label}
    </span>
  );
}

function CommentItem({ comment, onLike, depth = 0 }: { comment: Comment; onLike: (id: number) => void; depth?: number }) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  return (
    <div className={cn("flex gap-2.5", depth > 0 && "ml-8 mt-2")}>
      <Avatar initial={comment.avatar} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl rounded-tl-none px-3 py-2.5" style={{ background: "#f8faff" }}>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-bold text-slate-900 text-xs">{comment.userName}</span>
            <RoleBadge role={comment.userRole} />
            <span className="text-slate-400 text-[10px] ml-auto">{comment.timeAgo}</span>
          </div>
          <p className="text-slate-700 text-xs leading-relaxed">{comment.content}</p>
        </div>
        <div className="flex items-center gap-3 mt-1 ml-2">
          <button onClick={() => onLike(comment.id)} className={cn("flex items-center gap-1 text-[11px] font-semibold transition-colors", comment.liked ? "text-red-500" : "text-slate-400 hover:text-red-400")}>
            <Heart className={cn("h-3 w-3", comment.liked && "fill-current")} />
            {comment.likes + (comment.liked ? 1 : 0)}
          </button>
          {depth === 0 && (
            <button onClick={() => setReplyOpen(!replyOpen)} className="text-[11px] font-semibold text-slate-400 hover:text-primary transition-colors">Reply</button>
          )}
        </div>
        {replyOpen && (
          <div className="flex gap-2 mt-2 ml-2">
            <input value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Write a reply..." className="flex-1 text-xs px-3 py-2 rounded-full border border-slate-200 focus:outline-none focus:border-primary bg-white" />
            <button className="h-8 w-8 rounded-full flex items-center justify-center text-white shrink-0" style={{ background: "#1A428A" }}><Send className="h-3 w-3" /></button>
          </div>
        )}
        {comment.replies?.map(r => (
          <CommentItem key={r.id} comment={r} onLike={onLike} depth={1} />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post, onLike, onBookmark, onCommentLike }: { post: Post; onLike: (id: number) => void; onBookmark: (id: number) => void; onCommentLike: (postId: number, commentId: number) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { user } = useAuth();

  return (
    <div className={cn("bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-all duration-200 overflow-hidden", post.pinned && "border-primary/20 shadow-sm")}>
      {post.pinned && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/10" style={{ background: "#1A428A08" }}>
          <Pin className="h-3 w-3" style={{ color: "#1A428A" }} />
          <span className="text-[11px] font-bold" style={{ color: "#1A428A" }}>Pinned Post</span>
        </div>
      )}
      <div className="p-4 md:p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <Avatar initial={post.avatar} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-900 text-sm">{post.userName}</span>
              <RoleBadge role={post.userRole} />
              <CategoryBadge category={post.category} />
              {post.solved && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">✓ Solved</span>}
            </div>
            <span className="text-slate-400 text-[11px]">{post.timeAgo} · {post.views} views</span>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-1"><MoreHorizontal className="h-4 w-4" /></button>
        </div>

        {/* Content */}
        <h3 className="font-bold text-slate-900 text-sm md:text-base mb-2 leading-snug">{post.title}</h3>
        <p className={cn("text-slate-600 text-xs md:text-sm leading-relaxed whitespace-pre-line", !expanded && "line-clamp-3")}>
          {post.content}
        </p>
        {post.content.length > 200 && (
          <button onClick={() => setExpanded(!expanded)} className="text-xs font-semibold mt-1 transition-colors" style={{ color: "#1A428A" }}>
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {post.tags.map(tag => (
            <span key={tag} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer transition-colors">#{tag}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 mt-4 pt-3 border-t border-slate-50">
          <button onClick={() => onLike(post.id)} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all", post.liked ? "bg-red-50 text-red-500" : "text-slate-500 hover:bg-red-50 hover:text-red-400")}>
            <Heart className={cn("h-4 w-4", post.liked && "fill-current")} />
            <span>{post.likes + (post.liked ? 1 : 0)}</span>
          </button>
          <button onClick={() => setExpanded(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-500 hover:bg-blue-50 hover:text-blue-500 transition-all">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments.length}</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-500 hover:bg-green-50 hover:text-green-500 transition-all">
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <div className="flex-1" />
          <button onClick={() => onBookmark(post.id)} className={cn("p-2 rounded-full transition-all", post.bookmarked ? "text-primary bg-primary/10" : "text-slate-400 hover:text-primary hover:bg-primary/5")}>
            <Bookmark className={cn("h-4 w-4", post.bookmarked && "fill-current")} />
          </button>
        </div>

        {/* Comments Section */}
        {(expanded || post.comments.length > 0) && (
          <div className="mt-4 space-y-3">
            {post.comments.length > 0 && (
              <div className="space-y-3">
                {post.comments.map(comment => (
                  <CommentItem key={comment.id} comment={comment} onLike={(cId) => onCommentLike(post.id, cId)} />
                ))}
              </div>
            )}
            {user && (
              <div className="flex gap-2 mt-3 pt-3 border-t border-slate-50">
                <Avatar initial={user.name.charAt(0)} size="sm" />
                <div className="flex-1 flex gap-2">
                  <input
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:border-primary bg-slate-50 focus:bg-white transition-colors"
                  />
                  <button
                    disabled={!commentText.trim()}
                    className="h-9 w-9 rounded-full flex items-center justify-center text-white shrink-0 transition-opacity disabled:opacity-40"
                    style={{ background: "#1A428A" }}
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function NewPostModal({ onClose, userName, userRole }: { onClose: () => void; userName: string; userRole: Role }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Post["category"]>("question");
  const [tags, setTags] = useState("");

  return (
    <div className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="font-black text-slate-900 text-lg">New Post</h2>
          <button onClick={onClose} className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"><X className="h-4 w-4" /></button>
        </div>
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="flex items-center gap-3">
            <Avatar initial={userName.charAt(0)} />
            <div>
              <p className="font-bold text-slate-900 text-sm">{userName}</p>
              <RoleBadge role={userRole} />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 mb-2 block">Post Type</label>
            <div className="flex flex-wrap gap-2">
              {(["question", "tip", "discussion", "sale"] as Post["category"][]).map(c => {
                const s = CATEGORY_STYLE[c];
                const Icon = s.icon;
                return (
                  <button key={c} onClick={() => setCategory(c)}
                    className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all", category === c ? "border-current" : "border-transparent")}
                    style={{ background: category === c ? s.bg : "#f8faff", color: s.color }}>
                    <Icon className="h-3 w-3" />{s.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Title / Question</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Apna sawaal ya topic likhein..." className="h-11 rounded-xl text-sm" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Details</label>
            <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Puri baat batayein..." rows={4} className="rounded-xl text-sm resize-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Tags (comma separated)</label>
            <Input value={tags} onChange={e => setTags(e.target.value)} placeholder="Freelancing, Design, Tips..." className="h-11 rounded-xl text-sm" />
          </div>
          <Button className="w-full h-12 font-black text-sm text-white rounded-xl" style={{ background: "#1A428A" }} disabled={!title.trim() || !content.trim()}>
            Post to Community
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initPosts);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);

  const filterMap: Record<string, Post["category"] | null> = {
    "All": null, "Questions": "question", "Tips": "tip",
    "Discussions": "discussion", "Announcements": "announcement", "For Sale": "sale",
  };

  const filtered = posts.filter(p => {
    const matchFilter = filterMap[filter] ? p.category === filterMap[filter] : true;
    const matchSearch = search ? (p.title + p.content + p.tags.join()).toLowerCase().includes(search.toLowerCase()) : true;
    return matchFilter && matchSearch;
  });

  const handleLike = (postId: number) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, liked: !p.liked } : p));
  };

  const handleBookmark = (postId: number) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, bookmarked: !p.bookmarked } : p));
  };

  const handleCommentLike = (postId: number, commentId: number) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        comments: p.comments.map(c => c.id === commentId ? { ...c, liked: !c.liked } : {
          ...c,
          replies: c.replies?.map(r => r.id === commentId ? { ...r, liked: !r.liked } : r)
        })
      };
    }));
  };

  const stats = {
    total: posts.length,
    questions: posts.filter(p => p.category === "question").length,
    solved: posts.filter(p => p.solved).length,
    members: 127,
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0" style={{ background: "#f8faff" }}>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex items-center gap-3 h-14 md:h-16">
            <div className="flex items-center gap-2 mr-auto">
              <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ background: "#1A428A" }}>
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="font-black text-slate-900 text-base md:text-lg leading-none">Community</h1>
                <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">{stats.members} members online</p>
              </div>
            </div>
            <div className="relative hidden sm:flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search posts..."
                className="pl-9 pr-4 py-2 text-sm rounded-full border border-slate-200 bg-slate-50 focus:outline-none focus:border-primary focus:bg-white transition-colors w-48 lg:w-64"
              />
            </div>
            {user && (
              <Button onClick={() => setShowNewPost(true)} size="sm" className="font-bold text-white gap-1.5 rounded-full" style={{ background: "#F58220" }}>
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Post</span>
              </Button>
            )}
            {!user && (
              <Link href="/login"><Button size="sm" className="font-bold text-white gap-1.5 rounded-full" style={{ background: "#1A428A" }}>Join</Button></Link>
            )}
          </div>
          {/* Mobile search */}
          <div className="sm:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search community..." className="w-full pl-9 pr-4 py-2.5 text-sm rounded-full border border-slate-200 bg-slate-50 focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl py-4 md:py-6">
        <div className="flex gap-6 items-start">
          {/* Main Feed */}
          <div className="flex-1 min-w-0">
            {/* Filter Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 mb-4 scrollbar-none">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={cn("whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0", filter === f ? "text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:border-primary/40")}
                  style={filter === f ? { background: "#1A428A" } : {}}>
                  {f}
                </button>
              ))}
            </div>

            {/* Stats row — mobile */}
            <div className="grid grid-cols-4 gap-2 mb-4 md:hidden">
              {[
                { n: stats.total, label: "Posts", icon: Flame },
                { n: stats.questions, label: "Questions", icon: HelpCircle },
                { n: stats.solved, label: "Solved", icon: Award },
                { n: stats.members, label: "Members", icon: Users },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-2.5 text-center border border-slate-100">
                    <div className="text-lg font-black text-slate-900">{s.n}</div>
                    <div className="text-[9px] text-slate-400 font-semibold">{s.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Post Feed */}
            <div className="space-y-3 md:space-y-4">
              {filtered.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-slate-100">
                  <div className="text-5xl mb-3">🔍</div>
                  <p className="font-bold text-slate-700 mb-1">No posts found</p>
                  <p className="text-slate-400 text-sm">Try a different filter or search term</p>
                </div>
              ) : (
                filtered.map(post => (
                  <PostCard key={post.id} post={post} onLike={handleLike} onBookmark={handleBookmark} onCommentLike={handleCommentLike} />
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar — desktop only */}
          <div className="hidden lg:flex flex-col gap-4 w-64 shrink-0">
            {/* Stats */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100">
              <h3 className="font-black text-slate-900 text-sm mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" style={{ color: "#F58220" }} />
                Community Stats
              </h3>
              <div className="space-y-3">
                {[
                  { n: stats.total, label: "Total Posts", color: "#1A428A" },
                  { n: stats.questions, label: "Questions", color: "#7c3aed" },
                  { n: stats.solved, label: "Solved Posts", color: "#16a34a" },
                  { n: stats.members, label: "Active Members", color: "#F58220" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">{s.label}</span>
                    <span className="font-black text-sm" style={{ color: s.color }}>{s.n}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100">
              <h3 className="font-black text-slate-900 text-sm mb-4 flex items-center gap-2">
                <Award className="h-4 w-4" style={{ color: "#F58220" }} />
                Top Contributors
              </h3>
              <div className="space-y-3">
                {[
                  { name: "Priya Singh", role: "USER" as Role, posts: 12, badge: "🏆" },
                  { name: "Sneha Verma", role: "USER" as Role, posts: 9, badge: "🥈" },
                  { name: "Rahul Sharma", role: "USER" as Role, posts: 7, badge: "🥉" },
                  { name: "Digital Hub", role: "CLIENT" as Role, posts: 5, badge: "⭐" },
                  { name: "Mohit Kumar", role: "USER" as Role, posts: 4, badge: "⭐" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="text-base w-5 text-center">{c.badge}</span>
                    <Avatar initial={c.name.charAt(0)} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 text-xs truncate">{c.name}</p>
                      <p className="text-slate-400 text-[10px]">{c.posts} posts</p>
                    </div>
                    <RoleBadge role={c.role} />
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100">
              <h3 className="font-black text-slate-900 text-sm mb-4">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["Freelancing", "Design", "JavaScript", "Portfolio", "Tips", "Earning", "Video Editing", "Content"].map(tag => (
                  <button key={tag} onClick={() => setSearch(tag)} className="text-[10px] font-semibold px-2.5 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary transition-colors">
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            {!user && (
              <div className="rounded-2xl p-5 text-white text-center" style={{ background: "linear-gradient(135deg, #1A428A, #0d2a5e)" }}>
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-black text-sm mb-1.5">Join the Community</h3>
                <p className="text-blue-200 text-xs mb-4">Ask questions, share tips, and grow together</p>
                <Link href="/register">
                  <Button size="sm" className="w-full font-bold text-slate-900 bg-white hover:bg-slate-100 text-xs">Join Free</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile FAB */}
      {user && (
        <button onClick={() => setShowNewPost(true)}
          className="md:hidden fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-2xl flex items-center justify-center text-white z-40 transition-transform active:scale-95"
          style={{ background: "#F58220", boxShadow: "0 8px 30px rgba(245,130,32,0.4)" }}>
          <Plus className="h-6 w-6" />
        </button>
      )}

      {showNewPost && user && (
        <NewPostModal onClose={() => setShowNewPost(false)} userName={user.name} userRole={user.role as Role} />
      )}
    </div>
  );
}

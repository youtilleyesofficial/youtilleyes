import { db } from "@workspace/db";
import { usersTable, projectsTable, bidsTable, submissionsTable } from "@workspace/db/schema";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "youtilleyes_salt").digest("hex");
}

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(submissionsTable);
  await db.delete(bidsTable);
  await db.delete(projectsTable);
  await db.delete(usersTable);

  console.log("Cleared existing data.");

  // Insert Admins
  const admins = await db.insert(usersTable).values([
    {
      name: "Rajesh Sharma",
      email: "admin1@youtilleyes.com",
      password: hashPassword("Admin@123"),
      role: "ADMIN",
      phone: "+91 7084424242",
      bio: "Platform administrator with 10 years of experience in talent management.",
      skills: "Administration, Moderation, Quality Control",
      isActive: true,
    },
    {
      name: "Priya Gupta",
      email: "admin2@youtilleyes.com",
      password: hashPassword("Admin@123"),
      role: "ADMIN",
      phone: "+91 9876543210",
      bio: "Co-founder and operations head at YouTillEyes. Passionate about connecting talent with opportunity.",
      skills: "Operations, HR, Compliance",
      isActive: true,
    },
  ]).returning();

  console.log("Admins created:", admins.length);

  // Insert Clients
  const clients = await db.insert(usersTable).values([
    {
      name: "TechVision Pvt Ltd",
      email: "client1@example.com",
      password: hashPassword("Client@123"),
      role: "CLIENT",
      phone: "+91 9812345678",
      bio: "A growing IT company based in Noida, UP, looking for talented freelancers for web and mobile projects.",
      skills: "Project Management, IT Services",
      isActive: true,
    },
    {
      name: "Aarav Mehta",
      email: "client2@example.com",
      password: hashPassword("Client@123"),
      role: "CLIENT",
      phone: "+91 9988776655",
      bio: "Digital marketing consultant seeking content writers, designers and developers.",
      skills: "Marketing, Brand Strategy",
      isActive: true,
    },
    {
      name: "SaaSify Solutions",
      email: "client3@example.com",
      password: hashPassword("Client@123"),
      role: "CLIENT",
      phone: "+91 8899001122",
      bio: "B2B SaaS startup building products for SMEs. Regularly outsourcing development work.",
      skills: "SaaS, Product Management",
      isActive: true,
    },
    {
      name: "Neha Agarwal",
      email: "client4@example.com",
      password: hashPassword("Client@123"),
      role: "CLIENT",
      phone: "+91 7007008009",
      bio: "Entrepreneur running an e-commerce brand. Needs designers and social media experts.",
      skills: "E-commerce, Brand Building",
      isActive: true,
    },
    {
      name: "GreenLeaf NGO",
      email: "client5@example.com",
      password: hashPassword("Client@123"),
      role: "CLIENT",
      phone: "+91 9123456780",
      bio: "Non-profit organization working in environmental awareness. Seeking creative professionals.",
      skills: "Non-profit Management, Awareness Campaigns",
      isActive: true,
    },
  ]).returning();

  console.log("Clients created:", clients.length);

  // Insert Users (freelancers)
  const users = await db.insert(usersTable).values([
    {
      name: "Vikram Singh",
      email: "user1@example.com",
      password: hashPassword("User@123"),
      role: "USER",
      phone: "+91 8800112233",
      bio: "Full-stack developer with 5 years of experience in React, Node.js and PostgreSQL.",
      skills: "React, Node.js, PostgreSQL, TypeScript, REST APIs",
      isActive: true,
    },
    {
      name: "Ananya Joshi",
      email: "user2@example.com",
      password: hashPassword("User@123"),
      role: "USER",
      phone: "+91 7700334455",
      bio: "UI/UX designer specialized in mobile-first design. Experienced with Figma and Adobe XD.",
      skills: "UI/UX Design, Figma, Adobe XD, Prototyping, User Research",
      isActive: true,
    },
    {
      name: "Rahul Verma",
      email: "user3@example.com",
      password: hashPassword("User@123"),
      role: "USER",
      phone: "+91 9900556677",
      bio: "Content writer and SEO specialist with a portfolio of 200+ articles across tech and lifestyle.",
      skills: "Content Writing, SEO, Copywriting, Blogging, Social Media",
      isActive: true,
    },
    {
      name: "Shreya Patel",
      email: "user4@example.com",
      password: hashPassword("User@123"),
      role: "USER",
      phone: "+91 8811223344",
      bio: "Android and iOS developer. Building apps since 2018. Published 12 apps on Play Store.",
      skills: "Android, iOS, Flutter, Dart, Java, Swift",
      isActive: true,
    },
    {
      name: "Karan Malhotra",
      email: "user5@example.com",
      password: hashPassword("User@123"),
      role: "USER",
      phone: "+91 7766554433",
      bio: "Data analyst and Python developer. Experienced with data visualization and ML models.",
      skills: "Python, Data Analysis, Machine Learning, Pandas, Tableau",
      isActive: true,
    },
  ]).returning();

  console.log("Users created:", users.length);

  const client1 = clients[0]!;
  const client2 = clients[1]!;
  const client3 = clients[2]!;
  const client4 = clients[3]!;
  const client5 = clients[4]!;
  const user1 = users[0]!;
  const user2 = users[1]!;
  const user3 = users[2]!;
  const user4 = users[3]!;
  const user5 = users[4]!;

  // Insert Projects
  const projects = await db.insert(projectsTable).values([
    {
      title: "E-commerce Website Development",
      description: "Build a full-featured e-commerce platform with product listings, cart, payment gateway (Razorpay), and admin panel. Tech stack: React + Node.js + PostgreSQL.",
      category: "Web Development",
      budget: "45000",
      deadline: new Date("2026-05-15"),
      status: "Open",
      clientId: client1.id,
    },
    {
      title: "Mobile App UI/UX Design",
      description: "Design a complete UI/UX for a food delivery mobile app (iOS and Android). Include onboarding screens, home, restaurant listing, cart, and order tracking.",
      category: "Design",
      budget: "20000",
      deadline: new Date("2026-04-30"),
      status: "Assigned",
      clientId: client2.id,
      assignedUserId: user2.id,
    },
    {
      title: "SEO Content Writing - 30 Articles",
      description: "Need 30 high-quality SEO-optimized articles on digital marketing topics. Each article should be 1500+ words, well-researched, and ready to publish.",
      category: "Content Writing",
      budget: "15000",
      deadline: new Date("2026-04-20"),
      status: "In-Progress",
      clientId: client2.id,
      assignedUserId: user3.id,
    },
    {
      title: "Flutter Mobile App Development",
      description: "Develop a cross-platform fitness tracking app using Flutter. Features: workout logging, progress charts, BMI calculator, push notifications.",
      category: "Mobile Development",
      budget: "60000",
      deadline: new Date("2026-06-01"),
      status: "Open",
      clientId: client3.id,
    },
    {
      title: "Data Dashboard & Analytics",
      description: "Build an interactive analytics dashboard using Python + Dash or React + Recharts. Connect to our PostgreSQL database and show sales trends, user metrics.",
      category: "Data Science",
      budget: "35000",
      deadline: new Date("2026-05-10"),
      status: "Submitted",
      clientId: client3.id,
      assignedUserId: user5.id,
    },
    {
      title: "Brand Identity Design Package",
      description: "Create complete brand identity for a sustainable clothing brand: logo, color palette, typography, business card, letterhead, and social media kit.",
      category: "Design",
      budget: "18000",
      deadline: new Date("2026-04-25"),
      status: "Completed",
      clientId: client4.id,
      assignedUserId: user2.id,
    },
    {
      title: "WordPress Website for NGO",
      description: "Build a professional WordPress website for our NGO with donation integration, blog, events calendar, volunteer registration form, and mobile-responsive design.",
      category: "Web Development",
      budget: "12000",
      deadline: new Date("2026-05-05"),
      status: "Open",
      clientId: client5.id,
    },
    {
      title: "Social Media Campaign Content",
      description: "Create 60 days of social media content (posts, reels scripts, stories) for Instagram, Facebook, and LinkedIn for a sustainable lifestyle brand.",
      category: "Content Writing",
      budget: "8000",
      deadline: new Date("2026-04-15"),
      status: "Open",
      clientId: client4.id,
    },
    {
      title: "REST API Development",
      description: "Develop a comprehensive REST API for our inventory management system. Include authentication, CRUD operations, reports, and third-party integrations.",
      category: "Web Development",
      budget: "40000",
      deadline: new Date("2026-05-20"),
      status: "Assigned",
      clientId: client1.id,
      assignedUserId: user1.id,
    },
    {
      title: "Machine Learning Model for Sales Prediction",
      description: "Build and deploy a sales prediction ML model using our historical data. Python-based with API endpoint for real-time predictions. Include documentation.",
      category: "Data Science",
      budget: "55000",
      deadline: new Date("2026-06-15"),
      status: "Open",
      clientId: client3.id,
    },
  ]).returning();

  console.log("Projects created:", projects.length);

  // Insert Bids
  const bids = await db.insert(bidsTable).values([
    {
      projectId: projects[0]!.id,
      userId: user1.id,
      amount: "42000",
      proposal: "I have 5 years of experience in full-stack development and have built 3 e-commerce platforms. I will deliver this in 6 weeks with complete testing and documentation.",
      timeline: "6 weeks",
      status: "Pending",
    },
    {
      projectId: projects[0]!.id,
      userId: user4.id,
      amount: "44000",
      proposal: "Experienced mobile and web developer. I can build this with Flutter web + Firebase for a scalable solution.",
      timeline: "7 weeks",
      status: "Pending",
    },
    {
      projectId: projects[1]!.id,
      userId: user2.id,
      amount: "18500",
      proposal: "UI/UX design is my core expertise. I will deliver high-fidelity Figma prototypes with a complete design system.",
      timeline: "3 weeks",
      status: "Accepted",
    },
    {
      projectId: projects[2]!.id,
      userId: user3.id,
      amount: "14000",
      proposal: "Content writing and SEO expert. I will deliver all 30 articles with keyword research report and plagiarism-free guarantee.",
      timeline: "4 weeks",
      status: "Accepted",
    },
    {
      projectId: projects[3]!.id,
      userId: user4.id,
      amount: "55000",
      proposal: "Flutter developer with 4 published fitness apps. I will build exactly what you need with smooth animations and offline support.",
      timeline: "8 weeks",
      status: "Pending",
    },
    {
      projectId: projects[4]!.id,
      userId: user5.id,
      amount: "32000",
      proposal: "Data analyst with expertise in Python and Dash. I will build an interactive dashboard with real-time data and 15+ chart types.",
      timeline: "5 weeks",
      status: "Accepted",
    },
    {
      projectId: projects[6]!.id,
      userId: user1.id,
      amount: "11000",
      proposal: "I have built 10+ WordPress sites for NGOs and non-profits. Will include all requested features plus a donation page with analytics.",
      timeline: "3 weeks",
      status: "Pending",
    },
    {
      projectId: projects[8]!.id,
      userId: user1.id,
      amount: "38000",
      proposal: "API development is my specialty. Will build a clean, documented RESTful API with Swagger docs, rate limiting, and complete test coverage.",
      timeline: "6 weeks",
      status: "Accepted",
    },
    {
      projectId: projects[9]!.id,
      userId: user5.id,
      amount: "50000",
      proposal: "ML specialist with experience in sales prediction models. Will use XGBoost + LSTM ensemble for best accuracy. Complete with monitoring dashboard.",
      timeline: "10 weeks",
      status: "Pending",
    },
    {
      projectId: projects[7]!.id,
      userId: user3.id,
      amount: "7500",
      proposal: "Social media content is my specialty. Will create engaging, brand-consistent content with hashtag research and scheduled posting guide.",
      timeline: "2 weeks",
      status: "Pending",
    },
  ]).returning();

  console.log("Bids created:", bids.length);

  // Insert Submissions
  const submissions = await db.insert(submissionsTable).values([
    {
      projectId: projects[4]!.id,
      userId: user5.id,
      fileUrl: "https://drive.google.com/file/d/analytics_dashboard_v1.zip",
      fileDescription: "Complete analytics dashboard with 15 charts, real-time data feed, and export functionality.",
      notes: "Deployed and tested. PostgreSQL queries optimized with indexes. Readme included.",
      status: "Pending",
    },
    {
      projectId: projects[5]!.id,
      userId: user2.id,
      fileUrl: "https://drive.google.com/file/d/brand_identity_final.zip",
      fileDescription: "Complete brand identity package: logo (SVG, PNG, EPS), color palette, typography guide, business card, letterhead, and social media kit.",
      notes: "All files delivered in editable formats. Brand guidelines PDF included.",
      status: "Approved",
      adminNotes: "Excellent work! Forwarded to client. Client is very happy.",
    },
  ]).returning();

  console.log("Submissions created:", submissions.length);

  console.log("\n=== SEED COMPLETE ===");
  console.log("Login credentials:");
  console.log("Admin 1: admin1@youtilleyes.com / Admin@123");
  console.log("Admin 2: admin2@youtilleyes.com / Admin@123");
  console.log("Client 1: client1@example.com / Client@123");
  console.log("Client 2: client2@example.com / Client@123");
  console.log("User 1: user1@example.com / User@123");
  console.log("User 2: user2@example.com / User@123");
  process.exit(0);
}

seed().catch(err => {
  console.error("Seed error:", err);
  process.exit(1);
});

# Workspace

## Overview

**YouTillEyes** — A B2B talent marketplace platform connecting clients (who post projects) with users (freelancers who bid and submit work), moderated by admins. Tagline: "Where Talent Meets Opportunity."

Headquarters: Uttar Pradesh, India | Support: +91 7084424242

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS + Shadcn UI
- **Auth**: JWT-based (custom HMAC-SHA256 tokens stored as `youtilleyes_token` in localStorage; `setAuthTokenGetter` wired in AuthContext.tsx so all API client hooks send the token automatically)
- **Brand Colors**: Navy Blue (#1A428A), Sunset Orange (#F58220)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── api-server/         # Express API server (all routes)
│   └── youtilleyes/        # React + Vite frontend
├── lib/
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/
│   └── src/seed.ts         # Database seed script
```

## Database Schema

- **users** — id, name, email, password (hashed), role (ADMIN/CLIENT/USER), phone, bio, skills, avatarUrl, isActive, timestamps
- **projects** — id, title, description, category, budget, deadline, status (Open/Assigned/In-Progress/Submitted/Completed), clientId, assignedUserId, timestamps
- **bids** — id, projectId, userId, amount, proposal, timeline, status (Pending/Accepted/Rejected), timestamps
- **submissions** — id, projectId, userId, fileUrl, fileDescription, notes, status (Pending/Approved/Forwarded/Rejected), adminNotes, timestamps
- **wallet_balances** — id, userId (unique), balance, totalEarned, updatedAt
- **withdrawal_requests** — id, userId, amount, bankName, accountNumber, ifscCode, accountHolder, upiId, status (pending/approved/rejected), adminNote, timestamps

## User Roles

- **ADMIN**: Full access — moderate projects, see all bids/amounts, assign projects to users, review and forward submissions to clients
- **CLIENT**: Post projects, view bids received, track project progress, receive final submissions
- **USER**: Browse open projects, submit bids, work on assigned projects, submit deliverables to admin

## API Routes

All routes served under `/api`:
- `/auth` — login, register, /me, logout
- `/users` — list users (admin only), get by id
- `/projects` — CRUD, assign, client/mine, user/assigned
- `/bids` — CRUD, user/mine, project/:projectId
- `/submissions` — CRUD, user/mine, project/:projectId
- `/dashboard/admin|client|user` — role-specific summaries
- `/dashboard/activity` — recent platform activity feed
- `/wallet` — GET user wallet balance; POST /withdraw; GET /admin/all; GET /admin/withdrawals; PATCH /admin/withdrawals/:id; POST /admin/credit

## Seed Data (Test Accounts)

| Role   | Email                      | Password    |
|--------|----------------------------|-------------|
| Admin  | admin1@youtilleyes.com     | Admin@123   |
| Admin  | admin2@youtilleyes.com     | Admin@123   |
| Client | client1@example.com        | Client@123  |
| Client | client2@example.com        | Client@123  |
| Client | client3@example.com        | Client@123  |
| Client | client4@example.com        | Client@123  |
| Client | client5@example.com        | Client@123  |
| User   | user1@example.com          | User@123    |
| User   | user2@example.com          | User@123    |
| User   | user3@example.com          | User@123    |
| User   | user4@example.com          | User@123    |
| User   | user5@example.com          | User@123    |

## Scripts

- `pnpm --filter @workspace/scripts run seed` — Seed database with demo data
- `pnpm --filter @workspace/db run push` — Push schema changes to DB
- `pnpm --filter @workspace/api-spec run codegen` — Regenerate API hooks from OpenAPI spec

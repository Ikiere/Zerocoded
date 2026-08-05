# Zerocoded — Deployment Guide

## Overview

This project is structured as a monorepo with two independent deployments:

- **Frontend** → Vercel (Static SPA)
- **Backend** → Vercel (Serverless Functions)

---

## Prerequisites

- Node.js 20+
- Vercel CLI (`npm i -g vercel`)
- A Supabase account and project
- An SMTP provider (Gmail App Password or SendGrid)

---

## 1. Supabase Setup

Create the following tables in your Supabase dashboard:

### contact_submissions
```sql
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  project_type text not null,
  message text not null,
  ip_address text,
  created_at timestamptz default now()
);
```

### quote_requests
```sql
create table quote_requests (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  company text not null,
  email text not null,
  phone text not null,
  budget text not null,
  project_type text not null,
  timeline text not null,
  description text not null,
  ip_address text,
  created_at timestamptz default now()
);
```

### newsletter_subscribers
```sql
create table newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  subscribed_at timestamptz default now(),
  ip_address text
);
```

---

## 2. Backend Deployment

```bash
cd backend

# Install dependencies
npm install

# Copy and fill environment variables
cp .env.example .env

# Deploy to Vercel
vercel --prod
```

Set all environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## 3. Frontend Deployment

```bash
cd frontend

# Install dependencies
npm install

# Copy and fill environment variables
cp .env.example .env.local
# Set VITE_API_URL to your backend Vercel URL

# Deploy to Vercel
vercel --prod
```

---

## 4. Local Development

```bash
# Terminal 1 — Frontend
cd frontend && npm run dev

# Terminal 2 — Backend (optional, for local API testing)
cd backend && npm run dev
```

The frontend Vite dev server proxies `/api/*` to `http://localhost:3001`.

---

## 5. Build Verification

```bash
# Frontend
cd frontend && npm run build   # Should produce no TypeScript errors

# Backend
cd backend && npm run type-check
```

---

## Environment Variables Summary

See `backend/.env.example` and `frontend/.env.example` for all required variables.

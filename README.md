# Zerocoded — Premium Digital Product Agency Website

A complete, production-ready full-stack website for Zerocoded — a premium software development agency.

## Tech Stack

### Frontend
- **React 19** + **Vite** + **TypeScript**
- **Tailwind CSS** — design system
- **Framer Motion** — animations
- **React Router v6** — routing
- **React Hook Form** + **Zod** — forms & validation
- **Axios** — HTTP client
- **React Helmet Async** — SEO
- **Lucide Icons**

### Backend
- **Node.js** + **Express** + **TypeScript**
- **Supabase PostgreSQL** — database
- **Nodemailer** — email notifications
- **Helmet** + **CORS** + **Rate Limiting** — security
- **Zod** + **express-validator** — validation

### Deployment
- **Frontend** → Vercel (SPA)
- **Backend** → Vercel (Serverless Functions)

## Project Structure

```
Zerocoded/
├── frontend/          # React 19 + Vite + TypeScript
├── backend/           # Node.js + Express serverless API
├── shared/            # Shared types & Zod schemas
├── docs/              # Deployment & env docs
└── vercel.json        # Monorepo config
```

## Pages

| Page | URL |
|------|-----|
| Home | `/` |
| About | `/about` |
| Portfolio | `/work` |
| Blog List | `/blog` |
| Blog Post | `/blog/:slug` |
| Contact | `/contact` |
| Website Design | `/services/website-design` |
| Web Apps | `/services/web-apps` |
| Mobile Apps | `/services/mobile-apps` |
| UI/UX Design | `/services/ui-ux` |
| Branding | `/services/branding` |
| E-Commerce | `/services/ecommerce` |
| API Development | `/services/api-development` |
| AI Solutions | `/services/ai-solutions` |

## Getting Started

```bash
# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd backend && npm install

# Copy env files
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env

# Run development server
cd frontend && npm run dev
```

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for full deployment instructions.

## Security Features

- Helmet HTTP security headers
- CORS whitelist
- Rate limiting per endpoint
- Zod + express-validator double validation
- XSS sanitization
- No secrets in frontend
- Safe error messages (no stack traces in production)

## License

© 2026 Zerocoded. All rights reserved.

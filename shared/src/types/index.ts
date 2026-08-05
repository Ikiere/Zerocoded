// Shared TypeScript types used by both frontend and backend

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export interface QuoteFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  budget: string;
  projectType: string;
  timeline: string;
  description: string;
  consentGiven: boolean;
  attachment?: File | null;
}

export interface NewsletterFormData {
  email: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: Author;
  publishedAt: string;
  readTime: number;
  coverImage: string;
  tags: string[];
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'website' | 'web-app' | 'mobile-app' | 'e-commerce';
  coverImage: string;
  images: string[];
  technologies: string[];
  client: string;
  year: number;
  featured: boolean;
  liveUrl?: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  deliverables: string[];
}

export type ProjectCategory = 'all' | 'website' | 'web-app' | 'mobile-app' | 'e-commerce';

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

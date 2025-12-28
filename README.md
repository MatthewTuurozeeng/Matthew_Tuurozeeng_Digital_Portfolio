# Personal Professional Platform  
*A Scalable Full-Stack Portfolio with Custom Content Management Dashboard*

---

## Overview
This project is a **full-stack personal professional platform** designed to serve as my long-term digital identity as a Computer Science professional.

Unlike a static portfolio website, this platform includes:
- A **public-facing professional website**
- A **secure custom-built admin dashboard**
- A **backend REST API**
- A **media management system** for images, videos, and documents

The platform allows dynamic content management (projects, fellowships, CVs, principles, media) without modifying frontend code, making it scalable as my career progresses.

---

## Project Goals
- Build a **professional-grade portfolio platform**
- Allow content management through a **private admin dashboard**
- Support **media uploads** (images, videos, PDFs, documents)
- Ensure **scalability, security, and maintainability**
- Demonstrate **full-stack software engineering skills**

---

## System Architecture
- Admin Dashboard (React)
- Backend API (Node.js + Express)
- PostgreSQL Database (Prisma ORM)
- Media Storage (Cloudinary)
- Public Frontend (Next.js)


---

## Core Features

### Public Website
- Professional landing page
- About ,  principles and LinkedIn profile link
- Projects with rich media
- Fellowships & social impact
- Downloadable CV
- Contact form

### Admin Dashboard
- Secure admin login (JWT authentication)
- Create, update, delete content (CRUD)
- Upload and manage media files
- Publish / unpublish content
- Manage CV versions

### Backend API
- Authentication & authorization
- RESTful content APIs
- Media upload handling
- Secure environment configuration

---

## Tech Stack

### Frontend (Public Website)
- **Next.js (React)** – SEO-friendly, fast, scalable frontend
- **TypeScript** – Type safety and maintainability
- **Tailwind CSS** – Clean and consistent UI styling

### Admin Dashboard
- **React (TypeScript)** – Component-based UI
- **JWT Authentication** – Secure access control
- **Fetch API** – Backend communication

### Backend
- **Node.js** – Non-blocking runtime environment
- **Express.js** – REST API framework
- **TypeScript** – Safer backend development
- **JWT** – Authentication & authorization
- **bcrypt** – Password hashing

### Database
- **PostgreSQL** – Relational database
- **Prisma ORM** – Type-safe database access and migrations

### Media & File Storage
- **Cloudinary** – Image and video hosting
- **AWS S3** – Document and file storage

### Deployment
- **Vercel** – Frontend hosting
- **Railway / Render** – Backend & database hosting
- **GitHub** – Version control

---

## Project Structure
frontend/ 
    public/              
    pages/               
    components/            
    services/            
    styles/               
    utils/                 
    types/                 # TypeScript interfaces & types
    hooks/                 # Custom React hooks
    context/               # React context (state management)
next.config.js         # Next.js configuration
tailwind.config.js     # Tailwind CSS configuration
tsconfig.json          # TypeScript configuration
package.json
admin-dashboard/ 
backend/ # Express API & database logic
    src/
        controllers/ # Request handlers
        routes/ # API routes
        middleware/ # Auth & security middleware
        services/ # Business logic
        prisma/ # Prisma schema & migrations
        utils/ # Helper utilities
        server.ts
    .env
    package.json
docs/ # Documentation and diagrams
README.md
.gitignore


---


---

## Security Considerations
- Password hashing using bcrypt
- JWT-based authentication
- Protected admin routes
- Environment variable protection
- File upload validation

---







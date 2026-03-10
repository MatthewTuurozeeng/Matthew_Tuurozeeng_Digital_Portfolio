# Personal Professional Porfolio  
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
```text
├── README.md
├── backend
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── config
│   │   │   ├── cloudinary.ts
│   │   │   └── database.ts
│   │   ├── controllers
│   │   │   ├── AuthController.ts
│   │   │   ├── CVcontroller.ts
│   │   │   ├── ContactController.ts
│   │   │   ├── ImpactController.ts
│   │   │   ├── ProfileController.ts
│   │   │   └── ProjectController.ts
│   │   ├── middleware
│   │   │   ├── Auth.ts
│   │   │   ├── ErrorHandler.ts
│   │   │   └── Upload.ts
│   │   ├── models
│   │   │   ├── CV.ts
│   │   │   ├── Contact.ts
│   │   │   ├── Impact.ts
│   │   │   ├── Profile.ts
│   │   │   ├── Project.ts
│   │   │   └── User.ts
│   │   ├── routes
│   │   │   ├── AuthRoute.ts
│   │   │   ├── CVroute.ts
│   │   │   ├── ContactRoute.ts
│   │   │   ├── ImpactRoute.ts
│   │   │   ├── ProfileRoute.ts
│   │   │   ├── ProjectRoute.ts
│   │   │   └── UploadRoute.ts
│   │   ├── scripts
│   │   │   └── SeedData.ts
│   │   ├── server.ts
│   │   ├── uploads
│   │   │   └── porfolio_project_image.png
│   │   └── utils
│   │       ├── EmailService.ts
│   │       ├── SeedAdmin.ts
│   │       ├── seedData.ts
│   │       └── testEmail.ts
│   └── tsconfig.json
└── frontend
    ├── README.md
    ├── eslint.config.ts
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── assets
    │   │   ├── images
    │   │   │   ├── backgroundImage
    │   │   │   │   ├── Hero-Imag.svg
    │   │   │   │   ├── hero-image.svg
    │   │   │   │   └── hero_im.jpeg
    │   │   │   ├── impactImages
    │   │   │   ├── profileImage
    │   │   │   │   └── profile-photo.jpg
    │   │   │   └── projectImages
    │   │   │       ├── Personal_Portfolio.png
    │   │   │       └── School_Website.png
    │   │   └── videos
    │   ├── documents
    │   │   └── Matthew_Tuurozeeng_Resume.pdf
    │   └── favicon.ico
    ├── src
    │   ├── App.tsx
    │   ├── components
    │   │   ├── Footer.tsx
    │   │   ├── ImageGallery.tsx
    │   │   ├── ImageWithFallback.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── ProjectCard.tsx
    │   │   ├── VideoPlayer.tsx
    │   │   └── admin
    │   │       ├── CVForm.tsx
    │   │       ├── DashboardCard.tsx
    │   │       ├── FileUpload.tsx
    │   │       ├── ImpactForm.tsx
    │   │       ├── ProfileForm.tsx
    │   │       ├── ProjectForm.tsx
    │   │       └── Sidebar.tsx
    │   ├── constants
    │   │   └── media.ts
    │   ├── context
    │   │   └── AuthContext.tsx
    │   ├── index.css
    │   ├── main.tsx
    │   ├── pages
    │   │   ├── About.tsx
    │   │   ├── CV.tsx
    │   │   ├── Contact.tsx
    │   │   ├── Home.tsx
    │   │   ├── Impact.tsx
    │   │   ├── Projects.tsx
    │   │   └── admin
    │   │       ├── Dashboard.tsx
    │   │       ├── Login.tsx
    │   │       ├── ManageCV.tsx
    │   │       ├── ManageContacts.tsx
    │   │       ├── ManageImpact.tsx
    │   │       ├── ManageProfile.tsx
    │   │       └── ManageProjects.tsx
    │   ├── routes
    │   │   └── AppRoutes.tsx
    │   ├── services
    │   │   ├── AdminApi.ts
    │   │   └── api.ts
    │   ├── styles
    │   │   └── cv.css
    │   ├── utils
    │   │   └── ProtectedRoutes.tsx
    │   └── vite-env.d.ts
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.js
```

---


---

## Security Considerations
- Password hashing using bcrypt
- JWT-based authentication
- Protected admin routes
- Environment variable protection
- File upload validation

---







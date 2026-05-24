import {
    Layout,
    Smartphone,
    Palette,
    Code,
    Search,
    PenTool,
    Rocket,
    Monitor,
    Cpu,
    Database,
    Wrench,
    Instagram,
    Twitter,
    Linkedin,
    Github,
    Globe,
    Award,
    Briefcase,
    Music
} from 'lucide-react';

export const contactHelpOptions = [
    'Job Opportunity',
    'Collaboration',
    'Full-stack web app',
    'Frontend / UI work',
    'Backend & APIs',
    'Performance audit',
    'Maintenance & retainer',
    'Something else',
];

export const faqData = [
    {
        q: "What services do you offer?",
        a: "I work on full-stack web applications including frontend (React, Next.js, TypeScript), backend (Node.js, .NET, REST APIs), database design (MongoDB, PostgreSQL, Redis), DevOps, and ongoing maintenance."
    },
    {
        q: "How long does a typical project take?",
        a: "Anywhere from 2 weeks for a focused prototype to 3+ months for a full product build. I'll always give a clear estimate after a short scoping call."
    },
    {
        q: "Do you work with startups and small businesses?",
        a: "Yes — most of my clients are early-stage teams and indie founders. I love working with people who care about shipping quickly and iteratively."
    },
    {
        q: "What makes your work different?",
        a: "Senior-level rigour at an indie price: clear communication, fast turnaround, no surprise scope creep, and code that's clean enough that your next dev will thank me."
    },
    {
        q: "Do you provide ongoing support and maintenance?",
        a: "Absolutely. I offer monthly retainers for ongoing maintenance, performance work, and feature additions after launch."
    }
];

export const profileData = {
    fullName: 'Mohan Maali',
    location: 'Indore MP, India',
    email: 'mohanmaali144@gmail.com',
    resume: '/resume.pdf',
    whatsapp: {
        phoneNumber: '919329094633',
        defaultMessage: 'Hi Mohan, I just saw your portfolio and would love to discuss a project with you!'
    },
    socialLinks: [
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/mohan-maali', icon: Linkedin },
        { name: 'GitHub', href: 'https://github.com/mohanmaali144', icon: Github },
        { name: 'Instagram', href: 'https://www.instagram.com/____mohan__maali____?igsh=YndnYjllbG83cWp0', icon: Instagram },
        { name: 'Twitter', href: 'https://x.com/Mohan_oon', icon: Twitter }
    ],
    image: "/image2.jpg"
};

export const heroRoles = [
    "MERN Stack Developer",
    "Full-Stack Engineer",
    "API Architect",
    // "Problem Solver"
];

export const servicesData = [
    {
        title: "Full-Stack Development",
        desc: "Building scalable full-stack applications using Next.js, NestJS, Node.js, and MongoDB.",
        icon: Code,
        tags: ["Next.js", "NestJS", "Node.js", "MongoDB"]
    },
    {
        title: "REST API Design",
        desc: "Designing and integrating robust REST APIs that connect frontend and backend seamlessly.",
        icon: Cpu,
        tags: ["Express", "NestJS", "Swagger", "Postman"]
    },
    {
        title: "Web Applications",
        desc: "Developing and maintaining client-facing web applications with clean, maintainable code.",
        icon: Monitor,
        tags: ["React", "Vite", "Tailwind", "TypeScript"]
    },
    {
        title: "UI & Design",
        desc: "Crafting user-friendly interfaces with Figma and translating them into responsive frontends.",
        icon: Palette,
        tags: ["Figma", "Tailwind", "Framer Motion"]
    }
];

export const processStepsData = [
    {
        number: "01",
        title: "Discovery",
        desc: "Understanding client requirements and translating business needs into clear technical solutions.",
        icon: Search
    },
    {
        number: "02",
        title: "Design",
        desc: "Crafting UI wireframes and system architecture aligned with project goals and user needs.",
        icon: PenTool
    },
    {
        number: "03",
        title: "Development",
        desc: "Building full-stack applications with Next.js, NestJS, and MongoDB using clean, scalable code.",
        icon: Code
    },
    {
        number: "04",
        title: "Launch",
        desc: "Debugging, testing, and deploying to production while ensuring stability and performance.",
        icon: Rocket
    }
];

export const techGroupsData = [
    {
        title: "Frontend",
        icon: Monitor,
        tag: "UI/UX",
        skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "Tailwind CSS", "Redux", "Framer Motion"]
    },
    {
        title: "Backend",
        icon: Cpu,
        tag: "SERVER",
        skills: ["Node.js", "Express", "NestJS", "REST APIs", "GraphQL", "Socket.io", ".NET", "C#", "EF Core"]
    },
    {
        title: "Database",
        icon: Database,
        tag: "DATA",
        skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Mongoose", "Prisma", "SQL Server"]
    },
    {
        title: "Tools & DevOps",
        icon: Wrench,
        tag: "DEVOPS",
        skills: ["Git", "GitHub", "Docker", "Vercel", "AWS", "GitHub Actions", "Postman", "Figma"]
    }
];

export const projectsData = [
    {
        id: 1,
        title: "BES Price Calculator",
        category: "Stock Management System",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        description: "A stock management system that helps businesses manage products, track stock levels, and calculate prices automatically based on stock data. Includes an admin dashboard for monitoring stock, generating reports, and updating records in real time.",
        tags: ["Next.js", "NestJS", "MongoDB", "Node.js"],
        link: "#",
        github: "https://github.com/Mohanmaali144"
    },
    {
        id: 2,
        title: "CARMUCHO",
        category: "Car Rental Platform",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
        description: "An online platform where users can list their cars for rent, and others can browse and book them based on preferences. Features real-time chat for communication between car owners and renters, as well as a secure payment system for transactions.",
        tags: ["React.js", "Next.js", "Node.js", "NestJS", "MongoDB"],
        link: "#",
        github: "https://github.com/Mohanmaali144"
    },
    {
        id: 3,
        title: "CodeFlow CMS",
        category: "Headless CMS Platform",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
        description: "A modular headless CMS built with role-based access control. Includes dynamic content types, media upload system, JWT authentication with refresh tokens, caching with Redis, and reusable common modules for multi-project usage.",
        tags: ["Next.js", "NestJS", "MongoDB", "Redis", "JWT"],
        link: "#",
        github: "https://github.com/Mohanmaali144"
    },
    {
        id: 4,
        title: "Real-Time Help Request Platform",
        category: "Community Assistance Platform",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",
        description: "A platform where users can post help requests and others can apply to provide assistance. Includes real-time notifications using WebSockets, application tracking system, and role-based dashboards.",
        tags: ["Next.js", "NestJS", "Socket.io", "MongoDB"],
        link: "#",
        github: "https://github.com/Mohanmaali144"
    },
    {
        id: 5,
        title: "Scrapify Marketplace",
        category: "Second-Hand Marketplace",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=2070&auto=format&fit=crop",
        description: "A marketplace for selling scrap materials and second-hand products. Includes admin approval workflow, pickup scheduling, payment integration, driver management system, and order lifecycle tracking.",
        tags: ["Next.js", "NestJS", "MongoDB", "Stripe API"],
        link: "#",
        github: "https://github.com/Mohanmaali144"
    },
    {
        id: 6,
        title: "Salon Appointment Booking System",
        category: "Service Scheduling Platform",
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2070&auto=format&fit=crop",
        description: "A full-stack appointment booking system where customers can schedule services based on staff availability. Features include time-slot management, conflict prevention logic, admin/staff dashboards, automated booking status updates, and secure online payments.",
        tags: ["Next.js", "NestJS", "MongoDB", "JWT", "Payment Gateway"],
        link: "#",
        github: "https://github.com/Mohanmaali144"
    }
];
export const resumeExperiencesData = [
    {
        company: "IBR Infotech",
        role: "MERN Stack Developer",
        period: "August 2025 — Present",
        location: "India",
        type: "Full-time",
        achievements: [
            "Collaborating with cross-functional teams to understand client requirements",
            "Translating business needs into technical solutions using MERN stack",
            "Developing and maintaining client-facing web applications",
            "Participating in code reviews and improving code quality",
            "Debugging and resolving issues in live client projects"
        ],
        technologies: ["Next.js", "Node.js", "MongoDB", "React.js" ,"N8N",]
    },
    {
        company: "Foduu",
        role: "MERN Stack Developer",
        period: "July 2024 — August 2025",
        location: "India",
        type: "Full-time",
        achievements: [
            "Developed full-stack web applications using Next.js, NestJS, and MongoDB",
            "Designed REST APIs and integrated frontend with backend services",
            "Worked on database modeling, authentication, and performance improvements",
            "Implemented new features based on client and business requirements",
            "Debugged production issues and improved application stability"
        ],
        technologies: ["Next.js", "NestJS", "MongoDB", "Express.js", "Redis"]
    }
];

export const resumeEducationData = [
    {
        school: "Harda Adarsh College, Barkatullah University",
        degree: "Bachelor of Computer Application (BCA)",
        period: "2024 — 2027",
        location: "Bhopal, India",
        type: "Bachelor's Degree",
        achievements: [
            "Currently pursuing BCA with focus on full-stack development",
            "Actively working on real-world client projects alongside studies",
            "Building expertise in MERN stack technologies"
        ],
        coursework: ["Data Structures", "Web Development", "Database Systems", "Software Engineering"]
    },
    {
        school: "Government Hr. Sec. School, Vikrampur",
        degree: "Higher Secondary Certificate (Biology Stream)",
        period: "2022",
        location: "Vikrampur, India",
        type: "Higher Secondary",
        achievements: [
            "Scored 62% in HSC examinations",
            "Biology stream with strong analytical foundation"
        ],
        coursework: ["Biology", "Chemistry", "Physics", "Mathematics"]
    }
];

export const trustBarBuildTypesData = [
    { name: "Startups", desc: "MVPs" },
    { name: "SaaS", desc: "Platforms" },
    { name: "Admin Dashboard", desc: "Panels" },
    { name: "E-commerce", desc: "Stores" },
    { name: "Fintech", desc: "Products" },
    { name: "Healthcare", desc: "Apps" },
    { name: "REST APIs", desc: "Backend" },
    { name: "Portfolios", desc: "Personal" }
];
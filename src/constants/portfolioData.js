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

export const aboutBentoData = [
    {
        id: 'location',
        label: 'Base',
        title: 'Madhya Pradesh, India',
        description: 'Working with clients and teams on full-stack MERN applications from my focused workstation.',
        status: { available: true, text: 'Available for new opportunities' },
        icon: Globe,
        className: 'md:col-span-2 md:row-span-2 bg-white rounded-[3rem] p-10 flex flex-col justify-between hover:shadow-lg transition-all duration-500 group relative overflow-hidden border border-zinc-100',
        animation: { initial: { opacity: 0, x: -50 }, transition: { duration: 0.7 } }
    },
    {
        id: 'experience',
        label: 'Years of Craft',
        value: '01+',
        icon: Award,
        className: 'bg-zinc-900 rounded-[3rem] p-8 flex flex-col justify-center items-center text-center gap-2 group hover:scale-[1.02] transition-transform duration-500',
        animation: { initial: { opacity: 0, scale: 0.8 }, transition: { duration: 0.6, delay: 0.2 } }
    },
    {
        id: 'projects',
        label: 'Projects Shipped',
        value: '10+',
        icon: Briefcase,
        className: 'bg-[#EBEBEB] rounded-[3rem] p-8 flex flex-col justify-center items-center text-center gap-2 group hover:bg-white hover:shadow-lg transition-all duration-500',
        animation: { initial: { opacity: 0, scale: 0.8 }, transition: { duration: 0.6, delay: 0.3 } }
    },
    {
        id: 'music',
        label: 'On Rotation',
        title: 'Blinding Lights — The Weeknd',
        subtitle: 'Playlist: Late Night Coding',
        icon: Music,
        className: 'bg-[#F8F8F8] rounded-[3.5rem] p-8 flex items-center gap-6 group hover:bg-white hover:shadow-lg transition-all duration-500',
        animation: { initial: { opacity: 0, y: 50 }, transition: { duration: 0.7, delay: 0.4 } }
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
        { name: 'LinkedIn', href: 'https://linkedin.com/in/mohan-maali', icon: Linkedin },
        { name: 'GitHub', href: 'https://github.com/Mohanmaali144', icon: Github },
        { name: 'Instagram', href: '#', icon: Instagram },
        { name: 'Twitter', href: '#', icon: Twitter }
    ],
    image : "/public/Image2.jpg"
};

export const heroRoles = [
    "MERN Stack Developer",
    "Full-Stack Engineer",
    "API Architect",
    // "Problem Solver"
];

export const servicesData = [
    { title: "Full-Stack Development", desc: "Building scalable full-stack applications using Next.js, NestJS, Node.js, and MongoDB.", icon: Code },
    { title: "REST API Design", desc: "Designing and integrating robust REST APIs that connect frontend and backend seamlessly.", icon: Cpu },
    { title: "Web Applications", desc: "Developing and maintaining client-facing web applications with clean, maintainable code.", icon: Monitor },
    { title: "UI & Design", desc: "Crafting user-friendly interfaces with Figma and translating them into responsive frontends.", icon: Palette }
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
        title: "FRONTEND",
        icon: Monitor,
        tag: "UI/UX",
        skills: ["React.js / Next.js", "JavaScript", "Figma / Canva"]
    },
    {
        title: "BACKEND",
        icon: Cpu,
        tag: "SERVER",
        skills: ["Node.js / Express.js", "NestJS", "REST APIs"]
    },
    {
        title: "DATABASE",
        icon: Database,
        tag: "DATA",
        skills: ["MongoDB", "Redis", "MySQL / PostgreSQL"]
    },
    {
        title: "TOOLS",
        icon: Wrench,
        tag: "DEVOPS",
        skills: ["Git / GitHub", "PostMain", "Docker", "Jest / Mocha"]
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

export const experienceSummaryData = [
    {
        company: "IBR Infotech",
        role: "MERN Stack Developer",
        period: "August 2025 — Present",
        desc: "Collaborating with cross-functional teams to build and maintain client-facing web applications using the MERN stack."
    },
    {
        company: "Foduu",
        role: "MERN Stack Developer",
        period: "July 2024 — August 2025",
        desc: "Developed full-stack web applications, designed REST APIs, and improved application performance and stability."
    }
];

export const educationSummaryData = [
    {
        school: "Harda Adarsh College, Barkatullah University",
        degree: "Bachelor of Computer Application",
        period: "2024 — 2027",
        desc: "Pursuing BCA with hands-on experience in full-stack MERN development and scalable application architecture."
    },
    {
        school: "Government Hr. Sec. School, Vikrampur",
        degree: "Higher Secondary Certificate",
        period: "2022",
        desc: "Completed HSC in Biology stream, building an analytical and problem-solving foundation."
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
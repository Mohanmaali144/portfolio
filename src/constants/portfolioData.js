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
        title: 'Navi Mumbai, India',
        description: 'Working remotely with clients worldwide from my focused workstation.',
        status: { available: true, text: 'Available for new opportunities' },
        icon: Globe,
        className: 'md:col-span-2 md:row-span-2 bg-white rounded-[3rem] p-10 flex flex-col justify-between hover:shadow-lg transition-all duration-500 group relative overflow-hidden border border-zinc-100',
        animation: { initial: { opacity: 0, x: -50 }, transition: { duration: 0.7 } }
    },
    {
        id: 'experience',
        label: 'Years of Craft',
        value: '04+',
        icon: Award,
        className: 'bg-zinc-900 rounded-[3rem] p-8 flex flex-col justify-center items-center text-center gap-2 group hover:scale-[1.02] transition-transform duration-500',
        animation: { initial: { opacity: 0, scale: 0.8 }, transition: { duration: 0.6, delay: 0.2 } }
    },
    {
        id: 'projects',
        label: 'Projects Shipped',
        value: '50+',
        icon: Briefcase ,
        className: 'bg-[#EBEBEB] rounded-[3rem] p-8 flex flex-col justify-center items-center text-center gap-2 group hover:bg-white hover:shadow-lg transition-all duration-500',
        animation: { initial: { opacity: 0, scale: 0.8 }, transition: { duration: 0.6, delay: 0.3 } }
    },
    {
        id: 'music',
        label: 'On Rotation',
        title: 'After Hours — The Weeknd',
        subtitle: 'Playlist: Late Night Development',
        icon: Music,
        className: 'bg-[#F8F8F8] rounded-[3.5rem] p-8 flex items-center gap-6 group hover:bg-white hover:shadow-lg transition-all duration-500',
        animation: { initial: { opacity: 0, y: 50 }, transition: { duration: 0.7, delay: 0.4 } }
    }
];

export const profileData = {
    fullName: 'TEST USER',
    location: 'Navi Mumbai, India',
    email: 'hello@testuser.com',
    resume: '/resume.pdf',
    whatsapp: {
        phoneNumber: '911234567890',
        defaultMessage: 'Hi test, I just saw your portfolio and would love to discuss a project with you!'
    },
    socialLinks: [
        { name: 'LinkedIn', href: '#', icon: Linkedin },
        { name: 'GitHub', href: '#', icon: Github },
        { name: 'Instagram', href: '#', icon: Instagram },
        { name: 'Twitter', href: '#', icon: Twitter }
    ]
};

export const heroRoles = [
    "UI/UX Designer",
    "Frontend Developer",
    "Creative Thinker",
    "Problem Solver"
];

export const servicesData = [
    { title: "UX & UI", desc: "Designing interfaces that are intuitive, efficient, and enjoyable to use.", icon: Layout },
    { title: "Web & Mobile App", desc: "Transforming ideas into exceptional web and mobile app experiences.", icon: Smartphone },
    { title: "Design & Creative", desc: "Crafting visually stunning designs that connect with your audience.", icon: Palette },
    { title: "Development", desc: "Bringing your vision to life with the latest technology and design trends.", icon: Code }
];

export const processStepsData = [
    {
        number: "01",
        title: "Discovery",
        desc: "Deep diving into your goals, audience, and problem space to define a clear roadmap.",
        icon: Search
    },
    {
        number: "02",
        title: "Design",
        desc: "Crafting intuitive user experiences and high-fidelity visuals that align with your brand.",
        icon: PenTool
    },
    {
        number: "03",
        title: "Development",
        desc: "Bringing designs to life with clean, performant, and scalable code structures.",
        icon: Code
    },
    {
        number: "04",
        title: "Launch",
        desc: "Final testing, deployment, and optimization to ensure a successful product release.",
        icon: Rocket
    }
];

export const techGroupsData = [
    {
        title: "FRONTEND",
        icon: Monitor,
        tag: "UI/UX",
        skills: ["React / Next.js", "Tailwind / CSS", "TypeScript"]
    },
    {
        title: "BACKEND",
        icon: Cpu,
        tag: "SERVER",
        skills: ["Node.js / Express", "Auth Systems", "RESTful APIs"]
    },
    {
        title: "DATABASE",
        icon: Database,
        tag: "DATA",
        skills: ["MongoDB", "PostgreSQL", "Redis"]
    },
    {
        title: "TOOLS",
        icon: Wrench,
        tag: "DEVOPS",
        skills: ["Git / GitHub", "Docker / AWS", "Vercel / Postman"]
    }
];

export const projectsData = [
    {
        id: 1,
        title: "E-Commerce Mobile App",
        category: "Mobile App Design",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
        description: "A comprehensive e-commerce solution designed for modern mobile shoppers. Features include a streamlined checkout process, personalized product recommendations, and real-time order tracking.",
        tags: ["React Native", "Firebase", "Redux", "Tailwind CSS"],
        link: "#",
        github: "#"
    },
    {
        id: 2,
        title: "Fintech Dashboard",
        category: "Web Application",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        description: "A secure and intuitive dashboard for managing digital assets. It provides real-time market data, advanced charting tools, and seamless transaction management with multi-layer security.",
        tags: ["Next.js", "TypeScript", "Chart.js", "Node.js"],
        link: "#",
        github: "#"
    },
    {
        id: 3,
        title: "Health & Fitness Platform",
        category: "UX/UI Design",
        image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2085&auto=format&fit=crop",
        description: "An all-in-one health companion that tracks workouts, nutrition, and mental well-being. Built with a focus on user engagement and habit formation through gamified elements.",
        tags: ["Figma", "Design System", "User Research", "Prototyping"],
        link: "#",
        github: "#"
    },
    {
        id: 4,
        title: "Smart Home Control",
        category: "IoT Interface",
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop",
        description: "A centralized control hub for smart home devices. The interface is optimized for both speed and accessibility, allowing users to automate their routines with simple touch gestures.",
        tags: ["IoT Core", "AWS", "React", "Material-UI"],
        link: "#",
        github: "#"
    },
    {
        id: 5,
        title: "Travel Booking Flow",
        category: "Journey Mapping",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
        description: "A reimagined booking experience for global travelers. By simplifying complex data inputs into a conversational flow, we significantly increased booking conversion rates.",
        tags: ["User Experience", "Product Strategy", "Interaction Design"],
        link: "#",
        github: "#"
    }
];

export const resumeExperiencesData = [
    {
        company: "Pixel Agency",
        role: "Senior UI Designer",
        period: "2022 — Present",
        location: "San Francisco, CA",
        type: "Full-time",
        achievements: [
            "Led design system development for 5+ enterprise clients",
            "Improved user engagement by 40% through UX redesigns",
            "Managed team of 3 junior designers"
        ],
        technologies: ["Figma", "React", "Design Systems", "User Research"]
    },
    {
        company: "TechFlow",
        role: "Frontend Developer",
        period: "2020 — 2022",
        location: "New York, NY",
        type: "Full-time",
        achievements: [
            "Built 15+ responsive web applications",
            "Optimized performance reducing load time by 60%",
            "Collaborated with UX team on component libraries"
        ],
        technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
    },
    {
        company: "SoftWorks",
        role: "Junior Designer",
        period: "2018 — 2020",
        location: "Austin, TX",
        type: "Full-time",
        achievements: [
            "Designed mobile-first interfaces for 8+ projects",
            "Conducted user testing sessions",
            "Created brand guidelines for startups"
        ],
        technologies: ["Adobe XD", "Sketch", "CSS", "JavaScript"]
    }
];

export const resumeEducationData = [
    {
        school: "Design Institute",
        degree: "M.Sc. Interaction Design",
        period: "2018 — 2020",
        location: "San Francisco, CA",
        type: "Master's Degree",
        achievements: [
            "GPA: 3.9/4.0",
            "Teaching Assistant for UX Research course",
            "Published thesis on mobile interaction patterns"
        ],
        coursework: ["Advanced UX Research", "Interaction Design", "Prototyping", "Design Thinking"]
    },
    {
        school: "University of Tech",
        degree: "B.Sc. Computer Science",
        period: "2014 — 2018",
        location: "Boston, MA",
        type: "Bachelor's Degree",
        achievements: [
            "GPA: 3.7/4.0",
            "Dean's List for 6 semesters",
            "President of Design Club"
        ],
        coursework: ["Data Structures", "Web Development", "HCI", "Algorithms"]
    }
];

export const experienceSummaryData = [
    {
        company: "Pixel Agency",
        role: "Senior UI Designer",
        period: "2022 — Present",
        desc: "Leading the design system and mobile application workflows for global clients."
    },
    {
        company: "TechFlow",
        role: "Frontend Developer",
        period: "2020 — 2022",
        desc: "Developed high-performance React components and interactive user journeys."
    }
];

export const educationSummaryData = [
    {
        school: "Design Institute",
        degree: "Master of Interaction Design",
        period: "2018 — 2020",
        desc: "Specialized in user behavior research and advanced high-fidelity prototyping."
    },
    {
        school: "University of Tech",
        degree: "B.Sc. in Computer Science",
        period: "2014 — 2018",
        desc: "Foundational studies in algorithms, data structures, and software engineering."
    }
];

export const trustBarBuildTypesData = [
    { name: "Startups", desc: "MVPs" },
    { name: "SaaS", desc: "Platforms" },
    { name: "Admin Dashboard", desc: "Panels" },
    { name: "E-commerce", desc: "Stores" },
    { name: "Fintech", desc: "Products" },
    { name: "Healthcare", desc: "Apps" },
    { name: "Landing Pages", desc: "Conversion" },
    { name: "Portfolios", desc: "Personal" }
];

import { 
    Monitor, 
    Smartphone, 
    ShoppingCart, 
    Code2, 
    Search, 
    Share2, 
    Palette, 
    PenTool 
} from 'lucide-react';

export const servicesData = [
    { 
        id: "web-development", // ✅ Match with Backend pageId
        title: "Web Design & Development", 
        desc: "Custom, high-performance websites built with React & Node.js.",
        icon: <Monitor size={80} strokeWidth={1} />, 
        link: "/services/web-development",
        color: "blue"
    },
    { 
        id: "mobile-app", // ✅ Match with Backend pageId
        title: "Mobile App Development", 
        desc: "Native and cross-platform mobile apps for iOS and Android.",
        icon: <Smartphone size={80} strokeWidth={1} />,
        link: "/services/app-development",
        color: "purple"
    },
    { 
        id: "e-commerce", // ✅ Match with Backend pageId
        title: "E-Commerce Solutions", 
        desc: "Scalable online stores using Shopify or custom MERN stack.",
        icon: <ShoppingCart size={80} strokeWidth={1} />,
        link: "/services/e-commerce",
        color: "green"
    },
    { 
        id: "custom-software", // ✅ Match with Backend pageId
        title: "Custom Software Dev", 
        desc: "Tailor-made software solutions to automate business processes.",
        icon: <Code2 size={80} strokeWidth={1} />,
        link: "/services/custom-software",
        color: "indigo"
    },
    { 
        id: "seo", // ✅ Match with Backend pageId
        title: "SEO Services", 
        desc: "Data-driven strategies to rank your website #1 on Google.",
        icon: <Search size={80} strokeWidth={1} />,
        link: "/services/seo",
        color: "yellow"
    },
    { 
        id: "social-media", // ✅ Match with Backend pageId
        title: "Social Media Management", 
        desc: "Strategic content and campaigns to grow your brand presence.",
        icon: <Share2 size={80} strokeWidth={1} />,
        link: "/services/social-media",
        color: "pink"
    },
    { 
        id: "graphic-design", // ✅ Match with Backend pageId
        title: "Graphic Designing", 
        desc: "Visual identity, logos, and UI/UX designs that stand out.",
        icon: <Palette size={80} strokeWidth={1} />,
        link: "/services/graphic-design",
        color: "orange"
    },
    { 
        id: "content-writing", // ✅ Match with Backend pageId
        title: "Content Writing", 
        desc: "SEO-optimized blogs and copy that engage your audience.",
        icon: <PenTool size={80} strokeWidth={1} />,
        link: "/services/content-writing",
        color: "cyan"
    }
];
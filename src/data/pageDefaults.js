export const PAGE_DEFAULTS = {
    "content-writing": {
        heroTitle: 'Words That Rank.',
        heroSubtitle: 'Stories That Sell.',
        heroDescription: "We don't just fill pages with text. We craft strategic, SEO-optimized content that engages your audience and drives measurable conversions.",
        badgeText: 'Content Marketing',
        metaTitle: 'Content Writing Services | Canva Solutions',
        metaDescription: "We craft strategic, SEO-optimized content that engages audience.",
        metaKeywords: 'content writing, seo, copywriting',
        contentItems: [
            { title: "SEO Blog Writing", description: "Long-form articles backed by keyword research...", iconName: "Search" },
            { title: "Website Copywriting", description: "Persuasive landing page copy...", iconName: "LayoutGridIcon" },
            { title: "Technical Writing", description: "Clear, concise documentation...", iconName: "FileText" },
            { title: "Email Marketing Sequences", description: "High-converting drip campaigns...", iconName: "Mail" },
            { title: "Social Media Captions", description: "Engaging, on-brand captions...", iconName: "MessageSquare" },
            { title: "Brand Storytelling", description: "We define your unique Brand Voice...", iconName: "PenTool" }
        ],
        checklistTitle: "The \"Perfect Post\" Checklist",
        checklist: [
            "Keyword Research & Search Intent Analysis",
            "Competitor Content Gap Analysis",
            "Compelling Headlines (H1) & Hooks",
            "Scannable Formatting (H2, H3, Bullet Points)",
            "Internal & External Linking Strategy",
            "Final Polish (Grammar, Tone, Plagiarism Check)"
        ],
        reasonsTitle: "Why \"Generic\" Content Fails",
        reasons: [
            { title: "AI-Generated Fluff", description: "Google penalizes unoriginal, robotic content. We write for humans first." },
            { title: "Keyword Stuffing", description: "Jamming keywords hurts readability. We weave them in naturally." },
            { title: "Boring Tone", description: "If your content sounds like a textbook, people bounce. We inject personality." }
        ],
        faqs: [
            { question: "What does make content SEO-friendly?", answer: "This results in SEO-friendly content that is aligned with optimized keywords..." },
            { question: "What is content writing, and why should we care?", answer: "Content writing refers to creating original written content for articles, blogs..." }
        ]
    },
   // Is data ko PAGE_DEFAULTS object ke andar 'seo' key mein add karein
"seo": {
    badgeText: "Search Engine Optimization",
    heroTitle: "Dominate Search.",
    heroSubtitle: "Drive Traffic.",
    heroDescription: "Stop engaging in 'guessing games' with Google. We use data-driven strategies to rank your brand #1 for keywords that actually generate revenue.",
    metaTitle: "SEO Services | Dominate Search Rankings | Canva Solutions",
    metaDescription: "Professional SEO services to increase your organic traffic and revenue. Data-driven strategies for keyword dominance.",
    metaKeywords: "seo, search engine optimization, google ranking, digital marketing",

    // Level-2 dynamic text
    offeringsTitle: "The 360° SEO Ecosystem",
    offeringsSubtitle: "SEO isn't just about keywords. It's about technical health, user experience, and authority. We cover it all.",
    
    // Main Service Cards
    contentItems: [
        { title: "Comprehensive SEO Audits", description: "We dive deep into your site's architecture to find technical errors holding you back.", iconName: "Search" },
        { title: "Keyword Dominance", description: "We identify high-intent keywords that your customers are actually searching for.", iconName: "Target" },
        { title: "On-Page Optimization", description: "Optimizing meta tags, headers, and content to make your pages irresistible to Google.", iconName: "FileText" },
        { title: "Authority Link Building", description: "We secure high-quality backlinks from reputable industry websites to boost authority.", iconName: "LinkIcon" },
        { title: "Local SEO & GMB", description: "Dominate your local market and ensure you show up in the Google Map Pack.", iconName: "MapPin" },
        { title: "Technical SEO", description: "Fixing Core Web Vitals, schema markup, and mobile usability issues.", iconName: "Globe" }
    ],

    // Methodology / Checklist Section
    checklistTitle: "Our 4-Step Methodology",
    checklist: [
        "01. Audit & Discovery: Deep dive into site health and competitors.",
        "02. Strategy & Fixes: Repair technical issues and map out keywords.",
        "03. Content & Optimization: Create high-value content and optimize pages.",
        "04. Authority Building: Digital PR and outreach for powerful links."
    ],

    // Why Campaigns Fail (Reasons)
    reasonsTitle: "Why Most SEO Campaigns Fail",
    reasons: [
        { title: "Vanity Metrics", description: "Ranking for keywords that don't bring sales is useless. We focus on ROI." },
        { title: "Ignoring Technical Debt", description: "Great content won't rank on a slow, broken website. Fix the foundation first." },
        { title: "Black Hat Tactics", description: "Spammy links get you penalized. We use only sustainable, white-hat strategies." }
    ],

    faqs: [
        { question: "What is SEO and why?", answer: "SEO stands for Search Engine Optimization. It’s the act of optimizing a website to rank high..." },
        { question: "How quickly can one see the impact of SEO?", answer: "SEO is a long term strategy, but many notice tangible effects in 3-6 months." },
        { question: "What's the difference between SEO and paid ads?", answer: "SEO focuses on organic long-term growth, while paid ads provide short-term immediate visibility." },
        { question: "Can I do my own SEO?", answer: "Basic practices can be done in-house, but advanced audits and link building require expert skills." }
    ]
},
"e-commerce": {
    badgeText: "E-Commerce Solutions",
    heroTitle: "Turn Visitors Into",
    heroSubtitle: "Loyal Customers",
    heroDescription: "We build high-converting online stores that look stunning, load instantly, and drive massive sales growth. From startups to enterprise retailers.",
    
    metaTitle: "E-Commerce Website Development | Scale Your Online Store",
    metaDescription: "Professional e-commerce development services. We build high-converting Shopify, WooCommerce, and Custom MERN stores.",
    metaKeywords: "e-commerce development, shopify store builder, woocommerce, online shop development",

    // Offerings Grid
    offeringsTitle: "Complete E-Commerce Ecosystem",
    offeringsSubtitle: "We don't just build websites; we build complete sales engines. From inventory to checkout, we optimize every pixel.",
    contentItems: [
        { title: "Custom Storefront Design", description: "We design unique, brand-centric storefronts that guide visitors toward making a purchase.", iconName: "ShoppingCart" },
        { title: "Secure Payment Gateways", description: "Seamless integration with Stripe, PayPal, and global providers for secure transactions.", iconName: "CreditCard" },
        { title: "Inventory Management", description: "Automated real-time inventory tracking that syncs across multiple channels.", iconName: "Layers" },
        { title: "Mobile-First Optimization", description: "Ensuring your store offers a native-app-like experience on all mobile devices.", iconName: "Smartphone" },
        { title: "Analytics & Reporting", description: "Deep integration with GA4 to track sales, conversion rates, and behavior.", iconName: "BarChart3" },
        { title: "Advanced Security", description: "SSL, DDoS protection, and secure checkout to protect sensitive customer data.", iconName: "ShieldCheck" }
    ],

    // Why Standard Themes Fail (Reasons)
    reasonsTitle: "Why Standard Themes Fail",
    reasons: [
        { title: "Slow Loading Speeds", description: "Bloated code in standard themes kills your SEO and frustrates users." },
        { title: "Generic Design", description: "Your brand gets lost in a sea of look-alike stores. No differentiation." },
        { title: "Poor Mobile UX", description: "Clunky checkouts on mobile lead to 80% cart abandonment rates." }
    ],

    // Edge Section (Checklist)
    checklistTitle: "The Canva Solutions Edge",
    checklist: [
        "Sub-second Load Times",
        "Custom Conversion Funnels",
        "One-Click Checkout",
        "AI-Powered Product Recommendations",
        "24/7 Support & Maintenance"
    ],

    faqs: [
        { question: "What is e-commerce, and how does it work?", answer: "E-commerce is a buying and selling activity in the online world through websites or apps..." },
        { question: "What are the benefits of having an e-commerce shop?", answer: "An e-commerce store is available 24/7, reaches global audiences, and has less overhead." },
        { question: "How do I ensure my e-commerce website is secure?", answer: "Major steps include: SSL Certificate, Secure Payment gateways like PayPal, and regular updates." },
        { question: "How can I develop loyalty to my e-commerce store?", answer: "SEO, Social Media Marketing, Email Campaigns, and providing a great User Experience." }
    ]
},
"custom-software": {
    badgeText: "Enterprise Grade Solutions",
    heroTitle: "Software Built For",
    heroSubtitle: "Your Unique Needs.",
    heroDescription: "Off-the-shelf software forces you to change your business. We build custom software that changes to fit your business. Scalable, secure, and owned by you.",
  
    metaTitle: "Custom Software Development | Enterprise Solutions | Canva Solutions",
    metaDescription: "Tailor-made software solutions for your business. We build scalable ERP, CRM, and SaaS products with modern tech stacks.",
    metaKeywords: "custom software, erp development, crm solutions, saas development, enterprise software",

    // Section 3: Solving Complex Problems (Offerings)
    offeringsTitle: "Solving Complex Problems",
    offeringsSubtitle: "We don't just write code; we engineer solutions that streamline operations, reduce costs, and give you a competitive advantage.",
    contentItems: [
        { title: "Enterprise ERP & CRM", description: "We build custom Enterprise Resource Planning and Customer Relationship Management systems tailored to your specific internal workflows.", iconName: "Briefcase" },
        { title: "SaaS Product Development", description: "From MVP to full-scale launch. We help startups and enterprises build subscription-based software products that scale.", iconName: "Cloud" },
        { title: "Legacy System Migration", description: "Modernize your outdated software. We migrate data and logic from legacy systems to modern cloud architectures without downtime.", iconName: "Database" },
        { title: "API Development & Integration", description: "Connect your disparate systems. We build robust RESTful and GraphQL APIs to let your software talk to banks, maps, and 3rd party tools.", iconName: "Terminal" },
        { title: "Business Process Automation", description: "Stop doing manual data entry. We create scripts and bots to automate repetitive tasks, saving your team hundreds of hours.", iconName: "Settings" },
        { title: "Secure Fintech Solutions", description: "Bank-grade security software. We build financial tools compliant with GDPR, PCI-DSS, and other regulatory standards.", iconName: "Lock" }
    ],

    // ✅ Methodology data ab 'reasons' array mein jayega (Title aur Description ke saath)
    reasonsTitle: "SDLC Methodology",
    reasons: [
        { title: "Discovery & Specs", description: "We document every requirement, user role, and data flow before coding begins." },
        { title: "Architecture Design", description: "We choose the right database, server structure, and security protocols." },
        { title: "Agile Development", description: "Iterative sprints allow you to see progress and adjust features in real-time." },
        { title: "QA & Deployment", description: "Automated unit testing, load testing, and secure deployment to production." }
    ],

    // ✅ "Why Custom Software" points ab 'checklist' array mein jayenge
    checklistTitle: "Why Custom Software?",
    checklist: [
        "No monthly licensing fees (You own it)",
        "Perfect fit for your workflows",
        "Easier to integrate with existing tools",
        "Higher security than public SaaS",
        "Scales infinitely as you grow"
    ],

    faqs: [
        { question: "What sets Canva Solutions apart from the rest of software development firms?", answer: "We use our deep industry knowledge and strategic approach to generate innovative solutions that solve your business problems dramatically..." },
        { question: "What advantages come with selecting Canva Solutions as your custom software development partner?", answer: "At Canva Solutions, our teams understand the difference between completion and success..." },
        { question: "What software technologies will Canva Solutions use for my project?", answer: "Our highly skilled talent pool enables us to create custom software using the languages, platforms, and frameworks of your choice..." },
        { question: "How much would custom software development cost?", answer: "The price can be quite wide-reaching, but hiring a developer for your custom software development would likely fall between $25/hr and $150/hr." }
    ]
},
"graphic-design": {
    badgeText: "Visual Identity Experts",
    heroTitle: "Visuals That Speak.",
    heroSubtitle: "Designs That Convert.",
    heroDescription: "Good design is good business. We create stunning visuals that capture attention, communicate your message, and elevate your brand above the noise.",
    metaTitle: "Professional Graphic Design Services | Canva Solutions",
    metaDescription: "Elevate your brand with expert graphic design. We offer logo branding, UI/UX, social media graphics, and packaging design.",
    metaKeywords: "graphic design, logo design, ui ux design, branding agency, packaging design",

    // Offerings Grid
    offeringsTitle: "Design Solutions for Every Need",
    offeringsSubtitle: "Whether you're launching a new brand or refreshing an old one, we have the creative skills to bring your vision to life.",
    contentItems: [
        { title: "Logo & Branding", description: "Memorable logos and comprehensive brand style guides that define your business identity.", iconName: "Zap" },
        { title: "UI/UX Design", description: "Intuitive, user-centric interfaces for websites and mobile apps. We prototype in Figma.", iconName: "Monitor" },
        { title: "Social Media Graphics", description: "Scroll-stopping posts, banners, and stories for Instagram, LinkedIn, and Facebook.", iconName: "ImageIcon" },
        { title: "Marketing Collateral", description: "High-quality brochures, flyers, business cards, and pitch decks for your clients.", iconName: "Printer" },
        { title: "Packaging Design", description: "Product packaging that stands out on the shelf and communicates quality instantly.", iconName: "Layers" },
        { title: "Illustrations & Vector Art", description: "Custom flat illustrations, icons, and infographics to add character to your brand.", iconName: "PenTool" }
    ],

    // ✅ Left Side: Creative Process (Reasons Array)
    reasonsTitle: "From Concept to Creation",
    reasons: [
        { title: "Discovery Phase", description: "We research your audience, competitors, and brand values to find your unique angle." },
        { title: "Moodboarding & Sketches", description: "We explore rough concepts and visual directions before touching any pixels." },
        { title: "Design & Iteration", description: "We digitally craft the design, refining it based on your feedback until it's perfect." },
        { title: "Final Delivery", description: "You receive all source files (AI, PSD, SVG, PNG) ready for print and web." }
    ],

    // ✅ Right Side: Glow Box (Checklist Array)
    checklistTitle: "Why Professional Design Matters",
    checklist: [
        "First impressions are 94% design-related",
        "Consistent branding increases revenue by 23%",
        "Color improves brand recognition by 80%",
        "Good design builds immediate trust",
        "Stand out in a crowded marketplace"
    ],

    faqs: [
        { question: "What is graphic design, and what will it do for my business?", answer: "Graphic design is the art of creating visual content to effectively communicate messages. It helps grab attention and instill trust." },
        { question: "Which graphic design services do you have?", answer: "We offer logo branding, marketing materials, social media graphics, UI/UX, and infographics." },
        { question: "How long does a typical graphic design project take?", answer: "A simple logo takes about 3 days, while full branding or website design can take weeks." },
        { question: "Do you work with my existing branding?", answer: "Yes! We can either follow your existing style guide or create a completely new one." }
    ]
},
"mobile-app": {
    badgeText: "Mobile Engineering",
    heroTitle: "Apps That Users",
    heroSubtitle: "Love to Use.",
    heroDescription: "From disruptive startups to enterprise solutions, we build high-performance mobile apps that drive engagement and revenue.",
    metaTitle: "Mobile App Development Services | iOS & Android | Canva Solutions",
    metaDescription: "Expert mobile app development for iOS and Android. We build native and cross-platform apps using Flutter and React Native.",
    metaKeywords: "mobile app development, ios app builder, android app development, flutter development, react native",

    // Offerings Grid
    offeringsTitle: "End-to-End Mobile Solutions",
    offeringsSubtitle: "We handle the entire lifecycle of your app, from the first line of code to the final App Store submission and beyond.",
    contentItems: [
        { title: "iOS App Development", description: "Native iOS applications built with Swift and SwiftUI for a premium user experience.", iconName: "Smartphone" },
        { title: "Android App Development", description: "Scalable and robust Android apps using Kotlin to reach the massive global user base.", iconName: "Code2" },
        { title: "Cross-Platform", description: "Save budget with a single codebase (Flutter/React Native) that runs on both iOS and Android.", iconName: "Layers" },
        { title: "UI/UX App Design", description: "We design intuitive, thumb-friendly interfaces that keep users engaged and reduce churn.", iconName: "Zap" },
        { title: "App Maintenance", description: "Regular updates and monitoring to ensure your app stays compatible with new OS versions.", iconName: "ShieldCheck" },
        { title: "IoT & Wearables", description: "Connecting mobile apps to smart devices and IoT hardware for a fully integrated ecosystem.", iconName: "Globe" }
    ],

    // ✅ Left Side: Process (Reasons Array)
    reasonsTitle: "How We Build World-Class Apps",
    reasons: [
        { title: "Strategy & Prototyping", description: "We validate your idea and build clickable prototypes to test user flows." },
        { title: "Agile Development", description: "We build in sprints, delivering working features every 2 weeks for your feedback." },
        { title: "Rigorous Testing", description: "Automated and manual testing across different devices to ensure zero crashes." },
        { title: "Launch & Growth", description: "We handle the App Store submission and help you monitor performance analytics." }
    ],

    // ✅ Right Side: Glow Box (Checklist Array)
    checklistTitle: "Why Native/Cross-Platform?",
    checklist: [
        "Access to device features (Camera, GPS)",
        "Offline capabilities",
        "Superior performance and animations",
        "Better security & data protection",
        "Higher user retention rates"
    ],

    faqs: [
        { question: "How much does it cost to build a mobile app?", answer: "Costs vary depending on complexity. Our teams maintain cost-efficiency through agile, API-driven development practices." },
        { question: "How long does it take to build a mobile application?", answer: "A complex app could take two months or more, while a simpler app might be finished within a couple of weeks." },
        { question: "How will you make sure that the mobile application is secure?", answer: "We use industry-standard data protection, secure authentication, and solid data encryption." },
        { question: "What software technologies will Canva Solutions use?", answer: "We use Swift, Kotlin, Flutter, or React Native depending on your project requirements." }
    ]
},
"web-development": {
    badgeText: "Modern Web Solutions",
    heroTitle: "Websites That Work",
    heroSubtitle: "As Hard As You Do.",
    heroDescription: "We build lightning-fast, secure, and scalable websites that turn visitors into customers. Future-proof code for modern businesses.",
    metaTitle: "Custom Web Development Services | MERN & Next.js | Canva Solutions",
    metaDescription: "Professional web development using React, Next.js, and Node.js. Scalable SaaS and custom websites built for performance.",
    metaKeywords: "web development, custom website, mern stack, nextjs development, react developer",

    // Offerings Grid
    offeringsTitle: "Full-Cycle Web Solutions",
    offeringsSubtitle: "Whether you need a simple landing page or a complex enterprise platform, we have the architectural expertise to deliver.",
    contentItems: [
        { title: "Custom Website Development", description: "Pixel-perfect, responsive websites built from scratch using React and Tailwind CSS.", iconName: "Monitor" },
        { title: "Full-Stack Web Apps", description: "Scalable SaaS platforms and complex web applications using the MERN stack or Next.js.", iconName: "Database" },
        { title: "CMS Development", description: "Easy-to-manage content systems using Headless CMS solutions like Strapi or custom themes.", iconName: "Layout" },
        { title: "API Integration", description: "Seamlessly connect your website to third-party services like Stripe, CRM tools, and custom APIs.", iconName: "Server" },
        { title: "Performance Optimization", description: "We ensure your site loads in under 2 seconds and passes Core Web Vitals.", iconName: "Zap" },
        { title: "Progressive Web Apps (PWA)", description: "Websites that behave like mobile apps with offline capabilities and push notifications.", iconName: "Globe" }
    ],

    // ✅ Left Side: Process (Reasons Array)
    reasonsTitle: "The Development Lifecycle",
    reasons: [
        { title: "Planning & Architecture", description: "We map out the database schema, API structure, and user flows before writing code." },
        { title: "UI/UX & Frontend", description: "We build responsive, interactive interfaces that look great on any device." },
        { title: "Backend & Logic", description: "We build secure, efficient server-side logic to handle data and business rules." },
        { title: "Testing & Deployment", description: "Rigorous QA testing followed by seamless deployment to cloud servers (AWS/Vercel)." }
    ],

    // ✅ Right Side: Glow Box (Checklist Array)
    checklistTitle: "Why Choose Modern Tech?",
    checklist: [
        "Faster page load speeds (SEO friendly)",
        "Better security against vulnerabilities",
        "Easier to scale as you grow",
        "Rich, app-like user interactivity",
        "Lower long-term maintenance costs"
    ],

    faqs: [
        { question: "What can we do for you with Figma?", answer: "Progressively communicate flexible human capital with best-of-breed schemas. Completely develop infrastructures via bleeding-edge opportunities." },
        { question: "How much would custom software development cost?", answer: "The price ranges between $25/hr and $150/hr depending on location, project size, and expertise." },
        { question: "Do you create one single full home page?", answer: "Completely initiate world-class leadership skills via fully tested applications. Objectively seize dynamic e-services." },
        { question: "How do you interact with your clients?", answer: "Progressively communicate flexible human capital with best-of-breed schemas and leadership skills." }
    ]
},
"social-media": {
    badgeText: "Social Media Growth",
    heroTitle: "Stop Posting.",
    heroSubtitle: "Start Growing.",
    heroDescription: "We turn your social media channels into powerful sales engines. From viral reels to strategic ad campaigns, we help you dominate the feed.",
    metaTitle: "Social Media Management Services | Viral Growth | Canva Solutions",
    metaDescription: "Professional SMM services. We handle content creation, community management, and paid ads on Instagram, LinkedIn, and TikTok.",
    metaKeywords: "social media management, smm agency, instagram growth, facebook ads, tiktok marketing",

    // Offerings Grid
    offeringsTitle: "Full-Service Social Management",
    offeringsSubtitle: "We act as your in-house social team, handling everything from creative concepting to community management.",
    contentItems: [
        { title: "Strategy & Audit", description: "We analyze your current presence and competitors to build a custom roadmap.", iconName: "TrendingUp" },
        { title: "Content Creation", description: "Stop the scroll with high-quality visuals, reels, and captions designed to capture attention.", iconName: "Share2" },
        { title: "Community Management", description: "We actively engage with your followers, building a loyal community around your brand.", iconName: "Users" },
        { title: "Paid Advertising", description: "Precision-targeted ad campaigns that deliver high ROI and lower acquisition costs.", iconName: "Zap" },
        { title: "Influencer Marketing", description: "We connect you with authentic voices to amplify your message trusted audiences.", iconName: "Heart" },
        { title: "Analytics & Reporting", description: "No vanity metrics. Monthly reports on engagement, reach, and conversion to prove ROI.", iconName: "BarChart" }
    ],

    // ✅ Left Side: The "Viral" Formula (Reasons Array)
    reasonsTitle: "The Viral Formula",
    reasons: [
        { title: "Audit & Strategy", description: "We identify where your audience lives and what content they crave." },
        { title: "Content Calendar", description: "We plan a month ahead, ensuring consistent, high-quality posting." },
        { title: "Engagement & Growth", description: "We interact daily to boost algorithm favorability and build loyalty." },
        { title: "Optimize & Scale", description: "We double down on what works based on real-time data." }
    ],

    // ✅ Right Side: Glow Box (Checklist Array)
    checklistTitle: "Why Consistency Matters",
    checklist: [
        "Algorithms favor frequent posting",
        "Keeps your brand top-of-mind",
        "Builds trust and authority",
        "Creates more opportunities for viral hits",
        "Directly impacts website traffic"
    ],

    faqs: [
        { question: "What is social media management?", answer: "It deals with production, scheduling, analysis, and engagement on platforms like Instagram and LinkedIn." },
        { question: "What channels will my business utilize?", answer: "It depends on your audience. Instagram for visuals, LinkedIn for B2B, and TikTok for younger demographics." },
        { question: "How often will you post content?", answer: "Consistency trumps frequency. Usually 3-5 posts per week depending on your goals." },
        { question: "How do you measure success?", answer: "Through metrics like engagement rate, reach, follower growth, and ROI." }
    ]
}

};
export const navItems = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Services',
        href: "/services/business-consulting",
        subMenu: [
            {
                label: "Business Consulting",
                href: "/services/business-consulting",
            },
            {
                label: "Technology Consulting",
                href: "/services/technology-consulting",
            },
            {
                label: "Software & Solutions",
                href: "/services/software-solutions",
                // subMenu: [
                //     { label: "Strategic Portfolio Management", href: "/services/software-solutions/spm" },
                //     { label: "Portfolio Insights", href: "/services/software-solutions/insights" },
                //     { label: "Enterprise Connect", href: "/services/software-solutions/connect" },
                //     { label: "Project and Program Management", href: "/services/software-solutions/ppm" },
                // ],
            },
        ],
    },
    {
        label: 'Sector',
        href: '/sector',
    },
    {
        label: 'Intel',
        href: '/blog',
        subMenu: [
            {
                label: 'Feature Collections',
                href: '/blog',
            },
            {
                label: "News and Highlights",
                href: "/news-highlight"
            }
        ]
    },
    {
        label: 'About',
        href: '/about',
    }
]

export const fixedUrls = {
    letsTalk: "/contact",
    getStarted: "/contact"
}

export const footerLinks = [
    {
        id: 1,
        label: "Who We Are?",
        href: "/about"
    },
    {
        id: 2,
        label: "Our Services",
        href: "/services"
    },
    {
        id: 3,
        label: "Meet Our Team",
        href: "/about"
    },
    {
        id: 4,
        label: "Latest Blog",
        href: "/blog"
    },
    {
        id: 5,
        label: "Contact",
        href: "/contact"
    }
];
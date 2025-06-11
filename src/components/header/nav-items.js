export const navItems = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Services',
        href: '/services',
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
        label: 'Sectors',
        href: '/sector',
    },
    {
        label: 'Intel',
        href: '/blog',
        subMenu: [
            {
                label: 'Trending Topics',
                href: '/blog',
            },
            {
                label: "News and Highlights",
                href: "/blog"
            }
        ]
    },
    {
        label: 'About',
        href: '/about',
    }
]
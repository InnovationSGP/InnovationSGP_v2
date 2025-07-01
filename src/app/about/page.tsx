import AboutCompany from "@/template/about/about-company";
import Logo from "@/template/about/logo";
import Testimonials from "@/template/home-page/testimonials";
import SimpleTeam from "@/components/simple-team";
import { fetchAPI } from "@/config/api";
import dynamic from "next/dynamic";
import { ArrowUpCircle } from "lucide-react";

// Dynamically import the client-side BlogHero component
const BlogHero = dynamic(() => import("@/template/blog/blog-hero"), {
  ssr: true,
});

export async function generateMetadata() {
  const { yoast_head_json } = await fetchAPI({ endpoint: "pages/91" });
  const yoast = yoast_head_json;
  return {
    title: yoast.title.replace(/&#0*39;/g, "'"), // decode HTML entity
    description: yoast.og_description, // you can add more if available
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    },
    openGraph: {
      title: yoast.og_title.replace(/&#0*39;/g, "'"),
      url: yoast.og_url,
      siteName: yoast.og_site_name.replace(/&#0*39;/g, "'"),
      type: yoast.og_type,
      locale: yoast.og_locale,
    },
    twitter: {
      card: yoast.twitter_card,
    },
    robots: {
      index: yoast.robots.index === "index",
      follow: yoast.robots.follow === "follow",
      maxSnippet: parseInt(yoast.robots["max-snippet"]?.split(":")[1] ?? "-1"),
      maxImagePreview: yoast.robots["max-image-preview"]?.split(":")[1],
      maxVideoPreview: parseInt(
        yoast.robots["max-video-preview"]?.split(":")[1] ?? "-1"
      ),
    } as any,
  };
}

async function getData() {
  try {
    // Run these fetches in parallel for better performance
    const [aboutpageResponse, membersResponse, testimonialsResponse] =
      await Promise.allSettled([
        fetchAPI({ endpoint: "pages/91" }),
        fetchAPI({ endpoint: "members?_embed" }),
        fetchAPI({ endpoint: "testimonial" }),
      ]);

    // Process responses with proper type checking
    const aboutpage =
      aboutpageResponse.status === "fulfilled" ? aboutpageResponse.value : null;
    const members =
      membersResponse.status === "fulfilled"
        ? Array.isArray(membersResponse.value)
          ? membersResponse.value
          : []
        : [];
    const testimonials =
      testimonialsResponse.status === "fulfilled"
        ? Array.isArray(testimonialsResponse.value)
          ? testimonialsResponse.value
          : []
        : [];

    // If we couldn't get the about page data, log the error
    if (!aboutpage) {
      console.error("Failed to fetch about page data");
    }

    return { aboutpage, members, testimonials };
  } catch (error) {
    console.error("Error in getData function:", error);
    return {
      aboutpage: null,
      members: [],
      testimonials: [],
    };
  }
}

// Create a standalone error-safe Team section component that is guaranteed to render
function SafeTeamSection({ members }: { members: any[] }) {
  try {
    return (
      <div className="relative overflow-hidden">
        {/* Top gradient transition */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent z-10"></div>

        {/* Background decorative elements */}
        <div className="absolute top-20 -left-48 w-96 h-96 rounded-full bg-blue-50/30 blur-3xl"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full bg-purple-50/20 blur-3xl"></div>

        {/* Team component */}
        <SimpleTeam data={members} />

        {/* Bottom gradient transition */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>
    );
  } catch (error) {
    console.error("Fatal error in SafeTeamSection:", error);
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <p className="text-gray-600 mb-6">
            Our team information is temporarily unavailable.
          </p>
        </div>
      </div>
    );
  }
}

export default async function About() {
  const { aboutpage, members, testimonials } = await getData();

  // If the aboutpage data is missing, display a fallback message
  if (!aboutpage) {
    return (
      <div className="min-h-screen flex justify-center items-center p-8">
        <div className="max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Unable to load About page
          </h1>
          <p className="text-gray-600 mb-6">
            We're experiencing technical difficulties. Please try again later.
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  // Safely extract fields from aboutpage with fallbacks
  const {
    // About section fields
    about_us_label = "",
    about_us_plain_title = "",
    about_us_color_title = "",
    about_us_discription = "",
    about_us_button_link = "",
    about_us_card = [],

    // Client/partners logo array
    home_client = [],
  } = aboutpage.acf || {};

  return (
    <>
      {/* Hero Section using BlogHero */}
      <BlogHero
        title="About Innovation Strategy Group"
        subtitle="Our Story"
        description="Innovating with purpose, leading with strategy, and transforming at scale. Discover the team behind Innovation Strategy Group and our mission to deliver excellence."
        backgroundImage="/images/about-hero.png"
        ctaText="Learn More About Us"
        ctaLink="#about-company"
        breadcrumbs={[
          { label: "Home", url: "/" },
          { label: "About", url: "/about" },
        ]}
        highlightPattern="alternate"
      />

      {/* Decorative wave divider */}
      <div className="relative h-24 overflow-hidden bg-white">
        <div className="absolute -top-10 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#f8fafc"
              fillOpacity="0.4"
              d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,90.7C672,75,768,85,864,96C960,107,1056,117,1152,117.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* About Company Section */}
      <div id="about-company">
        <AboutCompany
          data={{
            about_us_label,
            about_us_plain_title,
            about_us_color_title,
            about_us_discription,
            about_us_button_link,
            about_us_card,
          }}
        />
      </div>

      {/* Team section with improved styling */}
      <SafeTeamSection members={members} />

      {/* Testimonials section with gradient background */}
      <div className="bg-gradient-to-b from-white to-gray-50">
        <Testimonials data={{ testimonials }} />
      </div>

      {/* Client Logo Section with continuous scrolling animation */}
      <div className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        {/* Decorative elements */}
        <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-blue-50 rounded-full opacity-30"></div>
        <div className="absolute -left-40 top-20 w-72 h-72 bg-teal-50 rounded-full opacity-30"></div>

        <Logo data={home_client} />
      </div>

      {/* Back to top button */}
      <div className="fixed bottom-8 right-8 z-50">
        <a
          href="#"
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white"
          aria-label="Back to top"
        >
          <ArrowUpCircle className="h-8 w-8" />
        </a>
      </div>
    </>
  );
}

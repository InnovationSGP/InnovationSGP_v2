import { fetchAPI } from "@/config/api";
import { Metadata } from "next";
import ServicesHero from "@/template/services/services-hero";
import ServiceCards from "@/template/services/service-cards";
import ServiceProcess from "@/template/services/service-process";
import ServiceStats from "@/template/services/service-stats";
import WhyChoseUs from "@/template/home-page/why-chose-us";
import Blogs from "@/template/home-page/blogs";
import TechServices from "@/template/home-page/tech-services";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetchAPI({
      endpoint: "pages/342",
    });
    const yoast = res?.yoast_head_json;

    if (!yoast) {
      return {
        title: "Services | InnovationSGP",
        description: "Professional services offered by InnovationSGP",
      };
    }

    return {
      title:
        yoast.title?.replace(/&#0*39;/g, "'") || "Services | InnovationSGP",
      description:
        yoast.og_description ||
        "Professional services offered by InnovationSGP",
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/services`,
      },
      openGraph: {
        title: yoast.og_title?.replace(/&#0*39;/g, "'"),
        url: yoast.og_url,
        siteName: yoast.og_site_name?.replace(/&#0*39;/g, "'"),
        type: yoast.og_type,
        locale: yoast.og_locale,
      },
      twitter: {
        card: yoast.twitter_card,
      },
      robots: {
        index: yoast?.robots?.index === "index",
        follow: yoast?.robots?.follow === "follow",
        maxSnippet: parseInt(
          yoast?.robots?.["max-snippet"]?.split(":")[1] ?? "-1"
        ),
        maxImagePreview: yoast?.robots?.["max-image-preview"]?.split(":")[1],
        maxVideoPreview: parseInt(
          yoast?.robots?.["max-video-preview"]?.split(":")[1] ?? "-1"
        ),
      } as any,
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Services | InnovationSGP",
      description: "Professional services offered by InnovationSGP",
    };
  }
}

async function getServicesData() {
  try {
    // Fetch the services landing page data
    const pageData = await fetchAPI({ endpoint: "pages/342" });

    // Fetch all services for the services grid
    const servicesData = await fetchAPI({ endpoint: "services?per_page=100" });

    // Fetch recent blog posts
    const recentPosts = await fetchAPI({ endpoint: "posts?per_page=3&_embed" });

    // Validate the pageData structure
    if (!pageData || !pageData.acf) {
      console.error("Invalid page data structure:", pageData);
    }

    return {
      pageData,
      servicesData: Array.isArray(servicesData) ? servicesData : [],
      recentPosts: Array.isArray(recentPosts) ? recentPosts : [],
    };
  } catch (error) {
    console.error("Error fetching services data:", error);
    return {
      pageData: null,
      servicesData: [],
      recentPosts: [],
    };
  }
}

export default async function ServicesPage() {
  const { pageData, servicesData, recentPosts } = await getServicesData();

  // Log only essential parts of the data for debugging
  console.log("Services Page Data:", {
    acf: pageData?.acf
      ? Object.keys(pageData.acf).filter((key) => key.startsWith("services_"))
      : [],
    servicesCount: servicesData?.length || 0,
    recentPostsCount: recentPosts?.length || 0,
  });

  if (!pageData) {
    return (
      <div className="h-screen flex justify-center items-center text-center">
        Error loading the page data. Please try again later.
      </div>
    );
  }

  // Extract the services specific fields from the ACF data
  const {
    services_title,
    services_label,
    services_subtitle,
    services_description,
    services_background_image,
    services_cta_button_text,
    services_cta_button_link,
    services_process_title,
    services_process_subtitle,
    services_process_steps,
    services_stats,
    services_testimonials,
  } = pageData.acf || {};

  // Use services_title if available, otherwise fall back to services_label
  const heroTitle =
    services_title || services_label || "Our Professional Services";

  return (
    <>
      {/* Hero Section */}
      <ServicesHero
        title={heroTitle}
        subtitle={
          services_subtitle || "Expert Solutions for Modern Business Challenges"
        }
        description={
          services_description ||
          "We offer a comprehensive range of professional services designed to help businesses grow, transform, and succeed in today's competitive landscape."
        }
        backgroundImage={services_background_image || "/images/services.avif"}
        ctaText={services_cta_button_text || "Explore Our Services"}
        ctaLink={services_cta_button_link || "#services-grid"}
      />
      {/* Services Grid
      <section id="services-grid" className="py-24">
        <ServiceCards services={servicesData} />
      </section> */}
      {/* Tech Services Showcase
      <TechServices /> */}
      {/* Service Process Section */}
      <ServiceProcess
        title={services_process_title || "Our Proven Process"}
        subtitle={services_process_subtitle || "How We Deliver Results"}
        steps={services_process_steps || []}
      />
      {/* Why Choose Us Section */}
      <WhyChoseUs data={pageData.acf} />
      {/* Recent Blog Posts */}
      {recentPosts?.length > 0 && (
        <Blogs
          title="Read our latest"
          colorTitle="Blog posts"
          label="Blogs"
          data={recentPosts}
        />
      )}
    </>
  );
}

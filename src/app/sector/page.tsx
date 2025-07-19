import { fetchAPI } from "@/config/api";
import Healthcare from "@/template/sector/healthcare";
import EnhancedLeftRightCard from "@/template/sector/enhanced-left-right-card";
import SectorHero from "@/template/sector/sector-hero";
import { Metadata } from "next";

const parseYoastValue = (val: any) => {
  if (typeof val === "string") {
    const parts = val.split(":");
    return parseInt(parts.length > 1 ? parts[1] : parts[0], 10);
  } else if (typeof val === "number") {
    return val;
  }
  return -1;
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetchAPI({
      endpoint: "pages/31",
    });
    const yoast = res?.yoast_head_json;

    if (!yoast) {
      return {
        title: "Industry Sectors | InnovationSGP",
        description: "Strategic industry solutions by InnovationSGP",
      };
    }

    return {
      title:
        yoast.title?.replace(/&#0*39;/g, "'") ||
        "Industry Sectors | InnovationSGP",
      description:
        yoast.og_description || "Strategic industry solutions by InnovationSGP",
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/sector`,
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
      title: "Industry Sectors | InnovationSGP",
      description: "Strategic industry solutions by InnovationSGP",
    };
  }
}

async function getData() {
  try {
    // Fetch the sector page data
    const sectorPage = await fetchAPI({
      endpoint: "pages/31",
    });

    // Validate the sectorPage structure
    if (!sectorPage || !sectorPage.acf) {
      console.error("Invalid sector page data structure:", sectorPage);
    }

    return {
      sectorPage,
    };
  } catch (error) {
    console.error("Error fetching sector data:", error);
    return {
      sectorPage: null,
    };
  }
}

export default async function SectorPage() {
  const { sectorPage } = await getData();

  // If the data is not available, show an error message
  if (!sectorPage) {
    return (
      <div className="h-screen flex justify-center items-center text-center">
        Error loading the sector page. Please try again later.
      </div>
    );
  }

  const data = sectorPage?.acf?.left_right_section;

  // Extract any potential sector-specific data from ACF
  const {
    sector_title,
    sector_subtitle,
    sector_description,
    sector_background_image,
    sector_cta_button_text,
    sector_cta_button_link,
  } = sectorPage?.acf || {};

  // Extract Healthcare data (first section)
  const healthcareData = data?.[0] || null;

  return (
    <>
      <SectorHero
        title={sector_title || "Industry Sectors"}
        subtitle={sector_subtitle || "Strategic Industries"}
        description={
          sector_description ||
          "Strategic solutions tailored to disrupt, adapt, and lead across key industries"
        }
        backgroundImage={sector_background_image || "/images/about-hero.png"}
        ctaText={sector_cta_button_text}
        ctaLink={sector_cta_button_link}
      />
      <Healthcare data={healthcareData} />
      {data?.slice(1)?.map((item: any, idx: number) => {
        return <EnhancedLeftRightCard key={idx} data={item} id={idx} />;
      })}
    </>
  );
}

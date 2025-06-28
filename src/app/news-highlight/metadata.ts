import { fetchAPI } from "@/config/api";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { yoast_head_json } = await fetchAPI({ endpoint: "pages/240" });
    const yoast = yoast_head_json;

    return {
      title: yoast.title.replace(/&#0*39;/g, "'"), // decode HTML entity
      description: yoast.og_description, // you can add more if available
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/news-highlight`,
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
        maxSnippet: parseInt(
          yoast.robots["max-snippet"]?.split(":")[1] ?? "-1"
        ),
        maxImagePreview: yoast.robots["max-image-preview"]?.split(":")[1],
        maxVideoPreview: parseInt(
          yoast.robots["max-video-preview"]?.split(":")[1] ?? "-1"
        ),
      } as any,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "News and Highlights | InnovationSGP",
      description:
        "The latest news and strategic intelligence from InnovationSGP",
    };
  }
}

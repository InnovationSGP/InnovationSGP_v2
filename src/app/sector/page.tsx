import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import Healthcare from "@/template/sector/healthcare";
import LeftRightCard from "@/template/services/left-right-card";


export async function generateMetadata() {
  const {yoast_head_json} = await fetchAPI({ endpoint: "pages/31" })
  const yoast = yoast_head_json
  return {
    title: yoast.title.replace(/&#0*39;/g, "'"), // decode HTML entity
    description: yoast.og_description, // you can add more if available
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/sector`,
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
      maxVideoPreview: parseInt(yoast.robots["max-video-preview"]?.split(":")[1] ?? "-1"),
    },
  };
}

async function getData() {
  try {
    const res = await fetchAPI({
      endpoint: "pages/31",
    });

    return {
      sectorPage: res,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      sectorPage: null, // fallback if the fetch fails
    };
  }
}

export default async function Home() {
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

  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / Sector"
        headingText="Sector"
        description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
      />
      <Healthcare data={data?.[0]} />
      {data?.slice(1)?.map((item: any, idx: any) => {
        return <LeftRightCard key={idx} data={item} id={idx} />;
      })}
    </>
  );
}

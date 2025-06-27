import LeftRightCard from "@/template/services/left-right-card";
import Hero from "../../../template/services/hero";
import Blogcard from "@/template/services/blog-card";
import { fetchAPI } from "@/config/api";
import WordProcess from "@/template/services/word-process";
import Blogs from "@/template/home-page/blogs";
import TechServices from "@/template/home-page/tech-services";

export async function generateMetadata({ params }: any) {
  const { single } = await params;
  const res = await fetchAPI({
    endpoint: `services?slug=${single}`,
  });
  const yoast = res[0]?.yoast_head_json;
  return {
    title: yoast?.title?.replace(/&#0*39;/g, "'") || "Services", // decode HTML entity
    description: yoast?.og_description, // you can add more if available
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/services/${single}`,
    },
    openGraph: {
      title: yoast?.og_title.replace(/&#0*39;/g, "'"),
      url: yoast?.og_url,
      siteName: yoast?.og_site_name.replace(/&#0*39;/g, "'"),
      type: yoast?.og_type,
      locale: yoast?.og_locale,
    },
    twitter: {
      card: yoast?.twitter_card,
    },
    robots: {
      index: yoast?.robots.index === "index",
      follow: yoast?.robots.follow === "follow",
      maxSnippet: parseInt(yoast?.robots["max-snippet"]?.split(":")[1] ?? "-1"),
      maxImagePreview: yoast?.robots["max-image-preview"]?.split(":")[1],
      maxVideoPreview: parseInt(
        yoast?.robots["max-video-preview"]?.split(":")[1] ?? "-1"
      ),
    } as any,
  };
}

async function getData(slug: any) {
  try {
    const pageData = await fetchAPI({
      endpoint: `services?slug=${slug}`,
    });
    const latesPost = await fetchAPI({
      endpoint: `posts?per_page=3&_embed`,
    });

    return {
      pageData: pageData[0],
      latesPost,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Return empty or default values to prevent app crashing
    return {
      pageData: null,
      latesPost: [],
    };
  }
}

export default async function Home({ params }: any) {
  const { single } = await params;
  const { pageData, latesPost } = await getData(single);

  // If pageData or latesPost is missing, show an error message
  if (!pageData) {
    return (
      <div className="h-screen flex justify-center items-center text-center">
        Error loading the page data. Please try again later.
      </div>
    );
  }

  const { steps_plain_title, steps_color_title, step, steps_images } =
    pageData.acf;

  return (
    <>
      <Hero
        title={pageData?.title.rendered}
        excerpt={pageData?.excerpt?.rendered}
      />
      <TechServices />
      <WordProcess
        data={{
          steps_plain_title,
          steps_color_title,
          step,
          steps_images,
        }}
      />
      <div className="mt-10" />
      {pageData?.acf?.left_right_section?.map((item: any, idx: any) => (
        <LeftRightCard data={item} key={idx} id={idx + 1} />
      ))}
      {latesPost?.length > 0 && (
        <Blogs
          title="Read our latest"
          colorTitle="Blog posts"
          label="Blogs"
          data={latesPost?.slice(0, 3)}
        />
      )}
    </>
  );
}

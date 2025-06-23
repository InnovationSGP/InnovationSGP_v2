import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import Pagination from "@/template/blog/pagination";
import Treding from "@/template/highlight/treding";
import Blogs from "@/template/home-page/blogs";

export async function generateMetadata() {
  const {yoast_head_json} = await fetchAPI({ endpoint: "pages/240" })
  const yoast = yoast_head_json
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
      maxSnippet: parseInt(yoast.robots["max-snippet"]?.split(":")[1] ?? "-1"),
      maxImagePreview: yoast.robots["max-image-preview"]?.split(":")[1],
      maxVideoPreview: parseInt(yoast.robots["max-video-preview"]?.split(":")[1] ?? "-1"),
    } as any,
  };
}

async function getData() {
  try {
    const newsT = await fetchAPI({
      endpoint: `posts?categories=1&per_page=6&page=1&_embed`,
    });
    
    const news = await fetchAPI({
      endpoint: `posts?categories=1&per_page=6&page=2&_embed`,
    });

    const totalPosts = await fetchAPI({
      endpoint: `category-post-count/1`,
    });

    return {
      newsT,
      news,
      totalPosts: totalPosts?.total_posts,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      newsT: [],
      news: [],
      totalPosts: 0,
    };
  }
}

export default async function News() {
  const { newsT, news, totalPosts } = await getData();
  
  // Calculate the number of pages for pagination (ensure no negative values)
  const tPosts = Math.max(totalPosts - 6, 0);

  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / Intel / News and Highlights"
        headingText="News and Highlights"
        description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
      />
      <Treding data={newsT} />
      <Blogs title="Trending" colorTitle="News" label="Trending" data={news} />
      
      {/* Ensure that totalPages is a non-negative number */}
      {totalPosts > 6 && <Pagination totalPages={tPosts / 6} bg />}
    </>
  );
}

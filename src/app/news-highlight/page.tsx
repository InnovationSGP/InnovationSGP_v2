import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import Pagination from "@/template/blog/pagination";
import Treding from "@/template/highlight/treding";
import Blogs from "@/template/home-page/blogs";

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

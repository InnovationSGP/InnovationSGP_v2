import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import Pagination from "@/template/blog/pagination";
import Treding from "@/template/highlight/treding";
import Blogs from "@/template/home-page/blogs";

async function getData() {
  let query = `posts?categories=1&per_page=6&page=2&_embed`;
  const newsT = await fetchAPI({
    endpoint: `posts?categories=1&per_page=6&page=1&_embed`,
  });
  const news = await fetchAPI({
    endpoint: query,
  });

  const totalPosts = await fetchAPI({
    endpoint: `category-post-count/1`,
  });

  return {
    newsT,
    news,
    totalPosts: totalPosts?.total_posts,
  };
}

export default async function News() {
  const { newsT, news, totalPosts } = await getData();
  const tPosts = totalPosts - 6;

  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / Intel / News and Highlights  "
        headingText="News and Highlights"
        description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
      />
      <Treding data={newsT} />
      <Blogs title="Trending" colorTitle="News" label="Trending" data={news} />
      <Pagination totalPages={tPosts/6} bg />
    </>
  );
}

import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import Treding from "@/template/highlight/treding";
import Blogs from "@/template/home-page/blogs";
import { blogPosts } from "@/template/services/blogs";

async function getData() {
  const news = await fetchAPI({
    endpoint: `posts?categories=1&per_page=6&page=1`,
  });

  return {
    news,
  };
}

export default async function News() {
  const { news } = await getData();

  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / Intel / News and Highlights  "
        headingText="News and Highlights"
        description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
      />
      <Treding />
      <Blogs
        title="Trending"
        colorTitle="News"
        label="Trending"
        data={blogPosts}
      />
    </>
  );
}

import Banner from "@/components/banner";
import Treding from "@/template/highlight/treding";
import Blogs from "@/template/home-page/blogs";
import { blogPosts } from "@/template/services/blogs";

export default function Home() {
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

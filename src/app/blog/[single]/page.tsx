import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import Hero from "@/template/blog-read/hero";
import { getMediaURL } from "@/utils";

async function getData(slug: any) {
  console.log("🚀 ~ getData ~ slug:", slug)
  const post = await fetchAPI({
    endpoint: `posts?slug=${slug}&_embed`,
  });
  const latesPost = await fetchAPI({
    endpoint: `posts?per_page=5&_embed`,
  });
  return {
    post,
    latesPost
  };
}

export default async function Home({ params }: any) {
  const { single } = await params;
  const { post, latesPost } = await getData(single);

  return (
    <>
      <Banner
        bgImage={getMediaURL(post[0])}
        labelText="Home / News & Trending Topic / Read More"
        headingText={post[0]?.title?.rendered}
      />
      <Hero
        latesposts={latesPost}
        post={post[0]}
      />
    </>
  );
}

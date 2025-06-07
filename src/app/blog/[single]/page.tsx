import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import Hero from "@/template/blog-read/hero";

async function getData(slug: any) {
  const post = await fetchAPI({
    endpoint: `posts?slug=${slug}`,
  });
  const latesPost = await fetchAPI({
    endpoint: `posts?per_page=5`,
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
        bgImage="/images/Feature-Collections.jpg"
        labelText="Home /  Feature Collections / Read More"
        headingText="Implement customized user innovative success"
      />
      <Hero />
    </>
  );
}

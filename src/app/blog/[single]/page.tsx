import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import Hero from "@/template/blog-read/hero";
import { getMediaURL } from "@/utils";

async function getData(slug: any) {
  try {
    const post = await fetchAPI({
      endpoint: `posts?slug=${slug}&_embed`,
    });

    const latesPost = await fetchAPI({
      endpoint: `posts?per_page=5&_embed`,
    });

    return {
      post,
      latesPost,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      post: [],
      latesPost: [],
    };
  }
}

export default async function Home({ params }: any) {
  const { single } = await params;
  const { post, latesPost } = await getData(single);

  // Check if the post exists before rendering
  if (!post || post.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center text-center">
        Error: The post could not be found. Please try again later.
      </div>
    );
  }

  return (
    <>
      <Banner
        bgImage={getMediaURL(post[0])}
        labelText="Home / Feature Collections / Read More"
        headingText={post[0]?.title?.rendered || "Post Title"}
      />
      <Hero latesposts={latesPost} post={post[0]} />
    </>
  );
}

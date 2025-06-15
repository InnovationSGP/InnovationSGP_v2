import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import Hero from "@/template/blog-read/hero";
import { getMediaURL } from "@/utils";

export async function generateMetadata({ params }: any) {
  const { single } = await params;
  const res = await fetchAPI({
    endpoint: `posts?slug=${single}`,
  });
  const yoast = res[0]?.yoast_head_json;
  return {
    title: yoast?.title?.replace(/&#0*39;/g, "'") || "Blogs", // decode HTML entity
    description: yoast?.og_description, // you can add more if available
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${single}`,
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
    },
  };
}

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

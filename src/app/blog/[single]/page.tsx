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
      title: yoast?.og_title?.replace(/&#0*39;/g, "'"),
      url: yoast?.og_url,
      siteName: yoast?.og_site_name?.replace(/&#0*39;/g, "'"),
      type: yoast?.og_type,
      locale: yoast?.og_locale,
    },
    twitter: {
      card: yoast?.twitter_card,
    },
    robots: {
      index: yoast?.robots?.index === "index",
      follow: yoast?.robots?.follow === "follow",
      maxSnippet: parseInt(
        yoast?.robots?.["max-snippet"]?.split(":")[1] ?? "-1"
      ),
      maxImagePreview: yoast?.robots?.["max-image-preview"]?.split(":")[1],
      maxVideoPreview: parseInt(
        yoast?.robots?.["max-video-preview"]?.split(":")[1] ?? "-1"
      ),
    } as any,
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

export default async function BlogPostPage({ params }: any) {
  const { single } = await params;
  const { post, latesPost } = await getData(single);

  // Check if the post exists before rendering
  if (!post || post.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center p-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The post you're looking for could not be found. It may have been
            removed or is temporarily unavailable.
          </p>
          <a
            href="/blog"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Blog
          </a>
        </div>
      </div>
    );
  }

  // Extract categories for breadcrumb
  const postCategories = post[0]?._embedded?.["wp:term"]?.[0] || [];
  const primaryCategory = postCategories[0]?.name || "Blog";

  // Parse breadcrumbs from labelText (e.g., "Home / Blog / Category")
  const breadcrumbText = `Home / Blog / ${primaryCategory}`;

  // Get post title and clean it from HTML entities
  const postTitle =
    post[0]?.title?.rendered?.replace(/&#\d+;/g, (match: string) => {
      const numericValue = match.match(/&#(\d+);/)?.[1];
      return numericValue ? String.fromCharCode(parseInt(numericValue)) : match;
    }) || "Blog Post";

  // Extract excerpt if available for description
  const excerpt = post[0]?.excerpt?.rendered
    ? post[0].excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 160)
    : undefined;

  return (
    <>
      <Banner
        bgImage={getMediaURL(post[0])}
        labelText={breadcrumbText}
        headingText={postTitle}
        description={excerpt}
        ctaText="Continue Reading"
        ctaLink="#article-content"
      />
      <Hero latesposts={latesPost} post={post[0]} />
    </>
  );
}

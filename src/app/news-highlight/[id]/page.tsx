import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import Hero from "@/template/blog-read/hero";
import { getMediaURL } from "@/utils";
import { Metadata } from "next";

type Params = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = params;

  try {
    const post = await fetchAPI({
      endpoint: `posts/${id}`,
    });

    const yoast = post?.yoast_head_json;

    if (!yoast) {
      return {
        title: "News Article | InnovationSGP",
        description: "Read the latest news from InnovationSGP",
      };
    }

    return {
      title: yoast?.title?.replace(/&#0*39;/g, "'") || "News Article",
      description:
        yoast?.og_description || "Read the latest news from InnovationSGP",
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/news-highlight/${id}`,
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
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "News Article | InnovationSGP",
      description: "Read the latest news from InnovationSGP",
    };
  }
}

async function getNewsData(id: string) {
  try {
    // Fetch the specific news post with embed for media and author info
    const post = await fetchAPI({
      endpoint: `posts/${id}?_embed`,
    });

    // Fetch related news posts for the sidebar
    const relatedPosts = await fetchAPI({
      endpoint: `posts?per_page=5&exclude=${id}&_embed`,
    });

    return {
      post,
      relatedPosts,
    };
  } catch (error) {
    console.error("Error fetching news data:", error);
    return {
      post: null,
      relatedPosts: [],
    };
  }
}

export default async function NewsHighlightPage({ params }: Params) {
  const { id } = params;
  const { post, relatedPosts } = await getNewsData(id);

  // Check if the post exists before rendering
  if (!post) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center p-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            News Article Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The news article you're looking for could not be found. It may have
            been removed or is temporarily unavailable.
          </p>
          <a
            href="/news-highlight"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to News
          </a>
        </div>
      </div>
    );
  }

  // Extract categories for breadcrumb
  const postCategories = post?._embedded?.["wp:term"]?.[0] || [];
  const primaryCategory = postCategories[0]?.name || "News";

  // Parse breadcrumbs for the banner
  const breadcrumbText = `Home / News / ${primaryCategory}`;

  // Get post title and clean it from HTML entities
  const postTitle =
    post?.title?.rendered?.replace(/&#\d+;/g, (match: string) => {
      const numericValue = match.match(/&#(\d+);/)?.[1];
      return numericValue ? String.fromCharCode(parseInt(numericValue)) : match;
    }) || "News Article";

  // Extract excerpt if available for description
  const excerpt = post?.excerpt?.rendered
    ? post.excerpt.rendered.replace(/<[^>]*>/g, "").substring(0, 160)
    : undefined;

  return (
    <>
      <Banner
        bgImage={getMediaURL(post)}
        labelText={breadcrumbText}
        headingText={postTitle}
        description={excerpt}
        ctaText="Continue Reading"
        ctaLink="#article-content"
      />
      <Hero latesposts={relatedPosts} post={post} />
    </>
  );
}

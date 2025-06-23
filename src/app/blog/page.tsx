import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import FeatureTopics from "@/template/blog/feature-topics";
import Pagination from "@/template/blog/pagination";
import Blogs from "@/template/services/blogs";

export async function generateMetadata() {
  const {yoast_head_json} = await fetchAPI({ endpoint: "pages/238" })
  const yoast = yoast_head_json
  return {
    title: yoast.title.replace(/&#0*39;/g, "'"), // decode HTML entity
    description: yoast.og_description, // you can add more if available
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    },
    openGraph: {
      title: yoast.og_title.replace(/&#0*39;/g, "'"),
      url: yoast.og_url,
      siteName: yoast.og_site_name.replace(/&#0*39;/g, "'"),
      type: yoast.og_type,
      locale: yoast.og_locale,
    },
    twitter: {
      card: yoast.twitter_card,
    },
    robots: {
      index: yoast.robots.index === "index",
      follow: yoast.robots.follow === "follow",
      maxSnippet: parseInt(yoast.robots["max-snippet"]?.split(":")[1] ?? "-1"),
      maxImagePreview: yoast.robots["max-image-preview"]?.split(":")[1],
      maxVideoPreview: parseInt(yoast.robots["max-video-preview"]?.split(":")[1] ?? "-1"),
    }as any,
  };
}

async function getData(id: any, page: any) {
  try {
    let query = `posts?categories=${id}&page=${page}&per_page=9&_embed`;
    
    const categoriesRes = await fetchAPI({
      endpoint: "categories",
    });

    const blogsRes = await fetchAPI({
      endpoint: query,
    });

    const totalPosts = await fetchAPI({
      endpoint: `category-post-count/${id}`,
    });

    return {
      categories: categoriesRes,
      blogs: blogsRes,
      totalPosts: totalPosts?.total_posts || 0,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      categories: [],
      blogs: [],
      totalPosts: 0,
    };
  }
}

export default async function Home({ searchParams }: any) {
  const { categories, blogs, totalPosts } = await getData(
    searchParams?.id || 5, 
    searchParams?.page || 1
  );

  const totalPages = Math.ceil(totalPosts / 9); // Ensure no decimals in pages

  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / Intel / Feature Collections "
        headingText="Feature Collections"
        description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
      />
      <section className="blog_gradient mb-20">
        <FeatureTopics categories={categories} />
        {blogs?.length > 0 ? (
          <div className="">
            <Blogs showLabel={false} showHeading={false} data={blogs} />
          </div>
        ) : (
          <p className="container mx-auto px-4">Not Found!</p>
        )}
        {/* Only show pagination if totalPages > 1 */}
        {totalPages > 1 && <Pagination totalPages={totalPages} />}
      </section>
    </>
  );
}

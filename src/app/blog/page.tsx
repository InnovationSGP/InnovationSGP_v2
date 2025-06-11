import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import FeatureTopics from "@/template/blog/feature-topics";
import Pagination from "@/template/blog/pagination";
import Blogs from "@/template/services/blogs";

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

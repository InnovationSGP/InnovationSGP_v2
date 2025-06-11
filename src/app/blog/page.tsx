import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import FeatureTopics from "@/template/blog/feature-topics";
import Pagination from "@/template/blog/pagination";
import Blogs from "@/template/services/blogs";

async function getData(id: any, page:any) {
  let query = `posts?categories=${id}&page=${page}&per_page=9&_embed`
    const categoriesRes = await fetchAPI({
    endpoint: "categories",
  });
  const blogsRes = await fetchAPI({
    endpoint: query
  });

  const totalPosts = await fetchAPI({
    endpoint: `category-post-count/${id}`
  });

  return {
    categories: categoriesRes,
    blogs: blogsRes,
    totalPosts: totalPosts?.total_posts
  };
}

export default async function Home({ searchParams }: any) {
  const { categories, blogs, totalPosts } = await getData(searchParams?.id || 5,  searchParams?.page || 1);

  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / Intel / Trending Topics "
        headingText="Trending Topics"
        description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
      />
      <section className="blog_gradient">
        <FeatureTopics categories={categories} />
        {blogs?.length > 0 ? (
          <div className="">
            <Blogs showLabel={false} showHeading={false} data={blogs} />
          </div>
        ) : (
          <p className="container mx-auto px-4">Not Found !</p>
        )}
        <Pagination totalPages={totalPosts/9} />
      </section>
    </>
  );
}

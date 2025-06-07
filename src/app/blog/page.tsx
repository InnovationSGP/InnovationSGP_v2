import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import FeatureTopics from "@/template/blog/feature-topics";
import Pagination from "@/template/blog/pagination";
import Blogs from "@/template/services/blogs";

async function getData(id:any) {
  const categoriesRes = await fetchAPI({
    endpoint: "categories",
  });
  const blogsRes = await fetchAPI({
    endpoint: `posts?categories=${id}&per_page=10&page=1`,
  });

  return {
    categories: categoriesRes,
    blogs: blogsRes,
  };
}

export default async function Home({ searchParams }: any) {
  const { categories, blogs } = await getData(searchParams?.id || 5);

  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / Intel / Feature Collections "
        headingText="Feature Collections"
        description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
      />
      <section className="blog_gradient">
        <FeatureTopics categories={categories} />
        <div className="-mt-24">
          <Blogs showLabel={false} showHeading={false} />
        </div>
        <Pagination />
      </section>
    </>
  );
}

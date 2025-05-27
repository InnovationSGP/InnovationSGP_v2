import Banner from "@/components/banner";
import FeatureTopics from "@/template/blog/feature-topics";
import Pagination from "@/template/blog/pagination";
import Blogs from "@/template/services/blogs";

export default function Home() {
  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / Intel / Feature Collections "
        headingText="Feature Collections"
        description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
      />
      <section className="blog_gradient">
        <FeatureTopics />
        <div className="-mt-24">
          <Blogs showLabel={false} showHeading={false} />
        </div>
        <Pagination />
      </section>
    </>
  );
}

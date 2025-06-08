import LeftRightCard from "@/template/services/left-right-card";
import Hero from "../../../template/services/hero";
import Blogcard from "@/template/services/blog-card";
import { fetchAPI } from "@/config/api";
import WordProcess from "@/template/services/word-process";
import Blogs from "@/template/home-page/blogs";

async function getData(slug: any) {
  const pageData = await fetchAPI({
    endpoint: `services?slug=${slug}`,
  });
  const latesPost = await fetchAPI({
    endpoint: `posts?per_page=3&_embed`,
  });

  return {
    pageData: pageData[0],
    latesPost,
  };
}

export default async function Home({ params }: any) {
  const { single } = await params;
  const { pageData, latesPost } = await getData(single);
  const { steps_plain_title, steps_color_title, step, steps_images } =
    pageData.acf;

  return (
    <>
      <Hero />
      <WordProcess
        data={{
          steps_plain_title,
          steps_color_title,
          step,
          steps_images,
        }}
      />
      <div className="mt-10" />
      {pageData?.acf?.left_right_section?.map((item: any, idx: any) => (
        <LeftRightCard data={item} key={idx} id={idx + 1} />
      ))}

      {latesPost?.length > 0 &&
      <Blogs
        title="Read our latest"
        colorTitle="Blog posts"
        label="Blogs"
        data={latesPost?.slice(0, 3)}
      />
      }
    </>
  );
}

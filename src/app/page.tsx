import { fetchAPI } from "@/config/api";
import HomePageTemplate from "@/template/home-page";

async function getData() {
  const res = await fetchAPI({
    endpoint: "pages/34",
  });
   const testimonialsRes = await fetchAPI({
    endpoint: "testimonial",
  });
  const blogsRes = await fetchAPI({
    endpoint: "posts",
  });

  return {
    homepage: res,
    testimonials: testimonialsRes,
    blogs: blogsRes
  };
}

export default async function Home() {
  const {homepage, testimonials, blogs} = await getData();
  return (
    <>
      <HomePageTemplate 
        homepage={homepage}
        testimonials={testimonials}
        blogs={blogs}
      />
    </>
  );
}

import { fetchAPI } from "@/config/api";
import HomePageTemplate from "@/template/home-page";

async function getData() {
  try {
    const [res, testimonialsRes, blogsRes] = await Promise.all([
      fetchAPI({ endpoint: "pages/34" }),
      fetchAPI({ endpoint: "testimonial" }),
      fetchAPI({ endpoint: "posts?_embed" })
    ]);
    
    return {
      homepage: res,
      testimonials: testimonialsRes,
      blogs: blogsRes
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      homepage: null,
      testimonials: null,
      blogs: null
    };
  }
}

export default async function Home() {
  const { homepage, testimonials, blogs } = await getData();
  
  if (!homepage) {
    return <div className="h-screen flex justify-center items-center text-center">Error loading the data, please try again later.</div>;
  }

  return (
    <HomePageTemplate 
      homepage={homepage}
      testimonials={testimonials}
      blogs={blogs}
    />
  );
}

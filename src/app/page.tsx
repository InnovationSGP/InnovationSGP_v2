import { fetchAPI } from "@/config/api";
import HomePageTemplate from "@/template/home-page";

async function getData() {
  try {
    const [res, testimonialsRes, blogsRes] = await Promise.all([
      fetchAPI({ endpoint: "pages/34" }),
      fetchAPI({ endpoint: "testimonial" }),
      fetchAPI({
        endpoint:
          "posts?_embed=true&per_page=6&_fields=id,date,title,slug,excerpt,featured_media,_embedded,yoast_head_json",
      }),
    ]);

    // Validate blog posts data
    const validatedBlogs = Array.isArray(blogsRes)
      ? blogsRes.filter(
          (post) => post && post.id && post.title && post.title.rendered
        )
      : [];

    // Log information about the blog data fetched
    console.log(`Fetched ${validatedBlogs.length} validated blog posts`);
    if (validatedBlogs.length > 0) {
      console.log(
        "First post has embedded media:",
        !!validatedBlogs[0]._embedded
      );
      console.log(
        "First post has featured media:",
        !!validatedBlogs[0]._embedded?.["wp:featuredmedia"]?.[0]
      );
    }

    return {
      homepage: res,
      testimonials: testimonialsRes,
      blogs: validatedBlogs,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      homepage: null,
      testimonials: null,
      blogs: [],
    };
  }
}

export default async function Home() {
  const { homepage, testimonials, blogs } = await getData();

  if (!homepage) {
    return (
      <div className="h-screen flex justify-center items-center text-center">
        Error loading the data, please try again later.
      </div>
    );
  }

  return (
    <HomePageTemplate
      homepage={homepage}
      testimonials={testimonials}
      blogs={blogs}
    />
  );
}

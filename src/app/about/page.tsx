import AboutCompany from "@/template/about/about-company";
import JustConsultancy from "@/template/about/just-consultancy";
import Team from "@/template/about/team";
import Logo from "@/template/about/logo";
import Banner from "@/components/banner";
import Testimonials from "@/template/home-page/testimonials";
import { fetchAPI } from "@/config/api";

export async function generateMetadata() {
  const {yoast_head_json} = await fetchAPI({ endpoint: "pages/91" })
  const yoast = yoast_head_json
  return {
    title: yoast.title.replace(/&#0*39;/g, "'"), // decode HTML entity
    description: yoast.og_description, // you can add more if available
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
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
    } as any,
  };
}

async function getData() {
  try {
    const res = await fetchAPI({
      endpoint: "pages/91",
    });
    const memberRes = await fetchAPI({
      endpoint: "members?_embed",
    });
    const testimonialsRes = await fetchAPI({
      endpoint: "testimonial",
    });

    return {
      aboutpage: res,
      members: memberRes,
      testimonials: testimonialsRes,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      aboutpage: null,
      members: [],
      testimonials: [],
    };
  }
}

export default async function About() {
  const { aboutpage, members, testimonials } = await getData();

  // If the aboutpage data is missing, display a fallback message or error
  if (!aboutpage) {
    return (
      <div className="h-screen flex justify-center items-center text-center">
        Error loading About page data. Please try again later.
      </div>
    );
  }

  const {
    about_us_label,
    about_us_plain_title,
    about_us_color_title,
    about_us_discription,
    about_us_button_link,
    about_us_card,
    about_label,
    about_plain_title,
    about_color_title,
    about_caption,
    about_icon_list,
    about_list,
    about_images,
    about_section_button_url,
    home_client,
      about_customers_impacted

  } = aboutpage.acf;

  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / About"
        headingText="About Us"
        description="Innovating with purpose, leading with strategy, and transforming at scale.."
      />
      <AboutCompany
        data={{
          about_us_label,
          about_us_plain_title,
          about_us_color_title,
          about_us_discription,
          about_us_button_link,
          about_us_card,
        }}
      />
      <JustConsultancy
        data={{
          about_label,
          about_plain_title,
          about_color_title,
          about_caption,
          about_icon_list,
          about_list,
          about_images,
          about_section_button_url,
        }}
      />
      <Team data={members} />
      <Testimonials data={{ testimonials }} />
      <Logo data={home_client} />
    </>
  );
}

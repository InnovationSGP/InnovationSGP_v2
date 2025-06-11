import AboutCompany from "@/template/about/about-company";
import JustConsultancy from "@/template/about/just-consultancy";
import Team from "@/template/about/team";
import Logo from "@/template/about/logo";
import Banner from "@/components/banner";
import Testimonials from "@/template/home-page/testimonials";
import { fetchAPI } from "@/config/api";

async function getData() {
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
}

export default async function About() {
  const { aboutpage, members, testimonials } = await getData();

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
    home_client
  } = aboutpage.acf;
  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / About "
        headingText=" About Us"
        description=" Innovating with purpose, leading with strategy, and transforming at scale.."
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
          about_section_button_url
        }}
      />
      <Team data={members} />
      <Testimonials data={{testimonials}}/>
      <Logo data={home_client}/>
    </>
  );
}

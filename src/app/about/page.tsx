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
    endpoint: "members",
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
  console.log("🚀 ~ About ~ aboutpage:", testimonials);

  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / About "
        headingText=" About Us"
        description=" Innovating with purpose, leading with strategy, and transforming at scale.."
      />
      <AboutCompany />
      <JustConsultancy />
      <Team />
      <Testimonials />
      <Logo />
    </>
  );
}


import AboutCompany from "@/template/about/about-company";
import JustConsultancy from "@/template/about/just-consultancy";
import Team from "@/template/about/team";
import Logo from "@/template/about/logo";
import Banner from "@/components/banner";



export default function Home() {
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
      <Logo />





    </>

  );
}

import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import Governance from "@/template/sector/governance";
import Healthcare from "@/template/sector/healthcare";
import WorkProcess from "@/template/services/work-process";

async function getData() {
  const res = await fetchAPI({
    endpoint: "pages/31",
  });

  return {
    sectorPage: res,
  };
}

export default async function Home() {
  const { sectorPage } = await getData();
  console.log("🚀 ~ Home ~ sectorPage:", sectorPage)
  
  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / Sector"
        headingText="Sector"
        description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
      />

      <Healthcare />
      <WorkProcess
        label="Public Sector"
        heading="Enabling Smarter Governance"
        colorText="and Public Services"
        mainImage="/images/about.png"
        overlayImage="/images/about.png"
        overlayPosition="left"
        bgColor="#ffffff"
        variant="mission"
        buttonText="Learn More"
        buttonLink="/"
        highlightImage
        steps={[
          {
            title: "Not shown",
            description:
              "We help government agencies streamline processes, embrace digital transformation, and better serve citizens. With secure, scalable solutions, we empower public institutions to operate with transparency and agility.",
          },
        ]}
      />

      <WorkProcess
        label="Retail & Consumer Products"
        lists={[
          "• Fill form\n• Upload resume",
          "• Get scheduled\n• Join Zoom call",
        ]}
        heading="Driving Retail Forward with "
        colorText="Smart Tech"
        mainImage="/images/about.png"
        overlayImage="/images/about.png"
        overlayPosition="right"
        bgColor="#ffffff"
        variant="mission"
        buttonLink="/"
        highlightImage
        reverse={true}
        steps={[
          {
            title: "Not shown",
            description:
              "Stay competitive in today’s fast-moving consumer landscape with strategies designed for agility and innovation. We empower retail and consumer product businesses to deliver exceptional customer experiences, optimize operations, and drive growth through digital transformation.",
          },
        ]}
      />

      <Governance />
    </>
  );
}

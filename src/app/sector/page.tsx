import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import Healthcare from "@/template/sector/healthcare";
import LeftRightCard from "@/template/services/left-right-card";

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
  const data = sectorPage?.acf?.left_right_section;

  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / Sectors"
        headingText="Public & Private Sectors"
        description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
      />
      <Healthcare data={data?.[0]} />
      {data?.slice(1)?.map((item: any, idx: any) => {
        return <LeftRightCard key={idx} data={item} id={idx}/>
      })}
    </>
  );
}

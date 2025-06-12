import Banner from "@/components/banner";
import { fetchAPI } from "@/config/api";
import Healthcare from "@/template/sector/healthcare";
import LeftRightCard from "@/template/services/left-right-card";

async function getData() {
  try {
    const res = await fetchAPI({
      endpoint: "pages/31",
    });

    return {
      sectorPage: res,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      sectorPage: null, // fallback if the fetch fails
    };
  }
}

export default async function Home() {
  const { sectorPage } = await getData();

  // If the data is not available, show an error message
  if (!sectorPage) {
    return (
      <div className="h-screen flex justify-center items-center text-center">
        Error loading the sector page. Please try again later.
      </div>
    );
  }

  const data = sectorPage?.acf?.left_right_section;

  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / Sector"
        headingText="Sector"
        description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
      />
      <Healthcare data={data?.[0]} />
      {data?.slice(1)?.map((item: any, idx: any) => {
        return <LeftRightCard key={idx} data={item} id={idx} />;
      })}
    </>
  );
}

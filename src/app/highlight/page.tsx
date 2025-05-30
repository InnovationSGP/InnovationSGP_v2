import Banner from "@/components/banner";
import Treding from "@/template/highlight/treding";



export default function Home() {
  return (
    <>
      <Banner
        bgImage="/images/about-hero.png"
        labelText="Home / Intel / News and Highlights  "
        headingText="News and Highlights"
        description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
      />
      <Treding/>
      
    </>
  );
}

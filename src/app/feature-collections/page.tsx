import Banner from "@/components/banner";
import FeatureTopics from "@/template/feature-collections/feature-topics";
import Blogcard from "@/template/services/blogcard";



export default function Home() {
    return (
        <>
            <Banner
                bgImage="/images/about-hero.png"
                labelText="Home / Intel / Feature Collections "
                headingText="Feature Collections"
                description="Strategic solutions tailored to disrupt, adapt, and lead across key industries"
            />
            <FeatureTopics />
            <div className="-mt-24">
                <Blogcard showLabel={false} showHeading={false} />
            </div>

        </>

    );
}

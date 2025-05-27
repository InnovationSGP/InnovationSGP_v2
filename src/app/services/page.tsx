import WorkProcess from "@/template/services/work-process";
import Hero from "../../template/services/hero";
import Blogcard from "@/template/services/blogcard";


export default function Home() {
  return (
    <>
      <Hero />
      <WorkProcess
        lists={[]}

        heading="We follow clear and simple steps to"
        colorText=" deliver the right solution"
        mainImage="/images/about.png"
        overlayImage="/images/about.png"
        overlayPosition="right"
        bgColor="#EFF7FF"
        variant="withSteps"
        steps={[
          { title: "Business Plan", description: "Collaboratively supply bricks to reinvent the unique time" },
          { title: "Market Research", description: "Deliver results-oriented methods with confidence" },
          { title: "Strategy Design", description: "Efficiently architect robust deliverables with quality" },
          { title: "Execution & Review", description: "Drive forward through iterative value testing" },
        ]}
      />
      <WorkProcess
        lists={['• Fill form\n• Upload resume', '• Get scheduled\n• Join Zoom call']}
        heading="Capability"
        colorText=" Development"
        mainImage="/images/about.png"
        overlayImage="/images/about.png"
        overlayPosition="left"
        bgColor="#ffffff"
        variant="mission"
        highlightImage
        steps={[
          {
            title: 'Not shown', description: 'Our Capability Development service empowers your organization to build and strengthen the skills, processes, and systems needed for long-term success. We begin with a deep evaluation of your current capabilities, identifying strengths, gaps, and areas of improvement across teams and functions. From there, we design customized development programs tailored to your strategic goals—whether its leadership training, process optimization, or workforce upskilling. Our approach includes building competency frameworks, aligning talent with business objectives, and implementing scalable learning initiatives.'
          },
        ]}
      />
      <WorkProcess
        lists={['• Fill form\n• Upload resume', '• Get scheduled\n• Join Zoom call']}
        heading="Change and Transformation"
        colorText=" Management"
        mainImage="/images/about.png"
        overlayImage="/images/about.png"
        overlayPosition="right"
        bgColor="#ffffff"
        variant="mission"
        buttonText="Learn More"
        buttonLink="/"
        highlightImage
        reverse={true}
        steps={[
          {
            title: 'Not shown', description: 'Our Capability Development service empowers your organization to build and strengthen the skills, processes, and systems needed for long-term success. We begin with a deep evaluation of your current capabilities, identifying strengths, gaps, and areas of improvement across teams and functions. From there, we design customized development programs tailored to your strategic goals—whether its leadership training, process optimization, or workforce upskilling. Our approach includes building competency frameworks, aligning talent with business objectives, and implementing scalable learning initiatives.'
          },
        ]}
      />

      <Blogcard
        labelText="Blogs"
        headingMain="Read our latest "
        headingSub="Blog posts"
       
      />




    </>

  );
}

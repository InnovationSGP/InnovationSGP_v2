import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "./blog-card";

// Dummy blogPosts, you can move this to props later if needed
export const blogPosts = [
  {
    id: 1,
    title: "Implement customized user innovative success",
    description:
      "Conveniently extend vertical benefits and forward processes. Holisticly impact alternative.",
    author: "Smit Samus",
    image: "/images/about.png",
    authorImage: "/images/about.png",
    link: "/",
  },
  {
    id: 2,
    title: "Boost your marketing with automation",
    description:
      "Seamlessly optimize scalable action items after pandemic-ready strategies.",
    author: "Jane Doe",
    image: "/images/about.png",
    authorImage: "/images/about.png",
    link: "/",
  },
  {
    id: 3,
    title: "Why UX is crucial for product success",
    description:
      "Objectively transition sticky paradigms for functional testing procedures.",
    author: "Alex Smith",
    image: "/images/about.png",
    authorImage: "/images/about.png",
    link: "/",
  },
  {
    id: 2,
    title: "Boost your marketing with automation",
    description:
      "Seamlessly optimize scalable action items after pandemic-ready strategies.",
    author: "Jane Doe",
    image: "/images/about.png",
    authorImage: "/images/about.png",
    link: "/",
  },
  {
    id: 3,
    title: "Why UX is crucial for product success",
    description:
      "Objectively transition sticky paradigms for functional testing procedures.",
    author: "Alex Smith",
    image: "/images/about.png",
    authorImage: "/images/about.png",
    link: "/",
  },
];

function Blogs({
  posts = blogPosts,
  labelText = "BLOGS",
  showLabel = true,
  showHeading = true,
  headingMain = "Read our latest",
  headingSub = "Blog posts",
}) {
  return (
    <div className="">
      <section className="container mx-auto px-4">
        <div className="text-center mb-10 pt-14">
          {showLabel && <Label>{labelText}</Label>}
          {showHeading && (
            <Heading colorText={headingSub} className="mt-3 text-black-20">
              {headingMain}
            </Heading>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {blogPosts?.map((post, idx) => (
            <BlogCard post={post} key={idx}/>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Blogs;

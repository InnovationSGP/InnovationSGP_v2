import React from "react";
import BlogCard from "../services/blog-card";
import Label from "@/components/ui/label";
import Heading from "@/components/ui/heading";

const Blogs = ({ data, title, colorTitle, label }: any) => {
  return (
    <section className="home_page_blog_gradient">
      <div className="container mx-auto px-3 !pt-16 pb-[117px]">
        <div className="flex justify-between flex-col text-center items-center gap-4 mb-12">
          {label && <Label>{label}</Label>}
          <Heading colorText={colorTitle} className="">
            {title}
          </Heading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((post: any, idx: number) => (
            <BlogCard post={post} key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;

import React from "react";
import BlogCard from "./blog-card";

function Blogs({data}:any) {
  return (
    <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((post: any, idx: number) => (
            <BlogCard post={post} key={idx} />
          ))}
        </div>
    </div>
  );
}

export default Blogs;

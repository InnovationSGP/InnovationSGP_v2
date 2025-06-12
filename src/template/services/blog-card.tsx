"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMediaURL } from "@/utils"; // Adjust path as needed

function BlogCard({ post }: any) {
  const [mediaURL, setMediaURL] = useState<string>("");

  useEffect(() => {
    const fetchMedia = async () => {
      if (post) {
        const url = await getMediaURL(post);
        setMediaURL(url);
      }
    };
    fetchMedia();
  }, [post]);

  if (!post) return null;

  return (
      <div
          key={post?.id}
          className="bg-white p-3 rounded-2xl border border-[#EDEDED] transition pb-4"
      >
        {mediaURL && (
            <Image
                src={mediaURL}
                width={500}
                height={300}
                alt={post?.title}
                className="rounded-2xl object-cover w-full h-[200px]"
            />
        )}
        <div className="px-3">
          <div className="mt-4 flex gap-4 items-center">
            <Image
                src={"/images/about.png"}
                width={40}
                height={40}
                alt={post?.author}
                className="rounded-full h-10 w-10 object-cover"
            />
            <h4 className="text-sm font-medium capitalize">
              <span className="text-gray-400">By</span> InnovationSGP
            </h4>
          </div>
          <div className="h-[1px] bg-[#0632321A] w-full my-[23px]" />
          <h2 className="text-2xl font-semibold pb-4 text-blue-30">
            <Link
                href={`/blog/${post?.slug}`}
                className="font-medium hover:underline font-dmsans"
            >
              {post?.title?.rendered}
            </Link>
          </h2>
          <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: post?.excerpt?.rendered }}
          />
          <div className="mt-6">
            <Link
                href={`/blog/single`}
                className="font-medium flex items-center gap-1 font-dmsans"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z"
                    fill="#000000"
                />
              </svg>
              Continue Reading
            </Link>
          </div>
        </div>
      </div>
  );
}

export default BlogCard;

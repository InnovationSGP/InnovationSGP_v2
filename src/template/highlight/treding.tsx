import Heading from "@/components/ui/heading";
import Label from "@/components/ui/label";
import { getMediaURL } from "@/utils";
import Link from "next/link";
import React from "react";

const HoverCard = ({ data }: any) => {
  return (
    <section className="container mx-auto px-4">
      <div className="mb-[50px] mt-[98px]">
        <Label>Trending</Label>
        <Heading colorText="News" className="mt-7">
          Featured
        </Heading>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="grid grid-cols-1 gap-6">
          {data?.slice(0, 2)?.map((post: any, index: number) => {
            const isTallCard = [0, 2, 4].includes(index);
            const minHeight = isTallCard ? "500px" : "300px";
            return (
              <div key={post?.id} className="w-full">
                <div
                  className="relative w-full rounded-xl overflow-hidden group"
                  style={{ minHeight }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url('${getMediaURL(post)}')` }}
                  />

                  <div className="absolute inset-0 p-10 bg-[#061830CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-between">
                    <div className="text-white">
                      <h3 className="text-xl font-bold">
                        {post?.title?.rendered}
                      </h3>
                      {post?.subtitle && (
                        <p className="text-sm max-w-md mt-4">{post.subtitle}</p>
                      )}
                    </div>

                    {post?.excerpt?.rendered && (
                      <div className="mt-4">
                        <div
                          className="text-sm max-w-md !text-white"
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.rendered,
                          }}
                        />
                      </div>
                    )}

                    {post?.slug && (
                      <div className="mt-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-white underline hover:text-white"
                        >
                          Read More →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
         <div className="grid grid-cols-1 gap-6">
          {data?.slice(2, 4)?.map((post: any, index: number) => {
            const isTallCard = [0, 2, 4].includes(index);
            const minHeight = isTallCard ?  "300px" : "500px";
            return (
              <div key={post?.id} className="w-full">
                <div
                  className="relative w-full rounded-xl overflow-hidden group"
                  style={{ minHeight }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url('${getMediaURL(post)}')` }}
                  />

                  <div className="absolute inset-0 p-10 bg-[#061830CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-between">
                    <div className="text-white">
                      <h3 className="text-xl font-bold">
                        {post?.title?.rendered}
                      </h3>
                      {post?.subtitle && (
                        <p className="text-sm max-w-md mt-4">{post.subtitle}</p>
                      )}
                    </div>

                    {post?.excerpt?.rendered && (
                      <div className="mt-4">
                        <div
                          className="text-sm max-w-md !text-white"
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.rendered,
                          }}
                        />
                      </div>
                    )}

                    {post?.slug && (
                      <div className="mt-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-white underline hover:text-white"
                        >
                          Read More →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-1 gap-6">
          {data?.slice(4, 6)?.map((post: any, index: number) => {
            const isTallCard = [0, 2, 4].includes(index);
            const minHeight = isTallCard ? "500px" : "300px";
            return (
              <div key={post?.id} className="w-full">
                <div
                  className="relative w-full rounded-xl overflow-hidden group"
                  style={{ minHeight }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url('${getMediaURL(post)}')` }}
                  />

                  <div className="absolute inset-0 p-10 bg-[#061830CC] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-between">
                    <div className="text-white">
                      <h3 className="text-xl font-bold">
                        {post?.title?.rendered}
                      </h3>
                      {post?.subtitle && (
                        <p className="text-sm max-w-md mt-4">{post.subtitle}</p>
                      )}
                    </div>

                    {post?.excerpt?.rendered && (
                      <div className="mt-4">
                        <div
                          className="text-sm max-w-md !text-white"
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.rendered,
                          }}
                        />
                      </div>
                    )}

                    {post?.slug && (
                      <div className="mt-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-white underline hover:text-white"
                        >
                          Read More →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HoverCard;

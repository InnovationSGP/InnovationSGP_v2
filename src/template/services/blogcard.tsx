import Heading from '@/components/ui/heading';
import Label from '@/components/ui/label';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Dummy blogPosts, you can move this to props later if needed
const blogPosts = [
  {
    id: 1,
    title: 'Implement customized user innovative success',
    description: 'Conveniently extend vertical benefits and forward processes. Holisticly impact alternative.',
    author: 'Smit Samus',
    image: '/images/about.png',
    authorImage: '/images/about.png',
    link: '/',
  },
  {
    id: 2,
    title: 'Boost your marketing with automation',
    description: 'Seamlessly optimize scalable action items after pandemic-ready strategies.',
    author: 'Jane Doe',
    image: '/images/about.png',
    authorImage: '/images/about.png',
    link: '/',
  },
  {
    id: 3,
    title: 'Why UX is crucial for product success',
    description: 'Objectively transition sticky paradigms for functional testing procedures.',
    author: 'Alex Smith',
    image: '/images/about.png',
    authorImage: '/images/about.png',
    link: '/',
  },
];

function Blogcard({
  posts = blogPosts,
  labelText = 'BLOGS',
   showLabel = true,
   showHeading = true,
  headingMain = 'Read our latest',
  headingSub = 'Blog posts',
}) {
  return (
    <div className="bg-[#EFF7FF]">
      <section className="container mx-auto px-4">
        <div className="text-center mb-10 pt-14">
         {showLabel && <Label>{labelText}</Label>}
           {showHeading && (
              <Heading colorText={headingSub} className="mt-3 text-black-20">
                {headingMain}
              </Heading>
            )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-3 rounded-2xl shadow-sm hover:shadow-md transition pb-4">
              <Image
                src={post.image}
                width={500}
                height={300}
                alt={post.title}
                className="rounded-2xl object-cover w-full h-[200px]"
              />
              <div className="px-3">
                <div className="mt-4 flex gap-4 items-center">
                  <Image
                    src={post.authorImage}
                    width={40}
                    height={40}
                    alt={post.author}
                    className="rounded-full h-10 w-10 object-cover"
                  />
                  <h4 className="text-sm font-medium">{post.author}</h4>
                </div>
                <h2 className="text-2xl font-semibold py-3 text-blue-30">{post.title}</h2>
                <p className="text-gray-600 text-md">{post.description}</p>
                <div className="mt-6">
                  <Link href={post.link} className="font-medium hover:underline">
                    Continue Reading
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Blogcard;

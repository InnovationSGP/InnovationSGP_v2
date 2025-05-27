import React from 'react'
import { blogPosts } from '../services/blogs'
import BlogCard from '../services/blog-card'
import Label from '@/components/ui/label'
import Heading from '@/components/ui/heading'

const Blogs = () => {
  return (
    <section className='home_page_blog_gradient'>
    <div className='container mx-auto px-3 py-[117px]'>
        <div className='flex justify-between flex-col text-center items-center gap-4 mb-12'>
            <Label>Blogs</Label>
            <Heading 
            colorText="Blog posts"
            className=""
             >Read our latest</Heading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogPosts.slice(0,3)?.map((post, idx) => (
            <BlogCard post={post} key={idx}/>
          ))}
        </div>
    </div>
    </section>
  )
}

export default Blogs
import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import React from 'react'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'

const Index = () => {
    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/get-all`, {
        method: 'get',
        credentials: 'include'
    })
   
    if (loading) return <Loading />
    return (
        <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
            {blogData && blogData.blog.length > 0
                ?
                blogData.blog.map(blog => <BlogCard key={blog._id} props={blog} />)
                :
                <div>Data Not Found.</div>
            }
        </div>
    )
}

export default Index
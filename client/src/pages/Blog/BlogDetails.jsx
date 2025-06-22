import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { RouteBlogAdd, RouteBlogEdit } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFetch'
import { getEnv } from '@/helpers/getEnv'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import Loading from '@/components/Loading'
import { useState, useEffect } from 'react'
import { FiEdit } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import moment from 'moment'
import { useSelector } from 'react-redux'
const BlogDetails = () => {
    const [refreshData, setRefreshData] = useState(false)
    const user = useSelector((state) => state.user)
    const { data: blogData, loading, error } = useFetch(`${getEvn('VITE_API_BASE_URL')}/blog/get-all`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

    const handleDelete = (id) => {
        const response = deleteData(`${getEvn('VITE_API_BASE_URL')}/blog/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast('success', 'Data deleted.')
        } else {
            showToast('error', 'Data not deleted.')
        }
    }

    const handleApproval = async (blogId, isApproved) => {
        try {
            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/blog/approve/${blogId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isApproved })
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            showToast('success', data.message)
            setRefreshData(!refreshData)
        } catch (error) {
            showToast('error', error.message)
        }
    }


    if (loading) return <Loading />
    return (
        <div>
            <Card>
                <CardHeader>
                    <div>
                        <Button asChild>
                            <Link to={RouteBlogAdd}>
                                Add Blog
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>

                        <TableHeader>
                            <TableRow>
                                <TableHead>Author </TableHead>
                                <TableHead>Category </TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Approval Status</TableHead>
                                <TableHead>Dated</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogData && blogData.blog.length > 0 ?

                                blogData.blog.map(blog =>
                                    <TableRow key={blog._id}>
                                        <TableCell>{blog?.author?.name}</TableCell>
                                        <TableCell>{blog?.category?.name}</TableCell>
                                        <TableCell>{blog?.title}</TableCell>
                                        <TableCell>{blog?.slug}</TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${blog?.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {blog?.isApproved ? 'Approved' : 'Pending'}
                                            </span>
                                        </TableCell>
                                        <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>

                                        <TableCell className="flex gap-3">
                                            <Button variant="outline" className="hover:bg-violet-500 hover:text-white" asChild>
                                                <Link to={RouteBlogEdit(blog._id)}>
                                                    <FiEdit />
                                                </Link>
                                            </Button>
                                            <Button onClick={() => handleDelete(blog._id)} variant="outline" className="hover:bg-violet-500 hover:text-white" >
                                                <FaRegTrashAlt />
                                            </Button>
                                            {user?.user?.role === 'admin' && (
                                                <>
                                                    {!blog?.isApproved && (
                                                        <Button
                                                            onClick={() => handleApproval(blog._id, true)}
                                                            variant='default'
                                                            size='sm'
                                                            className='bg-green-600 hover:bg-green-700'
                                                        >
                                                            Approve
                                                        </Button>
                                                    )}
                                                    {blog?.isApproved && (
                                                        <Button
                                                            onClick={() => handleApproval(blog._id, false)}
                                                            variant='outline'
                                                            size='sm'
                                                        >
                                                            Reject
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>

                                )

                                :

                                <TableRow>
                                    <TableCell colSpan="3">
                                        Data not found.
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>

                </CardContent>
            </Card>
        </div>
    )
}

export default BlogDetails

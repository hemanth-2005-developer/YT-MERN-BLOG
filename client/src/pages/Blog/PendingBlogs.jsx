
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useFetch } from '@/hooks/useFetch'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import Loading from '@/components/Loading'
import { useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'

const PendingBlogs = () => {
    const [refreshData, setRefreshData] = useState(false)
    const user = useSelector((state) => state.user)
    
    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/blog/pending-blogs`, {
        method: 'get',
        credentials: 'include'
    }, [refreshData])

    const handleApproval = async (blogId, isApproved) => {
        try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog/approve/${blogId}`, {
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
                    <h2 className="text-2xl font-bold">Pending Blog Approvals</h2>
                    <p className="text-gray-600">Review and approve blogs submitted by users</p>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Author</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Submitted Date</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogData && blogData.blog.length > 0 ?
                                blogData.blog.map(blog =>
                                    <TableRow key={blog._id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <img 
                                                    src={blog?.author?.avatar || '/default-avatar.png'} 
                                                    alt={blog?.author?.name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                {blog?.author?.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{blog?.category?.name}</TableCell>
                                        <TableCell className="max-w-xs truncate">{blog?.title}</TableCell>
                                        <TableCell>{moment(blog?.createdAt).format('DD-MM-YYYY')}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button
                                                onClick={() => handleApproval(blog._id, true)}
                                                variant='default'
                                                size='sm'
                                                className='bg-green-600 hover:bg-green-700'
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                onClick={() => handleApproval(blog._id, false)}
                                                variant='outline'
                                                size='sm'
                                                className='border-red-500 text-red-500 hover:bg-red-50'
                                            >
                                                Reject
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                                :
                                <TableRow>
                                    <TableCell colSpan="5" className="text-center py-8">
                                        No pending blogs for approval.
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

export default PendingBlogs

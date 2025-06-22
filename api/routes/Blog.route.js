import express from 'express'
import { addBlog, approveBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogByCategory, getRelatedBlog, search, showAllBlog, updateBlog } from '../controllers/Blog.controller.js'
import { authenticate } from '../middleware/authenticate.js'
import upload from '../config/multer.js'
import { onlyadmin } from '../middleware/onlyadmin.js'

const BlogRoute = express.Router()

BlogRoute.post('/add', authenticate, upload.single('file'), addBlog)
BlogRoute.get('/edit/:blogid', authenticate, editBlog)
BlogRoute.put('/update/:blogid', authenticate, upload.single('file'), updateBlog)
BlogRoute.delete('/delete/:blogid', authenticate, deleteBlog)
BlogRoute.put('/approve/:blogid', authenticate, onlyadmin, approveBlog)
BlogRoute.get('/show-all', authenticate, showAllBlog)
BlogRoute.get('/get-all', getAllBlogs)
BlogRoute.get('/get/:slug', getBlog)
BlogRoute.get('/get-related-blog/:category/:blog', getRelatedBlog)
BlogRoute.get('/get-blog-by-category/:category', getBlogByCategory)
BlogRoute.get('/search', search)

export default BlogRoute
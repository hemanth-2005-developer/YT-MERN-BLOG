import cloudinary from "../config/cloudinary.js"
import { handleError } from "../helpers/handleError.js"
import Blog from "../models/blog.model.js"
import { encode } from 'entities'
import Category from "../models/category.model.js"
export const addBlog = async (req, res, next) => {
    try {
        const data = JSON.parse(req.body.data)
        let featuredImage = ''
        if (req.file) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'yt-mern-blog', resource_type: 'auto' }
                )
                .catch((error) => {
                    next(handleError(500, error.message))
                });

            featuredImage = uploadResult.secure_url
        }

        // Check if the user is an admin
        const isAdmin = req.user && req.user.role === 'admin'

        const blog = new Blog({
            author: data.author,
            category: data.category,
            title: data.title,
            slug: `${data.slug}-${Math.round(Math.random() * 100000)}`,
            featuredImage: featuredImage,
            blogContent: encode(data.blogContent),
            isApproved: isAdmin // Auto-approve if admin creates the blog
        })

        await blog.save()

        const message = isAdmin 
            ? 'Blog added and published successfully.' 
            : 'Blog submitted successfully! It is now pending admin approval.'

        res.status(200).json({
            success: true,
            message: message
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const editBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const blog = await Blog.findById(blogid).populate('category', 'name')
        if (!blog) {
            next(handleError(404, 'Data not found.'))
        }
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const updateBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const data = JSON.parse(req.body.data)

        const blog = await Blog.findById(blogid)

        blog.category = data.category
        blog.title = data.title
        blog.slug = data.slug
        blog.blogContent = encode(data.blogContent)

        let featuredImage = blog.featuredImage

        if (req.file) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'yt-mern-blog', resource_type: 'auto' }
                )
                .catch((error) => {
                    next(handleError(500, error.message))
                });

            featuredImage = uploadResult.secure_url
        }

        blog.featuredImage = featuredImage

        await blog.save()


        res.status(200).json({
            success: true,
            message: 'Blog updated successfully.'
        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const deleteBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        await Blog.findByIdAndDelete(blogid)
        res.status(200).json({
            success: true,
            message: 'Blog Deleted successfully.',
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const showAllBlog = async (req, res, next) => {
    try {
        const user = req.user
        let blog;
        if (user.role === 'admin') {
            blog = await Blog.find().populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
        } else {
            blog = await Blog.find({ author: user._id }).populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
        }
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getBlog = async (req, res, next) => {
    try {
        const { slug } = req.params
        const blog = await Blog.findOne({ slug, isApproved: true }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()

        if (!blog) {
            return next(handleError(404, 'Blog not found or not approved.'))
        }

        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getRelatedBlog = async (req, res, next) => {
    try {
        const { category, blog } = req.params

        const categoryData = await Category.findOne({ slug: category })
        if (!categoryData) {
            return next(404, 'Category data not found.')
        }
        const categoryId = categoryData._id
        const relatedBlog = await Blog.find({ category: categoryId, slug: { $ne: blog }, isApproved: true }).lean().exec()
        res.status(200).json({
            relatedBlog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getBlogByCategory = async (req, res, next) => {
    try {
        const { category } = req.params

        const categoryData = await Category.findOne({ slug: category })
        if (!categoryData) {
            return next(404, 'Category data not found.')
        }
        const categoryId = categoryData._id

        // Only show approved blogs for public viewing
        const blog = await Blog.find({ category: categoryId, isApproved: true }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
        res.status(200).json({
            blog,
            categoryData
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
export const search = async (req, res, next) => {
    try {
        const { q } = req.query

        const blog = await Blog.find({ title: { $regex: q, $options: 'i' }, isApproved: true }).populate('author', 'name avatar role').populate('category', 'name slug').lean().exec()
        res.status(200).json({
            blog,
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const approveBlog = async (req, res, next) => {
    try {
        const { blogid } = req.params
        const { isApproved } = req.body

        await Blog.findByIdAndUpdate(blogid, { isApproved })

        res.status(200).json({
            success: true,
            message: `Blog ${isApproved ? 'approved' : 'rejected'} successfully.`
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getAllBlogs = async (req, res, next) => {
    try {
        const user = req.user
        let query = {}

        // Non-admin users can only see approved blogs
        if (!user || user.role !== 'admin') {
            query.isApproved = true
        }

        const blog = await Blog.find(query).populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}

export const getPendingBlogs = async (req, res, next) => {
    try {
        const blog = await Blog.find({ isApproved: false }).populate('author', 'name avatar role').populate('category', 'name slug').sort({ createdAt: -1 }).lean().exec()
        res.status(200).json({
            blog
        })
    } catch (error) {
        next(handleError(500, error.message))
    }
}
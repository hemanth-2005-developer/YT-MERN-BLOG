export const RouteIndex = '/'
export const RouteSignIn = '/sign-in'
export const RouteSignUp = '/sign-up'
export const RouteProfile = '/profile'

// Category Routes
export const RouteCategoryDetails = '/categories'
export const RouteAddCategory = '/category/add'
export const RouteCategoryEdit = (category_id) => {
  return category_id ? `/category/edit/${category_id}` : '/category/edit/:category_id'
}
export const RouteEditCategory = RouteCategoryEdit

// Blog Routes
export const RouteBlog = '/blog'
export const RouteBlogAdd = '/blog/add'
export const RouteBlogEdit = (blogid) => {
  return blogid ? `/blog/edit/${blogid}` : '/blog/edit/:blogid'
}
export const RouteBlogDetails = (category, blog) => {
  return category && blog ? `/blog/${category}/${blog}` : '/blog/:category/:blog'
}
export const RouteBlogByCategory = (category) => {
  return category ? `/blog/${category}` : '/blog/:category'
}

// Search
export const RouteSearch = (q) => {
  return q ? `/search?q=${q}` : '/search'
}

// Admin and Others
export const RouteCommentDetails = '/comments'
export const RouteUser = '/users'
export const RoutePendingBlogs = '/pending-blogs'

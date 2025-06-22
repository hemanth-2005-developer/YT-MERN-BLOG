
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout/Layout'
import Index from './pages/Index'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import AddBlog from './pages/Blog/AddBlog'
import BlogDetails from './pages/Blog/BlogDetails'
import EditBlog from './pages/Blog/EditBlog'
import AddCategory from './pages/Category/AddCategory'
import CategoryDetails from './pages/Category/CategoryDetails'
import EditCategory from './pages/Category/EditCategory'
import SearchResult from './pages/SearchResult'
import SingleBlogDetails from './pages/SingleBlogDetails'
import BlogByCategory from './pages/Blog/BlogByCategory'
import PendingBlogs from './pages/Blog/PendingBlogs'
import Comments from './pages/Comments'
import User from './pages/User'
import AuthRouteProtechtion from './components/AuthRouteProtechtion'
import OnlyAdminAllowed from './components/OnlyAdminAllowed'
import {
  RouteIndex,
  RouteSignIn,
  RouteSignUp,
  RouteProfile,
  RouteBlogAdd,
  RouteBlog,
  RouteBlogEdit,
  RouteAddCategory,
  RouteCategoryDetails,
  RouteCategoryEdit,
  RouteSearch,
  RouteBlogDetails,
  RouteBlogByCategory,
  RoutePendingBlogs,
  RouteCommentDetails,
  RouteUser
} from './helpers/RouteName'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={RouteIndex} element={<Index />} />
          <Route path={RouteSignIn} element={<SignIn />} />
          <Route path={RouteSignUp} element={<SignUp />} />
          <Route path={RouteSearch()} element={<SearchResult />} />
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />

          <Route path={RouteProfile} element={
            <AuthRouteProtechtion>
              <Profile />
            </AuthRouteProtechtion>
          } />

          <Route path={RouteBlogAdd} element={
            <AuthRouteProtechtion>
              <AddBlog />
            </AuthRouteProtechtion>
          } />

          <Route path={RouteBlog} element={
            <AuthRouteProtechtion>
              <BlogDetails />
            </AuthRouteProtechtion>
          } />

          <Route path={RouteBlogEdit(':id')} element={
            <AuthRouteProtechtion>
              <EditBlog />
            </AuthRouteProtechtion>
          } />

          <Route path={RouteAddCategory} element={
            <AuthRouteProtechtion>
              <OnlyAdminAllowed>
                <AddCategory />
              </OnlyAdminAllowed>
            </AuthRouteProtechtion>
          } />

          <Route path={RouteCategoryDetails} element={
            <AuthRouteProtechtion>
              <OnlyAdminAllowed>
                <CategoryDetails />
              </OnlyAdminAllowed>
            </AuthRouteProtechtion>
          } />

          <Route path={RouteCategoryEdit(':id')} element={
            <AuthRouteProtechtion>
              <OnlyAdminAllowed>
                <EditCategory />
              </OnlyAdminAllowed>
            </AuthRouteProtechtion>
          } />

          <Route path={RoutePendingBlogs} element={
            <AuthRouteProtechtion>
              <OnlyAdminAllowed>
                <PendingBlogs />
              </OnlyAdminAllowed>
            </AuthRouteProtechtion>
          } />

          <Route path={RouteCommentDetails} element={
            <AuthRouteProtechtion>
              <OnlyAdminAllowed>
                <Comments />
              </OnlyAdminAllowed>
            </AuthRouteProtechtion>
          } />

          <Route path={RouteUser} element={
            <AuthRouteProtechtion>
              <OnlyAdminAllowed>
                <User />
              </OnlyAdminAllowed>
            </AuthRouteProtechtion>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

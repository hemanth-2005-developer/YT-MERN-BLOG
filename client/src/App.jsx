
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
  RouteAddBlog,
  RouteBlog,
  RouteBlogEdit,
  RouteAddCategory,
  RouteCategoryDetails,
  RouteCategoryEdit,
  RouteSearchResult,
  RouteSingleBlogDetails,
  RouteBlogByCategory,
  RoutePendingBlogs,
  RouteComments,
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
          <Route path={RouteSearchResult} element={<SearchResult />} />
          <Route path={RouteSingleBlogDetails(':slug')} element={<SingleBlogDetails />} />
          <Route path={RouteBlogByCategory(':category')} element={<BlogByCategory />} />

          <Route path={RouteProfile} element={
            <AuthRouteProtechtion>
              <Profile />
            </AuthRouteProtechtion>
          } />

          <Route path={RouteAddBlog} element={
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

          <Route path={RouteComments} element={
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

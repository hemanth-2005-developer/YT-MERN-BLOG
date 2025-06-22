import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout/Layout";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AddBlog from "./pages/Blog/AddBlog";
import BlogDetails from "./pages/Blog/BlogDetails";
import EditBlog from "./pages/Blog/EditBlog";
import AddCategory from "./pages/Category/AddCategory";
import CategoryDetails from "./pages/Category/CategoryDetails";
import EditCategory from "./pages/Category/EditCategory";
import SearchResult from "./pages/SearchResult";
import SingleBlogDetails from "./pages/SingleBlogDetails";
import BlogByCategory from "./pages/Blog/BlogByCategory";
import PendingBlogs from "./pages/Blog/PendingBlogs";
import Comments from "./pages/Comments";
import User from "./pages/User";

import AuthRouteProtection from "./components/AuthRouteProtection";
import OnlyAdminAllowed from "./components/OnlyAdminAllowed";

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
  RouteUser,
} from "./helpers/RouteName";

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

          <Route
            path={RouteProfile}
            element={
              <AuthRouteProtection>
                <Profile />
              </AuthRouteProtection>
            }
          />

          <Route
            path={RouteBlogAdd}
            element={
              <AuthRouteProtection>
                <AddBlog />
              </AuthRouteProtection>
            }
          />

          <Route
            path={RouteBlog}
            element={
              <AuthRouteProtection>
                <BlogDetails />
              </AuthRouteProtection>
            }
          />

          <Route
            path={RouteBlogEdit(":blogid")}
            element={
              <AuthRouteProtection>
                <EditBlog />
              </AuthRouteProtection>
            }
          />

          <Route
            path={RouteAddCategory}
            element={
              <AuthRouteProtection>
                <OnlyAdminAllowed>
                  <AddCategory />
                </OnlyAdminAllowed>
              </AuthRouteProtection>
            }
          />

          <Route
            path={RouteCategoryDetails}
            element={
              <AuthRouteProtection>
                <OnlyAdminAllowed>
                  <CategoryDetails />
                </OnlyAdminAllowed>
              </AuthRouteProtection>
            }
          />

          <Route
            path={RouteCategoryEdit(":category_id")}
            element={
              <AuthRouteProtection>
                <OnlyAdminAllowed>
                  <EditCategory />
                </OnlyAdminAllowed>
              </AuthRouteProtection>
            }
          />

          <Route
            path={RoutePendingBlogs}
            element={
              <AuthRouteProtection>
                <OnlyAdminAllowed>
                  <PendingBlogs />
                </OnlyAdminAllowed>
              </AuthRouteProtection>
            }
          />

          <Route
            path={RouteCommentDetails}
            element={
              <AuthRouteProtection>
                <OnlyAdminAllowed>
                  <Comments />
                </OnlyAdminAllowed>
              </AuthRouteProtection>
            }
          />

          <Route
            path={RouteUser}
            element={
              <AuthRouteProtection>
                <OnlyAdminAllowed>
                  <User />
                </OnlyAdminAllowed>
              </AuthRouteProtection>
            }
          />

          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

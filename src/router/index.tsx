import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import { ErrorPage } from "./ErrorPage";
import Home from "../pages/Home";
import BlogDetail from "../pages/BlogDetail";
import CreatePost from "../pages/CreatePost";
import EditPost from "../pages/EditPost";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "post/:id", element: <BlogDetail /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "create",
        element: (
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Users from "../pages/Users";
import UserDetail from "../pages/Users/UserDetail";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
  {
    element: <MainLayout />, // ✅ Layout có Navbar
    children: [
      { path: "/", element: <Home /> },

      {
        path: "/users",
        children: [
          { index: true, element: <Users /> },
          { path: ":id", element: <UserDetail /> },
        ],
      },
    ],
  },
  { path: "/Login", element: <Login /> },
  { path: "/Register", element: <Register /> },
]);

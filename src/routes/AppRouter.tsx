import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
// import Login from "../pages/Login/Login";
// import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="m-auto">Page not found</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
      // {
      //   path: "/register",
      //   element: <Register />,
      // },
    ],
  },
]);

const AppRputer = () => {
  return <RouterProvider router={router} />;
};
export default AppRputer;

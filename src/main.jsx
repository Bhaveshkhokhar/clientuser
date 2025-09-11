import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./routes/App.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import Allchef from "./components/Allchef.jsx";
import Contact from "./components/Contact.jsx";
import Signup from "./components/Signup.jsx";
import Chef from "./components/chef.jsx";
import Profile from "./components/Profile.jsx";
import Yourbooking from "./components/yourbooking.jsx";
import ProfileDetailAdd from "./components/ProfileDetailAdd.jsx";
import ProfileDetailUpdate from "./components/ProfileDetailUpdate.jsx";
import PreBooking from "./components/PreBooking.jsx";
import BookingHistory from "./components/BookingHistory.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about-us", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/chefs/:type", element: <Allchef /> },
      { path: "/contact", element: <Contact /> },
      { path: "/sign-up", element: <Signup /> },
      { path: "/chef/:chefid", element: <Chef /> },
      { path: "/profile", element: <Profile /> },
      { path: "/yourbooking", element: <Yourbooking /> },
      { path: "/profiledetailAdd", element: <ProfileDetailAdd /> },
      { path: "/profiledetailUpdate", element: <ProfileDetailUpdate /> },
      { path: "/bookingDetail/:chefid", element: <PreBooking /> },
      {
        path: "/yourbookinghistory",
        element: <BookingHistory/>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

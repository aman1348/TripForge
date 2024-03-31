import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/Store/store";
import Starter from "./Pages/Starter";
import Navbar from "./Components/Navbar";
import Hero from "./Pages/Hero";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import Protected from "./features/auth/components/Protected";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";

import Logout from "./features/auth/components/Logout";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./features/auth/authSlice";
import UserDetails from "./features/User/components/UserDetails";
import { useEffect } from "react";
import UserProfile from "./Pages/UserProfile"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Starter />,
  },
  {
    path: "/starter",
    element: <Starter />,
  },
  {
    path: "/book-trip",
    element: (
      <Protected>
        <Hero></Hero>
      </Protected>
    ),
  },
  {
    path: "/user-profile",
    element: (<Protected>
      <UserProfile></UserProfile>
    </Protected>)
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, dispatch)
  const user = useSelector(selectLoggedInUser);
  // const checkedUser = useSelector(selectUserChecked);
  // // console.log('checked user is ', checkedUser);
  return (
    <div>


      {/* <Navbar ></Navbar> */}
      {/* <PastTrips></PastTrips> */}
      {/* <Hero ></Hero> */}
      {/* <UserDetails></UserDetails> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

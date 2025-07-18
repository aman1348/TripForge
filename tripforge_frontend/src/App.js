import "./App.css";
import {  useDispatch } from "react-redux";
import Starter from "./Pages/Starter";
import Hero from "./Pages/Hero";
import {
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
} from "./features/auth/authSlice";
import { useEffect } from "react";
import UserProfile from "./Pages/UserProfile"
import OTPPage from "./Pages/OTPPage";
import UpdatePasswordPage from "./Pages/UpdatePasswordPage";

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
  {
    path: "/otp",
    element: <OTPPage></OTPPage>
  },
  {
    path: "/update-password",
    element: <UpdatePasswordPage></UpdatePasswordPage>
  }
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch])
  // const user = useSelector(selectLoggedInUser);
  // const checkedUser = useSelector(selectUserChecked);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

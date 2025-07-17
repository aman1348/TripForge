import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { verifyOTPAsync } from "../authSlice";
import { useDispatch } from "react-redux";
import { updatePasswordAsync } from "../authSlice";
// import { Navigate } from "react-router-dom";
// import { getOtpAsync } from "../authSlice";
function UpdatePassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const location = useLocation();
  const [different_inputs, setDifferent_inputs] = useState(false);
  const token = location.state || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const otp_res = useSelector((state) => state.auth)
  const submit = async (data) => {
    console.log("password is ", data);
    console.log("token : ", token.token);
    if(data.password !== data.confirm_password) {
      setDifferent_inputs(true);
      return;
    }
    const response = await dispatch(
      updatePasswordAsync({
        password: data.password,
        token: token.token
      })
    );
    console.log("update password response : ", response);
    navigate('/login');

  }

  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-12 w-auto"
            src="https://i0.wp.com/tripforgeai.com/wp-content/uploads/2025/06/tripforgeai-logo-square.png?fit=300%2C300&ssl=1"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6"
            onSubmit={
              handleSubmit(submit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="otp"
                  {
                    ...register('password', {
                        required : "password is required",
                        // pattern : {
                        //     value : /^\d{6}$/,
                        //     message : 'OTP is not valid',
                        // },
                    })
                }
                  type="password"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="otp"
                  {
                    ...register('confirm_password', {
                        required : "confirm new Password",
                        // pattern : {
                        //     value : /^\d{6}$/,
                        //     message : 'OTP is not valid',
                        // },
                    })
                }
                  type="password"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {different_inputs && <p className='text-red-500 text-sm'>{"Confirm Password Not Same as new Password"}</p>}
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Confirm
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Send me back to{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default UpdatePassword;

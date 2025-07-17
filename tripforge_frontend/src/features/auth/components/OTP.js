import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { verifyOTPAsync } from "../authSlice";
import { useDispatch } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { getOtpAsync } from "../authSlice";
function OTP() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const location = useLocation();
  const email = location.state || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const otp_res = useSelector((state) => state.auth)
  const submit = async (data) => {
    console.log("otp is ", data);
    console.log("email : ", email);
    if(data.otp.length !== 6) {
      console.warn("invalid otp");
      return;
    }
    const response = await dispatch(
      verifyOTPAsync({
        otp: data.otp,
        email: email.email
      })
    );
    console.log("verification response : ", response.payload.token);
    
    if(response?.meta?.requestStatus === "fulfilled") {
      console.log("otp verified");
      navigate('/update-password', {
        state: {
          token: response.payload.token,
        },
      });
    }
    else {
      console.log(response?.payload?.err?.message);
      console.warn("inavlid OTP!");      
    }
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
            Enter OTP Sent to Your Email
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
                OTP
              </label>
              <div className="mt-2">
                <input
                  id="otp"
                  {
                    ...register('otp', {
                        required : "otp is required",
                        pattern : {
                            value : /^\d{6}$/,
                            message : 'OTP is not valid',
                        },
                    })
                }
                  type="text"
                  inputMode="numeric"         // mobile keyboard = numbers
                  pattern="[0-9]*"            // prevents non-numeric characters
                  onKeyDown={(e) => {
                    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];
                    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.otp && <p className='text-red-500 text-sm'>{errors.otp.message}</p>}
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                verify otp
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

export default OTP;

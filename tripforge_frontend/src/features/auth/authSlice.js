import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createUser, loginUser, signOut, checkAuth, get_otp, verifyOTP, updatePassword } from "./authAPI";
import { getUserInfoAsync } from "../User/userSlice";


const initialState = {
    loggedInUser: null,
    status: 'idle',
    response_status: 200,
    error: null,
    userChecked: false,
}

export const createUserAsync = createAsyncThunk(
    'user/createUser',
    async (userData) => {
        const response = await createUser(userData);
        return response.data;
    }
)
export const loginUserAsync = createAsyncThunk(
    'user/loginUser',
    async (loginInfo, { rejectWithValue }) => {
        try {

            const response = await loginUser(loginInfo);

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const getOtpAsync = createAsyncThunk(
    'user/get-otp',
    async (user_info, { rejectWithValue }) => {
        try {

            const response = await get_otp(user_info);

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const verifyOTPAsync = createAsyncThunk(
    'user/verifyotp',
    async (user_info, { rejectWithValue }) => {
        try {

            const response = await verifyOTP(user_info);

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const updatePasswordAsync = createAsyncThunk(
    'user/update-password',
    async (user_info, { rejectWithValue }) => {
        try {

            const response = await updatePassword(user_info);

            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

export const checkAuthAsync = createAsyncThunk(
    'user/checkAuth',
    async () => {
        try {
            const response = await checkAuth();
            return response.data;
        } catch (error) {
            // console.log(error);
        }
    }
)
export const signOutAsync = createAsyncThunk(
    'user/signOut',
    async (loginInfo) => {
        const response = await signOut(loginInfo);
        return response.data;
    }
)
export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                // SIGN UP
                state.status = 'loading';
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                // SIGN UP
                state.status = 'idle';

                if (typeof action.payload.email === "undefined") {
                    alert("registered user");
                }
                else {
                    state.loggedInUser = action.payload;

                    fetch("http://localhost:5000/userInfo/add-info", {
                        method: "POST",
                        body: JSON.stringify({ email: action.payload.email }),
                        headers: { "content-type": "application/json" },
                    });
                }

            })
            .addCase(loginUserAsync.pending, (state) => {
                // LOGIN
                state.status = 'loading';
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                // LOGIN
                state.status = 'idle';

                getUserInfoAsync({ email: action.payload.email });

                state.loggedInUser = action.payload;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                // LOGIN 
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(verifyOTPAsync.pending, (state) => {
                // verify OTP
                state.status = 'loading';
            })
            .addCase(verifyOTPAsync.fulfilled, (state) => {
                // verify OTP
                state.status = 'idle';
            })
            .addCase(verifyOTPAsync.rejected, (state, action) => {
                // verify OTP
                state.status = 'idle';
                state.error = action.payload;
                state.response_status = 404;
            })
            .addCase(updatePasswordAsync.pending, (state) => {
                // update password
                state.status = 'loading';
            })
            .addCase(updatePasswordAsync.fulfilled, (state) => {
                // update password
                state.status = 'idle';
            })
            .addCase(updatePasswordAsync.rejected, (state, action) => {
                // update password
                state.status = 'idle';
                state.error = action.payload;
                state.response_status = 404;
            })
            .addCase(getOtpAsync.pending, (state) => {
                // GET OTP
                state.status = 'loading';
            })
            .addCase(getOtpAsync.fulfilled, (state) => {
                //  GET OTP
                state.status = 'idle';
                state.status = 200;
            })
            .addCase(getOtpAsync.rejected, (state, action) => {
                //  GET OTP
                state.status = 'idle';
                state.error = action.payload;
                state.response_status = 404;
            })
            .addCase(signOutAsync.pending, (state) => {
                // SIGN OUT
                state.status = 'loading';
            })
            .addCase(signOutAsync.fulfilled, (state, action) => {
                // SIGN OUT
                state.status = 'idle';
                state.loggedInUser = null;
                // window.location.reload();

            })
            .addCase(checkAuthAsync.pending, (state) => {
                // CHECK AUTH
                state.status = 'loading';
            })
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                // CHECK AUTH
                state.status = 'idle';
                state.loggedInUser = action.payload;
                state.userChecked = true;
            })
            .addCase(checkAuthAsync.rejected, (state, action) => {
                // CHECK AUTH
                state.status = 'idle';
                state.userChecked = true;
            })
    }
})


export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export default authSlice.reducer
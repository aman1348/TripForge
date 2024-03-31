import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createUser, loginUser, signOut, checkAuth } from "./authAPI";
import { getUserInfoAsync } from "../User/userSlice";


const initialState = {
    loggedInUser: null,
    status: 'idle',
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
                state.status = 'loading';
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
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
                state.status = 'loading';
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.status = 'idle';

                getUserInfoAsync({ email: action.payload.email });

                state.loggedInUser = action.payload;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.payload;
            })
            .addCase(signOutAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signOutAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = null;
                // window.location.reload();

            })
            .addCase(checkAuthAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loggedInUser = action.payload;
                state.userChecked = true;
            })
            .addCase(checkAuthAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.userChecked = true;
            })
    }
})


export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export default authSlice.reducer
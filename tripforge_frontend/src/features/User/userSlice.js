import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createUserInfo, getUserInfo, updateUserInfo } from "./userAPI";

const initialState = {
    userInfo: null,
    status: 'idle',
    userDetails: null,
}

export const createUserInfoAsync = createAsyncThunk(
    'user/createUserInfo',
    async (userData) => {
        const response = await createUserInfo(userData);
        return response.data;
    }
)

export const updateUserInfoAsync = createAsyncThunk(
    'user/updateUserInfo',
    async (userData) => {
        const response = await updateUserInfo(userData);
        if (response.data) {
            return userData;
        }
    }
)


export const getUserInfoAsync = createAsyncThunk(
    'user/getUserInfo',
    async (email) => {
        const response = await getUserInfo(email);
        return response.data;
    }
)
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserInfoAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUserInfoAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.userInfo = action.payload;
            })
            .addCase(updateUserInfoAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                console.log("new user info : ", action.payload);
                state.userDetails = action.payload;
            })
            .addCase(getUserInfoAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUserInfoAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                // state.userInfo = action.payload;
                console.log("userdetails : ", action.payload[0]);
                state.userDetails = action.payload[0];
            })

    }
})


export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserDetails = (state) => state.user.userDetails;
export default userSlice.reducer
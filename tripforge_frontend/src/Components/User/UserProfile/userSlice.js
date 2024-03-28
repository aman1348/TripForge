import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, signOut } from './userAPI';

const initialState = {
  loggedInUserToken: null,
  status: 'idle',
  error: null,
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

// export const checkUserAsync = createAsyncThunk(
//   'user/checkUser',
//   async (loginInfo, {rejectWithValue}) => {
//     try {
//       const response = await checkUser(loginInfo);
//       // The value we return becomes the `fulfilled` action payload
//       return response.data;
//     } catch(err) {
//       console.log(err);
//       return rejectWithValue(err);
//     }
//   }
// );

// export const signOutAsync = createAsyncThunk(
//   'user/signOut',
//   async (loginInfo) => {
//     const response = await signOut(loginInfo);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const userSlice = createSlice({
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
        state.loggedInUserToken = action.payload;
      });
  },
});

export const selectloggedInUser = (state) => state.user.loggedInUserToken;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;

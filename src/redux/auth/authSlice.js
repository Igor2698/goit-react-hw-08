import { createSlice } from "@reduxjs/toolkit";
import { register, login, refreshUser, logout } from "./authOperations";


const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: 'null',
}

const handleRejected = (state, action) => {
    console.log(action)
    state.isLoading = false;
    state.error = action.payload;
};

const handlePending = (state) => {
    state.isLoading = true;
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(register.pending, handlePending)
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.isLoading = false;
            })
            .addCase(register.rejected, handleRejected)
            .addCase(login.pending, handlePending)
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLoggedIn = true;
                state.isLoading = false;
            })
            .addCase(login.rejected, handleRejected)
            .addCase(refreshUser.pending, (state) => {
                state.isRefreshing = true;
            }).addCase(refreshUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            }).addCase(refreshUser.rejected, (state) => {
                state.isRefreshing = false;

            })
            .addCase(logout.pending, handlePending)
            .addCase(logout.fulfilled, (state, _) => {
                state.isLoggedIn = false,
                    state.user = initialState.user;
                state.token = null;
                state.isLoading = false;
            })
            .addCase(logout.rejected, handleRejected)
    }
})

export const authReducer = AuthSlice.reducer;
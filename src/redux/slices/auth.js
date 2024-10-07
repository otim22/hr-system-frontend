import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../../services/authService";

const user = JSON.parse(localStorage.getItem("user"));

export const registerAccount = createAsyncThunk(
    "auth/registerAccount",
    async ({ name, email, password }, thunkAPI) => {
        try {
            const response = await AuthService.registerAccount(name, email, password);
            thunkAPI.dispatch(setMessage(response.data.message));
            return response.data;
        } catch (error) {
            const message =
                await (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await AuthService.login(email, password);
            return { user: data };
        } catch (error) {
            const message =
                await (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

const initialState = user ? 
                    { 
                        isLoggedIn: true, 
                        hasRegistered: true,
                        user
                    } 
                    : 
                    { 
                        isLoggedIn: false, 
                        user: null
                    };
 
const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerAccount.pending, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(registerAccount.fulfilled, (state) => {
                state.isLoggedIn = true;
            })
            .addCase(registerAccount.rejected, (state) => {
                state.isLoggedIn = false;
            })
            .addCase(login.pending, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = action.payload.user;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            })
    },
});

export default authSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import StaffService from "../../services/staffService";

export const registerStaff = createAsyncThunk(
    "staff/registerStaff",
    async ({ surname, other_names, date_of_birth, image_src }, thunkAPI) => {
        try {
            const response = await StaffService.registerStaff(surname, other_names, date_of_birth, image_src);
            thunkAPI.dispatch(setMessage(response.data.message));
            console.log(response)
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

const initialState = {
    surname: "",
    other_names: "",
    date_of_birth: "",
    image_src: "",
};

const staffSlice = createSlice({
    name: "staff",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerStaff.pending)
            .addCase(registerStaff.fulfilled)
            .addCase(registerStaff.rejected)
    },
});

export default staffSlice.reducer;
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosError } from "../../../utils/axiosError";
import { TCategories } from "../../../types/categories";

type TResponse = TCategories

const actionGetCategories = createAsyncThunk("", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI

    try {
        const response = await axios.get<TResponse>("/api/categories.json")
        return response.data
    } catch (error) {
        rejectWithValue(axiosError(error))
    }
})

export default actionGetCategories
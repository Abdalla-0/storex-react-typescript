import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosError } from "../../../utils/axiosError";
import { TProduct } from "../../../types";

type TResponse = TProduct[];

const actionGetProducts = createAsyncThunk("products/actionGetProducts", async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
        const response = await axios.get<TResponse>('/api/products.json')
        return response.data
    } catch (error) {
        rejectWithValue(axiosError(error))
    }
})

export default actionGetProducts;
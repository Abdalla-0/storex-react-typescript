import { createSlice } from "@reduxjs/toolkit";
import { TProduct, TLoading, isString } from "../../types";
import actionGetProducts from "./actions/actionGetProducts";
interface IProductsState {
    data: TProduct[],
    loading: TLoading,
    error: string | null
}

const initialState: IProductsState = {
    data: [],
    loading: "idle",
    error: null,
}


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actionGetProducts.pending, (state) => {
            state.error = null
            state.loading = "pending"
        })
        builder.addCase(actionGetProducts.fulfilled, (state, action) => {
            state.loading = "success"
            if (action.payload) {
                state.data = action.payload
            }
        })
        builder.addCase(actionGetProducts.rejected, (state, action) => {
            state.loading = "failed"
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        })
    }
})
export { actionGetProducts }
export default productsSlice.reducer;
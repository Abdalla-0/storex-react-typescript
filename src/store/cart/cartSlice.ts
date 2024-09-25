import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "../../types";

interface ICartState {
    data: TProduct[],
    // loading: TLoading,
    // error: string | null
}

const initialState: ICartState = {
    data: [],
    // loading: "idle",
    // error: null,
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            if (action.payload) {
                state.data.push(action.payload)
                console.log(state.data);
            }

        },
    },
})
export const { addToCart } = cartSlice.actions
export default cartSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { TMeasurement, TProduct } from "../../types";

interface ICartState {
    data: TProduct[],
}

const initialState: ICartState = {
    data: [],
}


export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.data.find((product) =>
                product.measurements.some((measurement) =>
                    action.payload.measurements.some((payloadMeasurement: TMeasurement) =>
                        measurement.measurement_id === payloadMeasurement.measurement_id
                    )
                )
            );

            if (isExist) {
                if (isExist.quantity) {
                    isExist.quantity += 1;
                }
            } else {
                state.data.push({ ...action.payload, quantity: 1 });
            }



        },
    },
})
export const { addToCart } = cartSlice.actions
export default cartSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import { TMeasurement, TProduct } from "../../types";
import { TTotals } from '../../types/totals';

interface ICartState {
    data: TProduct[],
    total: TTotals
}

const initialState: ICartState = {
    data: [],
    total: {
        totalQuantity: 0,
        totalPrice: 0,
        totalDiscount: 0,
    },
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
        getTotal: (state, action) => {
            state.total = action.payload

        }

    },
})
export const { addToCart, getTotal } = cartSlice.actions
export default cartSlice.reducer;
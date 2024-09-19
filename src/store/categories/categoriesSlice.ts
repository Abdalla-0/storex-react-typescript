import { createSlice } from '@reduxjs/toolkit';
import { isString, TLoading } from '../../types';
import { TCategories } from '../../types/categories';
import actionGetCategories from './actions/actionGetCategories';

interface ICategoriesState {
    data: TCategories[],
    loading: TLoading,
    error: string | null
}

const initialState: ICategoriesState = {
    data: [],
    loading: "idle",
    error: null
}

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actionGetCategories.pending, (state) => {
            state.error = null
            state.loading = "idle"
        })
        builder.addCase(actionGetCategories.fulfilled, (state, action) => {
            state.loading = "success"
            state.data = action.payload as unknown as []
        })
        builder.addCase(actionGetCategories.rejected, (state, action) => {
            state.loading = "failed"
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        })
    }
})


export default categoriesSlice.reducer
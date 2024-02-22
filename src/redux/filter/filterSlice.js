import { createSlice } from "@reduxjs/toolkit";

const filterInitialState = { name: '' };

const filterSlice = createSlice({
    name: 'filter',
    initialState: filterInitialState,
    reducers: {
        setFilter(state, action) {
            state.name = action.payload;
        }
    }
})

export const filterReducer = filterSlice.reducer;
export const { setFilter } = filterSlice.actions;
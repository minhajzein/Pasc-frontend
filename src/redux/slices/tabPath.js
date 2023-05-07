import { createSlice } from "@reduxjs/toolkit";

export const tabPathSlice = createSlice({
    name: 'tabPath',
    initialState: { value: '/' },
    reducers: {
        handleChange: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { handleChange } = tabPathSlice.actions

export default tabPathSlice.reducer
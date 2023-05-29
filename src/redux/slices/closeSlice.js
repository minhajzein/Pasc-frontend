import { createSlice } from "@reduxjs/toolkit";

export const closeSlice = createSlice({
    name: 'closed',
    initialState: {
        value: false
    },
    reducers: {
        handleClose: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { handleClose } = closeSlice.actions

export default closeSlice.reducer
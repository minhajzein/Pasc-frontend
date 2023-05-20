import { createSlice } from "@reduxjs/toolkit";

const adminCloseSlice = createSlice({
    name: 'adminRightManage',
    initialState: {
        close: false
    },
    reducers: {
        setAdminRight: (state, actions) => {
            state.close = actions.payload;
        }
    }
})

export const { setAdminRight } = adminCloseSlice.actions

export default adminCloseSlice.reducer

export const selectCurrentStateOfClose = (state)
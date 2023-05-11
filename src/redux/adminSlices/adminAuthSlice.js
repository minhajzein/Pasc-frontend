import { createSlice } from "@reduxjs/toolkit";

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
        adminToken: null
    },
    reducers: {
        setAdminCredentials: (state, actions) => {
            const { adminToken } = actions.payload
            state.adminToken = adminToken
        },
        adminLogout: (state, actions) => {
            state.adminToken = null
        }
    },

})

export const { setAdminCredentials, adminLogout } = adminAuthSlice.reducer

export default adminAuthSlice.reducer

export const selectCurrentAdminToken = (state => state.adminAuth.adminToken)
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice'
import closeSlice from './slices/closeSlice'
import adminAuthSlice from './adminSlices/adminAuthSlice'
import { apiSlice } from '../apis/apiSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userReducer,
        auth: authReducer,
        closed: closeSlice,
        adminToken: adminAuthSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware),
    devTools: true
})

export default store
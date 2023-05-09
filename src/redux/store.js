import { configureStore } from '@reduxjs/toolkit'
import tabPath from './slices/tabPath'
import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice'
import closeSlice from './slices/closeSlice'
import { apiSlice } from '../apis/apiSlice'

export const store = configureStore({
    reducer: {
        tabValue: tabPath,
        [apiSlice.reducerPath]: apiSlice.reducer,
        user: userReducer,
        auth: authReducer,
        closed: closeSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware),
    devTools: true
})

export default store
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice'
import closeSlice from './slices/closeSlice'
import adminRighclose from './adminSlices/adminRighclose'
import adminAuthSlice from './adminSlices/adminAuthSlice'
import eventSlice from './slices/eventSlice'
import { adminApiSlice } from '../apis/adminApiSlice'
import { apiSlice } from '../apis/apiSlice'

///⚡⚡⚡⚡⚡⚡ imports ⚡⚡⚡⚡⚡⚡

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [adminApiSlice.reducerPath]: adminApiSlice.reducer,
        user: userReducer,
        auth: authReducer,
        events: eventSlice,
        closed: closeSlice,
        adminToken: adminAuthSlice,
        adminClose: adminRighclose
    },
    middleware: (getDefaultMiddleware) => {
        const allMiddleware = [
            apiSlice.middleware,
            adminApiSlice.middleware
        ];
        return getDefaultMiddleware({ serializableCheck: false }).concat(
            ...allMiddleware
        );
    },
    devTools: true
})

export default store
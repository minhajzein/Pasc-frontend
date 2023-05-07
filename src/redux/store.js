import { configureStore } from '@reduxjs/toolkit'
import tabPath from './slices/tabPath'
import user from './slices/userSlice'

export const store = configureStore({
    reducer: {
        tabValue: tabPath,
        user: user
    }
})

export default store
import { configureStore } from '@reduxjs/toolkit'
import tabPath from './reducers/tabPath'

export const store = configureStore({
    reducer: {
        tabValue: tabPath
    }
})

export default store
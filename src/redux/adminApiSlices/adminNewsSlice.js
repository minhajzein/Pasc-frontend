import { createSlice } from "@reduxjs/toolkit";

const adminNewsSlice = createSlice({
    name: 'adminNews',
    initialState: {
        news: null
    },
    reducers: {
        setNews: (state, action) => {
            state.news = action.payload;
        }
    }
})

export const { setNews } = adminNewsSlice.actions

export default adminNewsSlice.reducer
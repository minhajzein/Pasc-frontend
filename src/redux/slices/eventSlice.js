import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        events: []
    },
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload
        }
    }
})

export const { setEvents } = eventSlice.actions

export default eventSlice.reducer
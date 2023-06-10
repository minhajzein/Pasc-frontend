import { adminApiSlice } from "../../apis/adminApiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";


const eventsAdapter = createEntityAdapter({})

const initialState = eventsAdapter.getInitialState()

const adminEventsApiSlice = adminApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: () => '/events',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: async (responseData, meta, args) => {
                const loadedEvents = await responseData.map(event => {
                    event.id = event._id
                    return event
                })
                return eventsAdapter.setAll(initialState, loadedEvents)

            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Event', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Event', id }))
                    ]
                } else return [{
                    type: 'Event', id: 'LIST'
                }]
            }
        }),
        addEvent: builder.mutation({
            query: (credentials) => ({
                url: '/addEvent',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Event']
        }),
        editEvent: builder.mutation({
            query: (credentials) => ({
                url: '/editEvent',
                method: 'PATCH',
                body: { ...credentials }
            }),
            invalidatesTags: ['Event']
        })
    })
})


export const {
    useGetEventsQuery,
    useAddEventMutation,
    useEditEventMutation,
    usePrefetch
} = adminEventsApiSlice


export const selectEventsResult = adminEventsApiSlice.endpoints.getEvents.select()

const selectEventData = createSelector(
    selectEventsResult,
    eventResult => eventResult.data
)


export const {
    selectAll: selectAllEvents,
    selectById: selectEventById,
    selectIds: selectEventsIds
} = eventsAdapter.getSelectors(state => selectEventData(state) ?? initialState)
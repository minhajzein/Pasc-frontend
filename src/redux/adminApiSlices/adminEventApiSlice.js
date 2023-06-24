
import { adminApiSlice } from "../../apis/adminApiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";



const eventsAdapter = createEntityAdapter({})

const initialState = eventsAdapter.getInitialState()

const eventsApiSlice = adminApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminGetEvents: builder.query({
            query: () => ({
                url: '/events',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
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
                        { type: 'Events', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Events', id }))
                    ]
                } else return [{
                    type: 'Events', id: 'LIST'
                }]
            }
        }),
        adminAddEvent: builder.mutation({
            query: (credentials) => ({
                url: '/addEvent',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Events']
        }),
        adminEditEvent: builder.mutation({
            query: (credentials) => ({
                url: '/editEvent',
                method: 'PATCH',
                body: { ...credentials }
            }),
            invalidatesTags: ['Events']
        }),
        adminDeleteEvent: builder.mutation({
            query: (credentials) => ({
                url: '/deleteEvent',
                method: 'DELETE',
                body: { ...credentials }
            }),
            invalidatesTags: ['Events']
        })
    })
})


export const {
    useAdminGetEventsQuery,
    useAdminAddEventMutation,
    useAdminEditEventMutation,
    useAdminDeleteEventMutation,
    usePrefetch
} = eventsApiSlice


export const selectEventsResult = eventsApiSlice.endpoints.adminGetEvents.select()

const selectEventData = createSelector(
    selectEventsResult,
    eventResult => eventResult.data
)


export const {
    selectAll: selectAllEvents,
    selectById: selectEventById,
    selectIds: selectEventsIds
} = eventsAdapter.getSelectors(state => selectEventData(state) ?? initialState)
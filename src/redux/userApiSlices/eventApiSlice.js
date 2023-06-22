import { apiSlice } from '../../apis/apiSlice'
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'


const eventsAdapter = createEntityAdapter({})

const initialState = eventsAdapter.getInitialState()


const eventApiSlice = apiSlice.injectEndpoints({
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
        })


    })
})



export const {
    usePrefetch,
    useGetEventsQuery
} = eventApiSlice




export const selectEventsResult = eventApiSlice.endpoints.getEvents.select()

const selectEventData = createSelector(
    selectEventsResult,
    eventResult => eventResult.data
)


export const {
    selectAll: selectAllEvents,
    selectById: selectEventById,
    selectIds: selectEventsIds
} = eventsAdapter.getSelectors(state => selectEventData(state) ?? initialState)
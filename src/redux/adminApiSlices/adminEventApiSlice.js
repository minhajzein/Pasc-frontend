import { adminApiSlice } from "../../apis/adminApiSlice";

const adminEventsApiSlice = adminApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        events: builder.mutation({
            query: () => ({
                url: '/events',
                method: 'GET'
            }),
            providesTags: ['modify-events'],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled
                    return result.data
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        addEvent: builder.mutation({
            query: (credentials) => ({
                url: '/addEvent',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['modify-events']
        })
    })
})


export const {
    useEventsMutation,
    useAddEventMutation,
    usePrefetch
} = adminEventsApiSlice
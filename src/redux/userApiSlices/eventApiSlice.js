import { apiSlice } from '../../apis/apiSlice'

const eventApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        events: builder.mutation({
            query: () => ({
                url: '/events',
                method: 'GET'
            }),
            providesTags: ['Events'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled
                    return result.data
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
})



export const {
    useEventsMutation,
    usePrefetch
} = eventApiSlice
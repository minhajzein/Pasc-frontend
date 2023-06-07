import { apiSlice } from "../../apis/apiSlice";

const newsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        news: builder.mutation({
            query: () => ({
                url: '/news',
                method: 'GET'
            }),
            providesTags: ['News'],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
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



export const { useNewsMutation, usePrefetch } = newsApiSlice
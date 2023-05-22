import { adminApiSlice } from "../../apis/adminApiSlice";
import { setAdminCredentials } from "../adminSlices/adminAuthSlice";

const adminNewsApiSlice = adminApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        news: builder.mutation({
            query: () => ({
                url: '/news',
                method: 'GET'
            }),
            providesTags: ['modify-news'],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled
                    return result.data
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        createNews: builder.mutation({
            query: (credential) => ({
                url: '/addNews',
                method: 'POST',
                body: { ...credential }
            }),
            providesTags: ['modify-news']
        })
    })
})


export const {
    useNewsMutation,
    useCreateNewsMutation,
    usePrefetch
} = adminNewsApiSlice
import { adminApiSlice } from "../../apis/adminApiSlice";
import { setNews } from "./adminNewsSlice";

const adminNewsApiSlice = adminApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        news: builder.mutation({
            query: () => ({
                url: '/news',
                method: 'GET'
            }),
            providesTags: ['admin-news'],
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const data = await queryFulfilled
                    dispatch(setNews(data.news));
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
})
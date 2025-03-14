import { adminApiSlice } from "../../apis/adminApiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";




const newsAdapter = createEntityAdapter({})

const initialState = newsAdapter.getInitialState()

const adminNewsApiSlice = adminApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNews: builder.query({
            query: () => ({
                url: '/news',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            keepUnusedDataFor: 5,
            transformResponse: async (responseData, meta, args) => {
                const loadedNews = await responseData.map(news => {
                    news.id = news._id
                    return news
                })
                return newsAdapter.setAll(initialState, loadedNews)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'News_cache', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'News_cache', id }))
                    ]
                } else return [{ type: 'News_cache', id: 'LIST' }]
            }
        }),
        createNews: builder.mutation({
            query: (credential) => ({
                url: '/addNews',
                method: 'POST',
                body: { ...credential }
            }),
            invalidatesTags: ['News_cache']
        }),
        editEvent: builder.mutation({
            query: (credentials) => ({
                url: '/editNews',
                method: 'PATCH',
                body: { ...credentials }
            }),
            invalidatesTags: ['News_cache']
        }),
        deleteNews: builder.mutation({
            query: id => ({
                url: '/deleteNews',
                method: 'DELETE',
                body: { ...id }
            }),
            invalidatesTags: ['News_cache']
        })
    })
})


export const {
    useGetNewsQuery,
    useCreateNewsMutation,
    useEditEventMutation,
    useDeleteNewsMutation,
    usePrefetch
} = adminNewsApiSlice


export const selectNewsResult = adminNewsApiSlice.endpoints.getNews.select()


const selectNewsData = createSelector(
    selectNewsResult,
    newsResult => newsResult.data
)


export const {
    selectAll: selectAllNews,
    selectById: selectNewsById,
    selectIds: selectNewsIds
} = newsAdapter.getSelectors(state => selectNewsData(state) ?? initialState)
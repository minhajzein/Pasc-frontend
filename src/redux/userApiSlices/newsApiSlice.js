import { apiSlice } from "../../apis/apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";


const newsAdapter = createEntityAdapter({})

const initialState = newsAdapter.getInitialState()


const newsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNews: builder.query({
            query: () => ({
                url: '/news',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            keepUnusedDataFor: 5,
            transformResponse: async (responseData, meta, args) => {
                const loadedNews = await responseData.map(news => {
                    news.id = news._id
                    return news
                })
                return newsAdapter.setAll(initialState, loadedNews)
            },
            providesTags: (result, error, args) => {
                if (result?.ids) {
                    return [
                        { type: 'News', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'News', id }))
                    ]
                } else return [{ type: 'News', id: 'LIST' }]
            }
        }),

    })
})



export const {
    useGetNewsQuery,
    usePrefetch
} = newsApiSlice


export const selectNewsResult = newsApiSlice.endpoints.getNews.select()

const selectNewsData = createSelector(
    selectNewsResult,
    newsResult => newsResult.data
)


export const {
    selectAll: selectAllNews,
    selectById: selectNewsById,
    selectIds: selectNewsIds
} = newsAdapter.getSelectors(state => selectNewsData(state) ?? initialState)
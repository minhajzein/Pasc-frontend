import { adminApiSlice } from "../../apis/adminApiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";


const requestAdapter = createEntityAdapter({})

const initialState = requestAdapter.getInitialState()

const requestApiSlice = adminApiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllRequests: builder.query({
            query: () => '/requests',
            validateStatus: (response, result) => {
                return response.status === 200 && !result?.success
            },
            keepUnusedDataFor: 5,
            transformResponse: async (responseData, meta, args) => {
                const loadedRequests = await responseData.map(request => {
                    request.id = request._id
                    return request
                })
                return requestAdapter.setAll(initialState, loadedRequests)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Requests', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Requests', id }))
                    ]
                } else return [{ type: 'Requests', id: 'LIST' }]
            }
        }),
        approveRequest: builder.mutation({
            query: (credentials) => ({
                url: '/approve',
                method: 'PATCH',
                body: { ...credentials }
            }),
            invalidatesTags: ['Requests']
        })
    })
})



export const {
    useGetAllRequestsQuery,
    useApproveRequestMutation
} = requestApiSlice


export const selectRequestResult = requestApiSlice.endpoints.getAllRequests.select()


const selectRequestData = createSelector(
    selectRequestResult,
    reqeustData => reqeustData.data
)


export const {
    selectAll: selectAllRequests,
    selectIds: selectRequestsIds,
    selectById: selectRequestById
} = requestAdapter.getSelectors(state => selectRequestData(state) ?? initialState)
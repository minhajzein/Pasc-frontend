import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { adminApiSlice } from "../../apis/adminApiSlice";



const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const userApiSlice = adminApiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            keepUnusedDataFor: 5,
            transformResponse: async (responseData, meta, args) => {
                const loadedUsers = await responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Users', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Users', id }))
                    ]
                } else return [{
                    type: 'Users', id: "LIST"
                }]
            }
        }),
        updateRoles: builder.mutation({
            query: userData => ({
                url: '/addRoles',
                method: 'PATCH',
                body: { userData }
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Users', id: id }
            ]
        }),
        banUnbanUser: builder.mutation({
            query: userId => ({
                url: '/changeStatus',
                method: 'PATCH',
                body: { userId }
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Users', id: id }
            ]
        })
    })
})

export const {
    useGetUsersQuery,
    useBanUnbanUserMutation,
    useUpdateRolesMutation
} = userApiSlice


export const selectUsersResult = userApiSlice.endpoints.getUsers.select()

//memoized selector

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUsersById,
    selectIds: selectUsersIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)








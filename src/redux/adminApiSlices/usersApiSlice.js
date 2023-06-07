import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { adminApiSlice } from "../../apis/adminApiSlice";



const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const userApiSlice = adminApiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: async (responseData, meta, args) => {
                const loadedUsers = await responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                console.log(result.ids);
                if (result?.ids) {
                    return [
                        { type: 'Users', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{
                    type: 'Users', id: "LIST"
                }]
            }
        })
    })
})

export const {
    useGetUsersQuery
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
    selectIds: selectUsersId
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)








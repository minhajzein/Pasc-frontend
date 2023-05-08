import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../apis/apiSlice";



const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => {
        getUser: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseDate => {
                const loaderUsers = responseDate.map(user => {
                    user.id = user._id
                    return user
                })
            },
            providesTags: (result, error, qrg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: "LIST" }]
            }
        })
    }
})

export const {
    useGetUsersQuery
} = userApiSlice


export const selectUserResult = userApiSlice.endpoints.getUser.select()

//memoized selector

const selectUsersData = createSelector(
    selectUserResult,
    usersResult => usersResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUsersById,
    selectIds: selectUsersId
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)








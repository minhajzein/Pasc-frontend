
import { apiSlice } from "../../apis/apiSlice";
import { logout } from "../slices/authSlice";





export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            }),
        }),
        sendLougout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(logout())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000);
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: 'auth/refresh',
                method: 'GET'
            })
        })

    })

})

export const {
    useLoginMutation,
    useSendLougoutMutation,
    useRefreshMutation
} = authApiSlice


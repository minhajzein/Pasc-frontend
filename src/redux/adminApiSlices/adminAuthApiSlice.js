import { adminApiSlice } from "../../apis/adminApiSlice";
import { setAdminCredentials, adminLogout } from "../adminSlices/adminAuthSlice";



export const adminAuthApiSlice = adminApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: { credentials }
            })
        }),
        logoutAdmin: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST'
            }),
            async onQueryStarted(arg, { dispatch, queryFulFilled }) {
                try {
                    await queryFulFilled
                    dispatch(adminLogout())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000);
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/refresh',
                method: 'GET'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { adminToken } = data
                    dispatch(setAdminCredentials({ adminToken }))
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
})


export const {
    useAdminLoginMutation,
    useLogoutAdminMutation,
    useRefreshMutation,
    usePrefetch
} = adminAuthApiSlice
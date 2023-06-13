import { toast } from "react-toastify";
import { adminApiSlice } from "../../apis/adminApiSlice";
import { setAdminCredentials, adminLogout } from "../adminSlices/adminAuthSlice";



export const adminAuthApiSlice = adminApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: { ...credentials }
            }),
            providesTags: ['Admin-auth']
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET'
            }),
            invalidatesTags: ['Admin-auth'],
            async onQueryStarted(arg, { dispatch, queryFulFilled }) {
                try {
                    await queryFulFilled
                    dispatch(adminLogout())
                    setTimeout(() => {
                        dispatch(adminApiSlice.util.resetApiState())
                    }, 1000);
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        adminRefresh: builder.mutation({
            query: () => ({
                url: '/refresh',
                method: 'GET'
            }),
            providesTags: ['Admin-auth'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { adminToken } = data
                    dispatch(setAdminCredentials({ adminToken }))
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }),
})


export const {
    useAdminLoginMutation,
    useAdminLogoutMutation,
    useAdminRefreshMutation,
    usePrefetch
} = adminAuthApiSlice
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { setAdminCredentials } from "../redux/adminSlices/adminAuthSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3009/admin',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const adminToken = getState().adminToken.adminToken
        if (adminToken) {
            headers.set('adminauthorized', `Bearer ${adminToken}`)
        }
        return headers
    }
})



const adminReauthQuery = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 403) {
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if (refreshResult?.data) {
            api.dispatch(setAdminCredentials({ ...refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = 'Your login has expired'
            }
            return refreshResult
        }
    }
    return result
}





export const adminApiSlice = createApi({
    reducerPath: 'adminAuthService',
    baseQuery: adminReauthQuery,
    tagTypes: ['Admin-auth', 'Users', 'News_cache', 'Events'],
    endpoints: builder => ({})
})
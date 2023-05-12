import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { setAdminCredentials } from "../redux/adminSlices/adminAuthSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3009/admin',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const adminToken = getState().adminToken.value
        if (adminToken) {
            headers.set('authorized', `Bearer ${adminToken}`)
        }
        return headers
    }
})



const adminReauthQuery = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 403) {
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if (refreshResult?.data) {
            api.dispatch(setAdminCredentials({ ...refreshResult.data }))
            result = await adminBaseQuery(args, api, extraOptions)
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
    baseQuery: adminReauthQuery,
    tagTypes: ['Admin', 'News', 'Events'],
    endpoints: builder => ({})
})
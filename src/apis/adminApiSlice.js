import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { setAdminCredentials } from "../redux/adminSlices/adminAuthSlice";

const adminBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3009/admin',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const adminToken = getState().adminAuth.adminToken
        if (adminToken) {
            headers.set('authorized', `Bearer ${adminToken}`)
        }
        return headers
    }
})



const adminReauhthQuery = async (args, api, extraOptions) => {
    const result = await adminBaseQuery(args, api, extraOptions)
    if (result?.error?.status === 403) {

        const refreshResult = await adminBaseQuery('/admin/refresh', api, extraOptions)

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
    adminBaseQuery: adminReauhthQuery,
    tagTypes: ['Admin', 'Users', 'Events', 'News'],
    endpoints: builder => ({})
})
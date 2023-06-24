import { apiSlice } from "../../apis/apiSlice";


const applicationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        addMobile: builder.mutation({
            query: (credentials) => ({
                url: '/addMobile',
                method: 'PATCH',
                body: { ...credentials }
            })
        }),

        createRequest: builder.mutation({
            query: (credentials) => ({
                url: '/createRequest',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        checkMobile: builder.mutation({
            query: (credentials) => ({
                url: '/checkMobile',
                method: 'POST',
                body: { ...credentials }
            })
        })

    })
})


export const {
    useAddMobileMutation,
    useCreateRequestMutation,
    useCheckMobileMutation
} = applicationApiSlice
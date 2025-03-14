
import { apiSlice } from "../../apis/apiSlice";
import { logout, setCredentials } from "../slices/authSlice";



export const authApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            }),
        }),

        googleLogin: builder.mutation({
            query: credentials => ({
                url: '/auth/loginWithGoogle',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        signup: builder.mutation({
            query: credentials => ({
                url: '/auth/signup',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        googleSignup: builder.mutation({
            query: credentials => ({
                url: '/auth/signinWithGoogle',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        sendLougout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'GET'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                await queryFulfilled
                dispatch(logout())
                setTimeout(() => {
                    dispatch(apiSlice.util.resetApiState())
                }, 1000);

            }
        }),

        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled
                const { accessToken } = data
                dispatch(setCredentials({ accessToken }))
            }
        })

    })
})

export const {
    useLoginMutation,
    useSendLougoutMutation,
    useRefreshMutation,
    useGoogleLoginMutation,
    useGoogleSignupMutation,
    useSignupMutation,
    usePrefetch
} = authApiSlice


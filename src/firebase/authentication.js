import { auth } from "./config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default {
    sendOtp: async (phone, setConfirmation, toast) => {
        try {
            let appVerifier = new RecaptchaVerifier('recaptcha-container', { 'size': 'compact' }, auth);
            appVerifier.render()
            let confirmation = await signInWithPhoneNumber(auth, "+91" + phone, appVerifier);
            setConfirmation(confirmation)
        } catch (error) {
            console.log(error);
            toast.error('Too many requests! try another number or please try again later', { position: "top-center", theme: "colored" })
        }
    },
    verifyOtp: async (confirmation, OTP, setVerified, setInvalid, setVerifyErr) => {
        try {
            await confirmation.confirm(OTP)
            setVerified(true)
            setVerifyErr(false)
        } catch (error) {
            console.log(error);
            setInvalid(true)
        }
    }
} 
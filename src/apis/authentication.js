import axios from "../axios/authService";

export const signUpUser = async (userData) => {
    try {
        const response = await axios.post('/signup', userData)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await axios.post('/login', userData)
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const signupWithGoogle = async (userData) => {
    try {
        const response = await axios.post('/signinWithGoogle', userData)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const googleLogin = async (userData) => {
    try {
        const response = await axios.post('/loginWithGoogle', userData)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
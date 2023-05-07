import axios from "../axios/userService";

export const home = async () => {
    try {
        const response = await axios.get('/admin')
        return response.data
    } catch (error) {
        console.log(error)
    }
}
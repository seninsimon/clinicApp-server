import axiosInstance from "../../api/axiosInstance"

interface Loginpayload
{
    email : string ,
    password : string
}


export const login = async (data : Loginpayload) =>
{
    const response = await axiosInstance.post('/login' , data)
    console.log(response)
    return response.data
}
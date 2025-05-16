import axios from "../../api/axiosInstance"
import type { DoctorRegisterInput } from "../../types/Doctor";

export const registerDoctor = async (data: DoctorRegisterInput) => {
  const response = await axios.post('/doctor/register', data);
  console.log(response)
  return response.data;
};

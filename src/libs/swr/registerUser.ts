import axios from "axios";

type RegisterData = {
  email: string;
  password: string;
  username: string;
  name: string;
};

const registerUser = async (
  url: string,
  {
    arg,
  }: {
    arg: RegisterData;
  }
) => {
  console.log("🚀 url:", url);
  console.log("🚀 arg:", arg);
  return axios.post(url, arg);
};

export default registerUser;

import axios from "axios";

const BASE_URL = "http://152.67.22.250:6531";

const post = async (url: string, data: any) => {
  const response = await axios.post(`${BASE_URL}/${url}`, data);
  return response.data;
};

const get = async (url: string) => {
  const response = await axios.get(`${BASE_URL}/${url}`);
  return response.data;
};

export { post, get };

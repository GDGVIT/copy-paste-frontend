import axios from "axios";
import { forage } from "@tauri-apps/tauri-forage";

const BASE_URL = "http://152.67.22.250:6531";

const post = async (url: string, data: any) => {
  const response = await axios.post(`${BASE_URL}/${url}`, data);
  return response.data;
};

const get = async (url: string) => {
  const response = await axios.get(`${BASE_URL}/${url}`);
  return response.data;
};

const authGet = async (url: string, token: string) => {
  const response = await axios.get(`${BASE_URL}/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const authPost = async (url: string, data: any, token: string) => {
  const response = await axios.post(`${BASE_URL}/${url}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const signup = async (data: any) => {
  const response = await post("api/v1/user/signup", data);
  forage.setItem({ key: "token", value: response.token })();
  return response;
};

const login = async (data: any) => {
  const response = await post("api/v1/user/login", data);
  forage.setItem({ key: "token", value: response.token })();
  forage.setItem({ key: "email", value: response.email })();
  return response;
};

const logout = async () => {
  forage.setItem({ key: "token", value: "" })();
  return;
};

export { post, get, authPost, authGet, signup, login, logout };

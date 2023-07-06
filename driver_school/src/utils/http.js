import axios from "axios";
import router from "@/router";
import { errorMsg } from "@/utils/message";
import { getToken } from "./setToken";

axios.defaults.withCredentials = true;
const service = axios.create({
  // baseURL: "http://localhost:8081",
  baseURL: " http://123.56.141.117:8081",
});

service.interceptors.request.use(
  (config) => {
    if (getToken()) {
      //判断token是否存在
      config.headers.Authorization = getToken(); //将token设置成请求头
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  (response) => {
    // console.log("resp", response);
    const code = response.data.code;
    const message = response.data.message;
    if (code === 400) {
      errorMsg(message);
      return Promise.reject(response);
    }
    return Promise.resolve(response);
  },
  (error) => {
    if (error.response.status) {
      const message = error.response.data.message;
      switch (error.response.status) {
        case 404:
          errorMsg("页面未找到");
          break;
        case 400:
          errorMsg(message);
          break;
        case 403:
          errorMsg("无权访问");
          break;
        case 401:
          errorMsg(message);
          router.push("/login");
          break;
      }
    }
    return Promise.reject(error.response);
  }
);

export default service;

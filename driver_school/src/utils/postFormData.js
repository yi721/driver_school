import axios from "axios";
import { getToken } from "./setToken";
export default function postFormData(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: getToken(),
        },
      })
      .then((res) => {
        resolve(res.data);
        // console.log('请求成功！')
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

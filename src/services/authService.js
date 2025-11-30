import axios from "axios";

export async function login(data) {
  return axios.post("http://localhost:8080/api/auth/login", data);
}

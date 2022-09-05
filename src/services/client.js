import axios from "axios";

export const client = axios.create({
  baseURL: "http://193.123.116.141:8000/",
});

export default client;

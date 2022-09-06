import axios from "axios";

export const client = axios.create({
  baseURL: "https://api.pantufos.com.br/rpg",
});

export default client;

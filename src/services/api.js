import axios from "axios";
import md5 from "md5";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const publicKey = process.env.REACT_APP_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_PRIVATE_KEY;

const time = new Date().getTime();

const hash = md5(time + privateKey + publicKey);

const api = axios.create({
  baseURL: "http://gateway.marvel.com/v1/public",
  params: {
    ts: time,
    apikey: publicKey,
    hash,
  },
});

export default api;
import axios from "axios";

const tesloApi = axios.create({
  baseURL: "http://localHost:3000/api",
  timeout: 1000,
});

export { tesloApi };

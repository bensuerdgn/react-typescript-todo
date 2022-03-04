import axios from "axios";

const instance = axios.create({
  baseURL: "https://todos-48d76-default-rtdb.firebaseio.com/",
});

export default instance;

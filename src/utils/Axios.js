import axios from "axios";
const instance = axios.create({ baseURL: "http://localhost:5000/api/v1.0.0/" });
export default instance;

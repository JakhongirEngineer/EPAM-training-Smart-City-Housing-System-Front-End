import axios from "axios";
const PRODUCTION_BASE_URL =
  "https://cors-everywhere.herokuapp.com/http://housingsystem-env.eba-cgcqvndq.eu-west-1.elasticbeanstalk.com/api/v1.0.0/";
const DEVELOPMENT_BASE_URL = "http://localhost:5000/api/v1.0.0/";
const instance = axios.create({ baseURL: PRODUCTION_BASE_URL });
export default instance;

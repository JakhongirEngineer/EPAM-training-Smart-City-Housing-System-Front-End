import axios from "axios";
const PRODUCTION_BASE_URL =
  "https://cors-everywhere.herokuapp.com/http://housingsystembackend-env.eba-prmb6wib.eu-west-1.elasticbeanstalk.com/api/v1.0.0/";
const DEVELOPMENT_BASE_URL = "http://localhost:5000/api/v1.0.0/";
const NGROK_BASE_URL = "https://0e59-185-139-137-103.ngrok.io/api/v1.0.0/";
const instance = axios.create({ baseURL: PRODUCTION_BASE_URL });
export default instance;

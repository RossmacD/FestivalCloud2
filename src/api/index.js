import axios from "axios";

axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers['crossorigin'] = 'true';

const createdAxios = axios.create({
  baseURL: "https://fskba5swil.execute-api.us-east-1.amazonaws.com/api"
});

export default createdAxios;

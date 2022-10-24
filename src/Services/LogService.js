import http from "../http-common";
const getAll = () => {
  return http.get("/Log");
};


const LogDataService = {
  getAll
  
};
export default LogDataService;

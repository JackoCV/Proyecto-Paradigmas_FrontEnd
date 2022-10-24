import http from "../http-common";
const getAll = () => {
  return http.get("/TipoMocion");
};
const get = (id) => {
  return http.get(`/TipoMocion/${id}`);
};
const create = (data) => {
  return http.post("/TipoMocion", data);
};



const remove = (id) => {
  return http.delete(`/TipoMocion/${id}`);
};

const TipoMocionService = {
  getAll,
  get,
  create,
  remove,
};
export default TipoMocionService;

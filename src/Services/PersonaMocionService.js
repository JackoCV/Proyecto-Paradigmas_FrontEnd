import http from "../http-common";
const getAll = () => {
  return http.get("/PersonaMocion");
};
const get = (id) => {
  return http.get(`/PersonaMocion/${id}`);
};
const create = (persona,mocion) => {
  return http.put(`/PersonaMocion/${persona}/${mocion}`);
};

const remove = (id) => {
  return http.delete(`/PersonaMocion/${id}`);
};

const PersonaMocionService = {
  getAll,
  get,
  create,
  remove,
};
export default PersonaMocionService;

import http from "../http-common";
const getAll = () => {
  return http.get("/Persona");
};
const get = (id) => {
  return http.get(`/Persona/${id}`);
};
const create = (data) => {
  return http.post("/Persona", data);
};

const remove = (id) => {
  return http.delete(`/Persona/${id}`);
};

const PersonaService = {
  getAll,
  get,
  create,
  remove,
};
export default PersonaService;

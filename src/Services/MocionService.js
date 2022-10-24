import http from "../http-common";
const getAll = () => {
  return http.get("/Mocion");
};
const get = (id) => {
  return http.get(`/Mocion/${id}`);
};
const create = (data,id) => {
  return http.post(`/Mocion/${id}`, data);
};

const edit = (data, id) => {
  return http.put(`/Mocion/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/Mocion/${id}`);
};

const MocionService = {
  getAll,
  get,
  edit,
  create,
  remove,
};
export default MocionService;

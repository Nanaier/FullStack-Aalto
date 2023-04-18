import axios from "axios";
const baseUrl = "https://restcountries.com/v3.1/all";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const deleteById = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export default {
  getAll: getAll,
  create: create,
  deleteById: deleteById,
  update: update,
};

import axios from 'axios';

const prod = 'https://thermo.software/service/';
// const dev = 'http://localhost:9000/';

export function getCows(){
  return axios.get(`${prod}cows/`)
}
export function getTemperatures(data){
  return axios.post(`${prod}temperature/${data.id}`, data)
}
export function getAllTemp(data){
  return axios.get(`${prod}temperature/${data.id}`)
}
export function getSteps(data){
  return axios.get(`${prod}steps/${data.id}`)
}
export function addCow(data){
  return axios.post(`${prod}cows/`, data)
}
export function editCow(data){
  return axios.put(`${prod}cows/`, data)
}
export function deleteCow(data){
  return axios.delete(`${prod}cows/${data.id}`)
}
export function deleteSteps(data){
  return axios.delete(`${prod}steps/${data.id}`)
}
export function deleteTemp(data){
  return axios.delete(`${prod}temperature/${data.id}`)
}

import axios from "axios";

export const api = axios.create({
  baseURL: "http://44.211.176.110:3001"
})
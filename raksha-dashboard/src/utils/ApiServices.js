import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchAverageResponseTime = async () => {
  return axios.get(`${API_BASE_URL}/metrics/average-response-time`);
};

export const fetchCsatScore = async () => {
  return axios.get(`${API_BASE_URL}/metrics/csat`);
};

export const fetchCesScore = async () => {
  return axios.get(`${API_BASE_URL}/metrics/ces`);
};

export const fetchNpsScore = async () => {
  return axios.get(`${API_BASE_URL}/metrics/nps`);
};

export const fetchSatisfactionBreakdown = async () => {
  return axios.get(`${API_BASE_URL}/metrics/breakdown`);
};

export const fetchTrends = async () => {
  return axios.get(`${API_BASE_URL}/metrics/trends`);
};

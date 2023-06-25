import axios from "axios";
// import { defineConfig, loadEnv } from "vite";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const headers = {
  Authorization: "Bearer " + TMDB_TOKEN,
};

// console.log(headers);
export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
};

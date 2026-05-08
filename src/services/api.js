import axios from "axios";
import API_URL from "../Api_path";

const API = axios.create({
  baseURL: `${API_URL}`
});

export const fetchFeatured = () => API.get("/featuredCategories");
export const fetchBanner = () => API.get("/secondaryBanner");
export const fetchFeatures = () => API.get("/features");
export const fetchModularBanner = () => API.get("/modularBanner");
export const fetchImpacts = () => API.get("/impacts");
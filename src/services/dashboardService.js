// /analytics/getallstats
import { request } from "./apiServices";


// Function to fetch a specific document by ID
export const getDashboardStats = async () => {
  return request(`/analytics/getallstats`);
};

export const getDepartmentStats = async () => {
  return request(`/analytics/getdepartmentstats`);
};

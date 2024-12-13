import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "https://karyanirikshan-backend.vercel.app/api/v1";

export const fetchReportTypes = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/register/getall`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching report types:", error);
    throw error;
  }
};

export const fetchDepartments = async (type) => {
  try {
    const response = await axios.get(`${SERVER_URL}/department/getlist/${type}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export const createDocument = async (documentData) => {
  try {
    const response = await axios.post(`${SERVER_URL}/document/create`, documentData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create document: " + error.message);
  }
};

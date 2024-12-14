import { request } from "./apiServices"; 



// Fetch report types
export const fetchReportTypes = async () => {
  const data = await request("/register/getall");
  return data?.data || [];
};

// Fetch departments by type
export const fetchDepartments = async (type) => {
  const data = await request(`/department/getlist/${type}`);
  return data?.data || [];
};

// Create document
export const createDocument = async (documentData) => {
  const data = await request("/document/create", {
    method: 'POST',
    body: JSON.stringify(documentData),
  });
  return data;
};


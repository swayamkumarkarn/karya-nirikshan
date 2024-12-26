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
  console.log("document data",documentData);
  const data = await request("/document/create", {
    method: 'POST',
    body: JSON.stringify(documentData),
  });
  return data;
};

// Fetch category list by ID
export const fetchCategoryList = async (id) => {
  if (!id) throw new Error("ID is required to fetch category list");
  
  const data = await request(`/category/getlist/${id}`);
  return data?.data ;
};
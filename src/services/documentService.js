//documentService.js
import { request } from "./apiServices";

// Function to fetch all documents
export const getAllDocument = async () => {
  return request("/document/getlist", { method: "POST" });
};

// Function to fetch a specific document by ID
export const getDocumentById = async (id) => {
  if (!id) {
    throw new Error("Document ID is required");
  }

  return request(`/document/get/${id}`, { method: "GET" });
};


// Function to fetch a Event Log of specific document by ID
export const getEventLogById = async (id) => {
  if (!id) {
    throw new Error("Document ID is required");
  }

  return request(`/log/getlog/${id}`, { method: "GET" });
};

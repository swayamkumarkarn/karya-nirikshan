//documentService.js
import { request } from "./apiServices";

// Function to fetch all documents
export const getAllDocument = async (id=null) => {
  return request("/document/getlist", { method: "POST",body: JSON.stringify({departmentId:id}), }); 
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


export const docDispose = async (documentId, userId) => {
  if (!(documentId && userId)) {
    throw new Error("Document ID and UserId is required");
  }

  return request(`/document/dispose`, { method: "POST",body: JSON.stringify({documentId, userId , remark}) });
};


export const docForward = async (documentId,fromDepartmentId,toDepartmentId, forwardedBy, remark) => {
  if (!(documentId && fromDepartmentId &&toDepartmentId && forwardedBy)) {
    throw new Error("Provide All mandatory field is required");
  }

  return request(`/transfer/create`, { method: "POST",body: JSON.stringify({documentId,fromDepartmentId,toDepartmentId, forwardedBy, remark}) });
};

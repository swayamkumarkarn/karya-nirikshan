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


export const docDispose = async (documentId, userId, remark) => {
  if (!(documentId && userId)) {
    throw new Error("Document ID and UserId are required in service" );
  }

  try {
    const response = await request(`/document/dispose`, {
      method: "POST",
      body: JSON.stringify({ documentId, userId, remark }),
    });

    return response; // Return the API response
  } catch (error) {
    console.error("Error in docDispose:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};


export const docForward = async (documentId,fromDepartmentId,toDepartmentId, forwardedBy, remarks) => {
  if (!(documentId && fromDepartmentId &&toDepartmentId && forwardedBy)) {
    throw new Error("Provide All mandatory field is required");
  }

  return request(`/transfer/create`, { method: "POST",body: JSON.stringify({documentId,fromDepartmentId,toDepartmentId, forwardedBy, remarks}) });
};

export const updateLog = async ( documentId, handledDepartmentId, handledUserId, action, remark ) => {
 

  // if (!action) {
  //   throw new Error('The "action" field is mandatory.');
  // }

  // const requestBody = ;
  // console.log("request",requestBody);
  console.log("object",
    documentId,
    handledDepartmentId,
    handledUserId,
    action,
    remark,
  )

  return request(`/log/update`, { method: "POST",body: JSON.stringify({
    documentId,
    handledDepartmentId,
    handledUserId,
    action,
    remark,
  }) });

 
};

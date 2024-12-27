import { request } from "./apiServices";



export const fetchSearchData = async (id) => {
    return request(`/document/search/${id} `); 
  };
  
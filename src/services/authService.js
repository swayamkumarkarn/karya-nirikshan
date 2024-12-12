import {request} from "./apiServices";

export const login = async (data) => {
    return request('/user/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

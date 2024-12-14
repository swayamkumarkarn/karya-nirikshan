import {request} from "./apiServices";

export const login = async (data) => {
    return request('/user/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };
export const logout = async () => {
    return request('/user/logout', {
      method: 'POST',
    });
  };

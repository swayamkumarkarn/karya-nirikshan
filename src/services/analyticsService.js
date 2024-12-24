import { request } from "./apiServices";

// export const fetchActivityData = () => request('');

export const fetchActivityData = async () => {
    return request(`/analytics/getmonthcount`);
  };
  
  
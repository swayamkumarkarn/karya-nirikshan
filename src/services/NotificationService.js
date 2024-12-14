

import { request } from "./apiServices";


export const fetchDocumentList = async (id) => {

    return request(`/transfer/getlist/${id}`);


};


export const submitAction = (Id, userId, type) => {
    return request("/transfer/submit", {
        method: 'POST',
        body: JSON.stringify({ Id, userId, type })
    });
};

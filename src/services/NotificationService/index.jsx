import axios from "axios";

const SERVER_URL ="https://karyanirikshan-backend.vercel.app/api/v1"|| process.env.REACT_APP_SERVER_URL;

class GetNotification {
  static async fetchDocumentList(id) {
    const response = await axios.get(
      `${SERVER_URL}/transfer/getlist/${id}`
    );

    if (response.data?.success) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  }
}

export default GetNotification;

export const submitAction = async (Id,userId,type) => {
 
    try {
        const response = await axios.post(`${SERVER_URL}/transfer/submit`, {
        Id,
            userId,
            type
        });
        return response.data;
    } catch (error) {
        console.error('Error during API call:', error);
        throw error;
    }
};

import axios from "axios";

class ApiService {
  static async fetchDocumentList() {
    try {
      const response = await axios.get(
        "https://karyanirikshan-backend.vercel.app/api/v1/transfer/getlist/c9faaea4-4b13-41dc-ad49-f9b6aeaac5b0"
      );
      if (response.data && response.data.success) {
        return response.data.data;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching document list:", error);
      throw error;
    }
  }
}

export default ApiService;

export const submitAction = async (Id,userId,type) => {
    console.log(" data is ",Id  ,userId,    type);
    try {
        const response = await axios.post('https://karyanirikshan-backend.vercel.app/api/v1/transfer/submit', {
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

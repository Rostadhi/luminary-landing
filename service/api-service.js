import axios from "axios";

const BASE_URL =
  "https://deliver.kontent.ai/dabf51d1-80d7-028c-004c-61b8839f9622/items/welcome_aus___technical_test___mobile_dev";

export const fetchLandingData = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching from Kontent.ai:", error);
    throw error;
  }
};

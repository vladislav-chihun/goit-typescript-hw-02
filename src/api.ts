import axios from "axios";

const baseUrl = "https://api.unsplash.com/search/photos";
const accessKey = "Ne61K3eIre2CvwGla7QLYoeCHXlPZ91C0ufyMwxCMDs";

export interface Image {
  id: string;
  description: string;
  urls: {
    small: string;
    regular: string;
  };
}

interface ApiResponse {
  results: Image[];
  total: number;
  total_pages: number;
}

export const apiFoo = async (query: string, currentPage: number): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(baseUrl, {
      params: {
        query: query,
        client_id: accessKey,
        per_page: 12,
        page: currentPage
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

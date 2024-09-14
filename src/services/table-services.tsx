import { TableResponse } from "../types/table";

const API_URL = 'https://api.artic.edu/api/v1/artworks';


export const fetchDataTable = async (page: number): Promise<TableResponse> => {
    const response = await fetch(`${API_URL}?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Table');
    }
    return response.json();
  };
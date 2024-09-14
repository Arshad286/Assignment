export interface Table {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

export interface TableResponse {
    data: Table[];
    pagination: {
      total: number;
    };
  }
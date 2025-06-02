export interface Hotel {
  place_id: string;
  name: string;
  description: string;
  reviews: number;
  rating: number;
  website: string;
  phone: string;
  address: string;
  featured_image: string;
  categories: string;
  review_keywords: string;
}

export interface Location {
  name: string;
  hotels: Hotel[];
}
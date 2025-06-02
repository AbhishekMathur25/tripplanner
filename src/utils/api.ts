import axios from 'axios';
import { Hotel, Location } from './types';

// Function to parse CSV data
export function parseCSV(csvData: string): Hotel[] {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const hotel: any = {};
    
    headers.forEach((header, index) => {
      hotel[header.trim()] = values[index]?.trim() || '';
    });
    
    return hotel as Hotel;
  });
}

// Function to load hotel data from CSV files
export async function loadHotelData(): Promise<Location[]> {
  const locations = ['Delhi', 'Shimla', 'Manali'];
  const hotelData: Location[] = [];

  for (const location of locations) {
    const hotels = await import(`../data/${location}.csv`);
    hotelData.push({
      name: location,
      hotels: parseCSV(hotels.default)
    });
  }

  return hotelData;
}

// Function to get trip suggestions from Google Gemini
export async function getTripSuggestions(prompt: string) {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error getting trip suggestions:', error);
    throw error;
  }
}
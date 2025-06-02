import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Star } from 'lucide-react';
import { loadHotelData } from '../utils/api';
import { Hotel, Location } from '../utils/types';

export default function Hotels() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  
  const { data: locations, isLoading } = useQuery<Location[]>({
    queryKey: ['hotels'],
    queryFn: loadHotelData
  });

  const filteredHotels = locations?.flatMap(location => 
    selectedLocation === 'all' || selectedLocation === location.name
      ? location.hotels
      : []
  ).filter(hotel => 
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center">Loading hotels...</div>;
  }

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Find Your Perfect Stay</h1>
        
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search hotels..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="border rounded-lg px-4 py-2"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="all">All Locations</option>
            {locations?.map(location => (
              <option key={location.name} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels?.map((hotel) => (
          <div key={hotel.place_id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={hotel.featured_image}
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{hotel.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{hotel.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {hotel.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {hotel.reviews} reviews
                </span>
                <a
                  href={hotel.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
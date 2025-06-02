import { Link } from 'react-router-dom';
import { Hotel, Map } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to TravelEase
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Your one-stop solution for hotel bookings and AI-powered trip planning
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Link
          to="/hotels"
          className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <Hotel className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Find Hotels</h2>
          <p className="text-gray-600">
            Browse and book from our curated selection of hotels in popular destinations
          </p>
        </Link>
        
        <Link
          to="/trip-planner"
          className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <Map className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Plan Your Trip</h2>
          <p className="text-gray-600">
            Get AI-powered trip suggestions and itineraries customized just for you
          </p>
        </Link>
      </div>
    </div>
  );
}
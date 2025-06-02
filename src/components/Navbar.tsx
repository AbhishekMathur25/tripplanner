import { Link } from 'react-router-dom';
import { Hotel, Map } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Hotel className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">TravelEase</span>
          </Link>
          
          <div className="flex space-x-8">
            <Link to="/hotels" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <Hotel className="h-5 w-5" />
              <span>Hotels</span>
            </Link>
            <Link to="/trip-planner" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <Map className="h-5 w-5" />
              <span>Trip Planner</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
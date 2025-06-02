import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, MapPin, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { getTripSuggestions } from '../utils/api';

export default function TripPlanner() {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [interests, setInterests] = useState('');
  
  const { data: suggestions, isLoading, refetch } = useQuery({
    queryKey: ['tripSuggestions', destination, duration, interests],
    queryFn: () => getTripSuggestions(
      `Create a detailed travel itinerary for a ${duration} trip to ${destination}. 
      Include recommendations for activities based on these interests: ${interests}. 
      Also suggest the best time to visit and provide a Google Maps link for the destination.`
    ),
    enabled: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !duration || !interests) {
      toast.error('Please fill in all fields');
      return;
    }
    refetch();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">AI Trip Planner</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                placeholder="Where do you want to go?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                placeholder="How long is your trip?"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interests
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-8 transform -translate-y-1/2 text-gray-400" />
              <textarea
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                placeholder="What are your interests? (e.g., history, food, adventure)"
                rows={3}
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Generating Plan...' : 'Plan My Trip'}
          </button>
        </div>
      </form>

      {suggestions && (
        <div className="bg-white p-6 rounded-lg shadow-lg prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Your Travel Plan</h2>
          <div dangerouslySetInnerHTML={{ __html: suggestions.replace(/\n/g, '<br/>') }} />
        </div>
      )}
    </div>
  );
}
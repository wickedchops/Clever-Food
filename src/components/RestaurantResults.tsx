
import { Restaurant } from '@/types/restaurant';
import RestaurantCard from './RestaurantCard';
import { Loader2 } from 'lucide-react';

interface RestaurantResultsProps {
  restaurants: Restaurant[];
  loading: boolean;
}

const RestaurantResults = ({ restaurants, loading }: RestaurantResultsProps) => {
  if (loading) {
    return (
      <div className="text-center py-16">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Searching for the best deals...</h3>
        <p className="text-gray-500">Checking Uber Eats, Just Eat, and Deliveroo</p>
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
          <p className="text-gray-500">Try searching for a different dish or postcode</p>
        </div>
      </div>
    );
  }

  // Find the cheapest price for highlighting
  const cheapestPrice = Math.min(...restaurants.map(r => r.price));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Found {restaurants.length} options
        </h2>
        <p className="text-gray-600">Cheapest option highlighted in green</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={`${restaurant.platform}-${restaurant.id}`}
            restaurant={restaurant}
            isCheapest={restaurant.price === cheapestPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantResults;

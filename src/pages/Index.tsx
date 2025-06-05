
import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import RestaurantResults from '@/components/RestaurantResults';
import ApiSettings from '@/components/ApiSettings';
import { searchDeliveryApps } from '@/services/deliveryService';
import { Restaurant } from '@/types/restaurant';

const Index = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (food: string, postcode: string) => {
    setLoading(true);
    setHasSearched(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const results = await searchDeliveryApps(food, postcode);
      setRestaurants(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            FoodFinder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare prices across Uber Eats, Just Eat, and Deliveroo to find the best deals on your favorite dishes
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="max-w-6xl mx-auto">
            <RestaurantResults restaurants={restaurants} loading={loading} />
          </div>
        )}
      </div>

      {/* API Settings */}
      <ApiSettings />
    </div>
  );
};

export default Index;

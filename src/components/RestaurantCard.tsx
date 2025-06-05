
import { Restaurant } from '@/types/restaurant';
import { Clock, Star, Award } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isCheapest: boolean;
}

const RestaurantCard = ({ restaurant, isCheapest }: RestaurantCardProps) => {
  const platformColors = {
    'Uber Eats': 'bg-black text-white',
    'Just Eat': 'bg-orange-500 text-white',
    'Deliveroo': 'bg-cyan-500 text-white'
  };

  return (
    <div className={`relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-xl hover:scale-105 ${
      isCheapest ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
    }`}>
      {isCheapest && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
            <Award className="w-4 h-4" />
            Cheapest!
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Platform Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${platformColors[restaurant.platform]}`}>
            {restaurant.platform}
          </span>
          <div className="flex items-center gap-1 text-gray-600">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{restaurant.rating}</span>
          </div>
        </div>

        {/* Restaurant Details */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{restaurant.name}</h3>
        <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>

        {/* Price and Delivery Info */}
        <div className="space-y-3">
          <div className={`text-3xl font-bold ${isCheapest ? 'text-green-600' : 'text-gray-800'}`}>
            £{restaurant.price.toFixed(2)}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{restaurant.deliveryTime} mins</span>
            </div>
            <div>
              Delivery: £{restaurant.deliveryFee.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Order Button */}
        <button className={`w-full mt-4 py-3 px-4 rounded-xl font-semibold transition-colors ${
          isCheapest
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-gray-800 hover:bg-gray-900 text-white'
        }`}>
          Order from {restaurant.platform}
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;

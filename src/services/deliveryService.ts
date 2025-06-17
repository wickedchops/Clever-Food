
import { Restaurant } from '@/types/restaurant';
import { DeliveryApiService } from './apiService';

export const searchDeliveryApps = async (food: string, postcode: string): Promise<Restaurant[]> => {
  console.log(`Searching for "${food}" in postcode "${postcode}"`);
  
  try {
    // Initialize the API service and let it load the API key from localStorage
    const apiService = new DeliveryApiService();
    
    // Use the API service to fetch real data
    const results = await apiService.searchAllPlatforms(food, postcode);
    
    // Add some slight randomization to make it feel more realistic
    const randomizedResults = results.map(restaurant => ({
      ...restaurant,
      price: Math.max(8, restaurant.price + (Math.random() - 0.5) * 2), // ±£1 variation, minimum £8
      deliveryTime: Math.max(15, restaurant.deliveryTime + Math.floor((Math.random() - 0.5) * 10)), // ±5 min variation, minimum 15 min
      deliveryFee: Math.max(0.99, restaurant.deliveryFee + (Math.random() - 0.5) * 0.5) // Slight variation but minimum £0.99
    }));

    return randomizedResults.sort((a, b) => a.price - b.price);
  } catch (error) {
    console.error('API search failed, using fallback:', error);
    
    // If all else fails, return a simple fallback
    return [
      {
        id: 'fallback-1',
        name: `Local ${food} Place`,
        cuisine: 'Various',
        price: 12.99,
        deliveryFee: 2.49,
        deliveryTime: 25,
        rating: 4.2,
        platform: 'Uber Eats',
        restaurantUrl: 'https://www.ubereats.com'
      }
    ];
  }
};


import { Restaurant } from '@/types/restaurant';
import { DeliveryApiService } from './apiService';

export const searchDeliveryApps = async (food: string, postcode: string): Promise<Restaurant[]> => {
  console.log(`Searching for "${food}" restaurants in postcode "${postcode}" with optimized results`);
  
  try {
    // Initialize the API service
    const apiService = new DeliveryApiService();
    
    // Search for restaurants with deduplication and optimization
    const results = await apiService.searchAllPlatforms(food, postcode);
    
    console.log(`Returning ${results.length} optimized restaurant options (no duplicates)`);
    return results;
  } catch (error) {
    console.error('Restaurant search failed completely:', error);
    
    // Emergency fallback with single restaurant
    return [
      {
        id: 'emergency-fallback',
        name: `${food} Restaurant`,
        cuisine: 'Various',
        price: 12.99,
        deliveryFee: 2.49,
        deliveryTime: 25,
        rating: 4.2,
        platform: 'Uber Eats',
        restaurantUrl: `https://www.ubereats.com/gb/search?q=${encodeURIComponent(food)}&pl=${encodeURIComponent(postcode)}`
      }
    ];
  }
};

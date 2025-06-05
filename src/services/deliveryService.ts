
import { Restaurant } from '@/types/restaurant';

// Mock data for demonstration - in production, this would call real APIs
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Tokyo Kitchen',
    cuisine: 'Japanese',
    price: 12.99,
    deliveryFee: 2.49,
    deliveryTime: 25,
    rating: 4.5,
    platform: 'Uber Eats'
  },
  {
    id: '2',
    name: 'Sakura Sushi',
    cuisine: 'Japanese',
    price: 15.50,
    deliveryFee: 1.99,
    deliveryTime: 30,
    rating: 4.7,
    platform: 'Just Eat'
  },
  {
    id: '3',
    name: 'Bento Express',
    cuisine: 'Japanese',
    price: 11.75,
    deliveryFee: 3.00,
    deliveryTime: 20,
    rating: 4.3,
    platform: 'Deliveroo'
  },
  {
    id: '4',
    name: 'Curry House Spice',
    cuisine: 'Indian',
    price: 13.25,
    deliveryFee: 2.99,
    deliveryTime: 35,
    rating: 4.6,
    platform: 'Uber Eats'
  },
  {
    id: '5',
    name: 'Mumbai Palace',
    cuisine: 'Indian',
    price: 14.99,
    deliveryFee: 1.49,
    deliveryTime: 28,
    rating: 4.4,
    platform: 'Just Eat'
  },
  {
    id: '6',
    name: 'Royal Tandoor',
    cuisine: 'Indian',
    price: 12.50,
    deliveryFee: 2.50,
    deliveryTime: 32,
    rating: 4.8,
    platform: 'Deliveroo'
  }
];

export const searchDeliveryApps = async (food: string, postcode: string): Promise<Restaurant[]> => {
  console.log(`Searching for "${food}" in postcode "${postcode}"`);
  
  // Simulate API calls to each platform
  const platforms = ['Uber Eats', 'Just Eat', 'Deliveroo'] as const;
  
  // Filter restaurants based on food type (simple keyword matching)
  const relevantRestaurants = mockRestaurants.filter(restaurant => {
    const foodLower = food.toLowerCase();
    const cuisineLower = restaurant.cuisine.toLowerCase();
    const nameLower = restaurant.name.toLowerCase();
    
    // Check if the search term matches cuisine or restaurant name
    return cuisineLower.includes(foodLower) || 
           nameLower.includes(foodLower) ||
           (foodLower.includes('curry') && cuisineLower.includes('indian')) ||
           (foodLower.includes('sushi') && cuisineLower.includes('japanese')) ||
           (foodLower.includes('katsu') && cuisineLower.includes('japanese'));
  });

  // Add some randomization to prices and delivery times to simulate real API responses
  const results = relevantRestaurants.map(restaurant => ({
    ...restaurant,
    price: restaurant.price + (Math.random() - 0.5) * 2, // ±£1 variation
    deliveryTime: restaurant.deliveryTime + Math.floor((Math.random() - 0.5) * 10), // ±5 min variation
    deliveryFee: Math.max(0.99, restaurant.deliveryFee + (Math.random() - 0.5) * 1) // Slight variation but minimum £0.99
  }));

  // Sort by price (cheapest first)
  return results.sort((a, b) => a.price - b.price);
};

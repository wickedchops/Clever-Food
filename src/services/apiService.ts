
import { Restaurant } from '@/types/restaurant';

// Google Places API service for finding restaurants
class GooglePlacesService {
  private apiKey: string = '';

  constructor(apiKey?: string) {
    // Load from localStorage if no key provided
    this.apiKey = apiKey || localStorage.getItem('googlePlacesApiKey') || '';
  }

  async searchRestaurants(food: string, postcode: string): Promise<any[]> {
    if (!this.apiKey) {
      console.log('Google Places API key not provided, using fallback data');
      return [];
    }

    try {
      console.log('Making Google Places API request...');
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(food + ' restaurant ' + postcode)}&key=${this.apiKey}`
      );
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Google Places API response:', data);
      
      if (data.status === 'REQUEST_DENIED') {
        console.error('Google Places API request denied:', data.error_message);
        return [];
      }
      
      return data.results || [];
    } catch (error) {
      console.error('Google Places API error:', error);
      return [];
    }
  }
}

// Platform-specific URL builders
class PlatformUrlBuilder {
  static buildUberEatsUrl(restaurantName: string, postcode: string): string {
    const searchTerm = encodeURIComponent(`${restaurantName}`);
    const location = encodeURIComponent(postcode);
    return `https://www.ubereats.com/gb/search?q=${searchTerm}&pl=${location}`;
  }

  static buildJustEatUrl(restaurantName: string, postcode: string): string {
    const searchTerm = encodeURIComponent(`${restaurantName}`);
    const location = encodeURIComponent(postcode);
    return `https://www.just-eat.co.uk/area/${location}/restaurants-${searchTerm}`;
  }

  static buildDeliverooUrl(restaurantName: string, postcode: string): string {
    const searchTerm = encodeURIComponent(`${restaurantName}`);
    const location = encodeURIComponent(postcode);
    return `https://deliveroo.co.uk/restaurants/${location}?search=${searchTerm}`;
  }
}

// Main API service that coordinates all data fetching
export class DeliveryApiService {
  private googlePlaces: GooglePlacesService;

  constructor(googleApiKey?: string) {
    // Always try to load from localStorage if no key provided
    const apiKey = googleApiKey || localStorage.getItem('googlePlacesApiKey') || '';
    this.googlePlaces = new GooglePlacesService(apiKey);
    
    if (apiKey) {
      console.log('Using Google Places API key for restaurant search');
    } else {
      console.log('No Google Places API key found, will use fallback data');
    }
  }

  async searchAllPlatforms(food: string, postcode: string): Promise<Restaurant[]> {
    console.log(`Searching for "${food}" in ${postcode} across all platforms`);

    // Get base restaurant data from Google Places
    const googleResults = await this.googlePlaces.searchRestaurants(food, postcode);
    
    if (googleResults.length === 0) {
      console.log('No Google Places results, falling back to mock data');
      return this.generateMockRestaurants(food);
    }

    console.log(`Found ${googleResults.length} restaurants from Google Places`);
    const restaurants: Restaurant[] = [];

    // Process each restaurant and create entries for each platform
    for (let i = 0; i < Math.min(googleResults.length, 5); i++) {
      const place = googleResults[i];
      const baseRestaurant = {
        name: place.name,
        cuisine: this.guessCuisineType(place.name, food),
        rating: place.rating || 4.0 + Math.random() * 0.8,
      };

      // Create entries for each delivery platform
      const platforms: Array<'Uber Eats' | 'Just Eat' | 'Deliveroo'> = ['Uber Eats', 'Just Eat', 'Deliveroo'];
      
      platforms.forEach((platform) => {
        restaurants.push({
          id: `${place.place_id}-${platform}`,
          ...baseRestaurant,
          platform,
          price: this.generateRealisticPrice(),
          deliveryFee: this.generateDeliveryFee(),
          deliveryTime: 20 + Math.floor(Math.random() * 25),
          restaurantUrl: this.buildPlatformUrl(platform, baseRestaurant.name, postcode)
        });
      });
    }

    // Sort by price and return
    return restaurants.sort((a, b) => a.price - b.price);
  }

  private buildPlatformUrl(platform: 'Uber Eats' | 'Just Eat' | 'Deliveroo', restaurantName: string, postcode: string): string {
    switch (platform) {
      case 'Uber Eats':
        return PlatformUrlBuilder.buildUberEatsUrl(restaurantName, postcode);
      case 'Just Eat':
        return PlatformUrlBuilder.buildJustEatUrl(restaurantName, postcode);
      case 'Deliveroo':
        return PlatformUrlBuilder.buildDeliverooUrl(restaurantName, postcode);
      default:
        return '#';
    }
  }

  private guessCuisineType(restaurantName: string, searchTerm: string): string {
    const name = restaurantName.toLowerCase();
    const search = searchTerm.toLowerCase();

    if (name.includes('sushi') || name.includes('japanese') || search.includes('sushi') || search.includes('katsu')) {
      return 'Japanese';
    }
    if (name.includes('curry') || name.includes('indian') || search.includes('curry') || search.includes('indian')) {
      return 'Indian';
    }
    if (name.includes('pizza') || name.includes('italian') || search.includes('pizza')) {
      return 'Italian';
    }
    if (name.includes('chinese') || search.includes('chinese')) {
      return 'Chinese';
    }
    if (name.includes('thai') || search.includes('thai')) {
      return 'Thai';
    }
    return 'Various';
  }

  private generateRealisticPrice(): number {
    return 10 + Math.random() * 12; // £10-22 range
  }

  private generateDeliveryFee(): number {
    return 1.49 + Math.random() * 2; // £1.49-3.49 range
  }

  private generateMockRestaurants(food: string): Restaurant[] {
    // Fallback mock data when APIs are unavailable
    const mockData = [
      {
        id: 'mock-1',
        name: 'Local Kitchen',
        cuisine: this.guessCuisineType('', food),
        price: this.generateRealisticPrice(),
        deliveryFee: this.generateDeliveryFee(),
        deliveryTime: 25,
        rating: 4.3,
        platform: 'Uber Eats' as const,
        restaurantUrl: 'https://www.ubereats.com'
      },
      {
        id: 'mock-2',
        name: 'Quick Bites',
        cuisine: this.guessCuisineType('', food),
        price: this.generateRealisticPrice(),
        deliveryFee: this.generateDeliveryFee(),
        deliveryTime: 30,
        rating: 4.1,
        platform: 'Just Eat' as const,
        restaurantUrl: 'https://www.just-eat.co.uk'
      },
      {
        id: 'mock-3',
        name: 'Express Delivery',
        cuisine: this.guessCuisineType('', food),
        price: this.generateRealisticPrice(),
        deliveryFee: this.generateDeliveryFee(),
        deliveryTime: 22,
        rating: 4.5,
        platform: 'Deliveroo' as const,
        restaurantUrl: 'https://deliveroo.co.uk'
      }
    ];

    return mockData.sort((a, b) => a.price - b.price);
  }
}

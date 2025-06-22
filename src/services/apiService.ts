import { Restaurant } from '@/types/restaurant';

// Platform-specific URL builders for working platform links
class PlatformUrlBuilder {
  static buildUberEatsUrl(restaurantName: string, postcode: string, dishName?: string): string {
    const searchQuery = dishName ? `${dishName} ${restaurantName}` : restaurantName;
    const encodedQuery = encodeURIComponent(searchQuery);
    const encodedPostcode = encodeURIComponent(postcode);
    return `https://www.ubereats.com/gb/search?q=${encodedQuery}&pl=${encodedPostcode}`;
  }

  static buildJustEatUrl(restaurantName: string, postcode: string, dishName?: string): string {
    const searchQuery = dishName ? `${dishName} ${restaurantName}` : restaurantName;
    const encodedQuery = encodeURIComponent(searchQuery);
    const encodedPostcode = encodeURIComponent(postcode.replace(/\s/g, ''));
    return `https://www.just-eat.co.uk/search?q=${encodedQuery}&postcode=${encodedPostcode}`;
  }

  static buildDeliverooUrl(restaurantName: string, postcode: string, dishName?: string): string {
    const searchQuery = dishName ? `${dishName} ${restaurantName}` : restaurantName;
    const encodedQuery = encodeURIComponent(searchQuery);
    const encodedPostcode = encodeURIComponent(postcode);
    return `https://deliveroo.co.uk/search?query=${encodedQuery}&location=${encodedPostcode}`;
  }
}

export class DeliveryApiService {
  constructor() {
    // No API key needed for dummy data
  }

  async searchAllPlatforms(food: string, postcode: string): Promise<Restaurant[]> {
    console.log(`Generating dummy data for "${food}" in ${postcode}`);
    
    // Always use dummy data
    return this.generateDummyRestaurants(food, postcode);
  }

  private generateDummyRestaurants(food: string, postcode: string): Restaurant[] {
    console.log('Using dummy restaurant data');
    const restaurantNames = this.getRestaurantNames(food);
    
    // Create all platform options first
    const allOptions: Restaurant[] = [];
    const platforms: Array<'Uber Eats' | 'Just Eat' | 'Deliveroo'> = ['Uber Eats', 'Just Eat', 'Deliveroo'];
    
    restaurantNames.forEach((name, index) => {
      platforms.forEach(platform => {
        const restaurant: Restaurant = {
          id: `${platform}-${index}`,
          name,
          cuisine: this.determineCuisineFromFood(food),
          platform,
          price: this.generateRealisticPrice(food),
          deliveryFee: this.getDeliveryFee(platform),
          deliveryTime: this.getDeliveryTime(platform),
          rating: 3.8 + Math.random() * 1.2,
          restaurantUrl: this.buildPlatformUrl(platform, name, postcode, food)
        };
        allOptions.push(restaurant);
      });
    });

    // Remove duplicates and keep only cheapest option per restaurant
    return this.removeDuplicatesAndOptimize(allOptions);
  }

  private removeDuplicatesAndOptimize(restaurants: Restaurant[]): Restaurant[] {
    // Group restaurants by name
    const restaurantGroups = new Map<string, Restaurant[]>();
    
    restaurants.forEach(restaurant => {
      if (!restaurantGroups.has(restaurant.name)) {
        restaurantGroups.set(restaurant.name, []);
      }
      restaurantGroups.get(restaurant.name)!.push(restaurant);
    });

    // For each restaurant, keep only the cheapest platform option
    const optimizedRestaurants: Restaurant[] = [];
    
    restaurantGroups.forEach((platformOptions) => {
      // Find the cheapest option
      const cheapest = platformOptions.reduce((min, current) => 
        (current.price + current.deliveryFee) < (min.price + min.deliveryFee) ? current : min
      );
      
      optimizedRestaurants.push(cheapest);
    });

    return optimizedRestaurants.sort((a, b) => a.price - b.price);
  }

  private getDeliveryTime(platform: 'Uber Eats' | 'Just Eat' | 'Deliveroo'): number {
    const baseTimes = {
      'Uber Eats': 25,
      'Just Eat': 30,
      'Deliveroo': 20
    };
    
    const baseTime = baseTimes[platform];
    const variation = Math.floor(Math.random() * 20) - 10; // ±10 minutes
    
    return Math.max(15, baseTime + variation);
  }

  private getDeliveryFee(platform: 'Uber Eats' | 'Just Eat' | 'Deliveroo'): number {
    const platformFees = {
      'Uber Eats': 2.49,
      'Just Eat': 1.99,
      'Deliveroo': 2.99
    };
    
    const baseFee = platformFees[platform];
    const variation = (Math.random() * 1.0) - 0.5; // ±50p variation
    
    return Math.max(0.99, Number((baseFee + variation).toFixed(2)));
  }

  private getRestaurantNames(food: string): string[] {
    const foodLower = food.toLowerCase();
    
    // Return realistic restaurant names that would actually serve this dish
    if (foodLower.includes('katsu') || foodLower.includes('japanese')) {
      return [
        'Wagamama',
        'YO! Sushi',
        'Itsu',
        'Kokoro',
        'Tonkotsu',
        'Katsumama'
      ];
    }
    
    if (foodLower.includes('curry') || foodLower.includes('indian')) {
      return [
        'Dishoom',
        'Curry Express',
        'Bombay Palace',
        'Tamarind Kitchen',
        'Royal Bengal',
        'Spice Village'
      ];
    }
    
    if (foodLower.includes('pizza')) {
      return [
        'Domino\'s Pizza',
        'Pizza Express',
        'Franco Manca',
        'Papa John\'s',
        'Pizza Hut',
        'Firezza'
      ];
    }

    if (foodLower.includes('burger')) {
      return [
        'Five Guys',
        'Byron',
        'Honest Burgers',
        'Burger King',
        'McDonald\'s',
        'GBK'
      ];
    }
    
    // Generic restaurants for other foods
    return [
      'Local Kitchen',
      'The Food Company',
      'Quick Eats',
      'Fresh & Fast',
      'Corner Restaurant',
      'City Bites'
    ];
  }

  private determineCuisineFromFood(food: string): string {
    const foodLower = food.toLowerCase();
    
    if (foodLower.includes('katsu') || foodLower.includes('sushi') || foodLower.includes('ramen')) {
      return 'Japanese';
    }
    if (foodLower.includes('curry') || foodLower.includes('tandoori') || foodLower.includes('biryani')) {
      return 'Indian';
    }
    if (foodLower.includes('pizza') || foodLower.includes('pasta')) {
      return 'Italian';
    }
    if (foodLower.includes('chinese') || foodLower.includes('noodles')) {
      return 'Chinese';
    }
    if (foodLower.includes('burger') || foodLower.includes('fries')) {
      return 'American';
    }
    
    return 'Various';
  }

  private buildPlatformUrl(platform: 'Uber Eats' | 'Just Eat' | 'Deliveroo', restaurantName: string, postcode: string, dishName?: string): string {
    switch (platform) {
      case 'Uber Eats':
        return PlatformUrlBuilder.buildUberEatsUrl(restaurantName, postcode, dishName);
      case 'Just Eat':
        return PlatformUrlBuilder.buildJustEatUrl(restaurantName, postcode, dishName);
      case 'Deliveroo':
        return PlatformUrlBuilder.buildDeliverooUrl(restaurantName, postcode, dishName);
      default:
        return '#';
    }
  }

  private generateRealisticPrice(food: string): number {
    let basePrice = 12;
    
    const foodLower = food.toLowerCase();
    if (foodLower.includes('katsu')) {
      basePrice = 13; // Katsu curry is typically £13-16
    } else if (foodLower.includes('sushi')) {
      basePrice = 15; // Sushi is pricier
    } else if (foodLower.includes('pizza')) {
      basePrice = 10; // Pizza is often cheaper
    } else if (foodLower.includes('burger')) {
      basePrice = 11; // Burgers are mid-range
    }
    
    return Number((basePrice + (Math.random() * 4) - 2).toFixed(2)); // ±£2 variation
  }
}

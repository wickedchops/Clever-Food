
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  price: number;
  deliveryFee: number;
  deliveryTime: number;
  rating: number;
  platform: 'Uber Eats' | 'Just Eat' | 'Deliveroo';
  restaurantUrl?: string;
}

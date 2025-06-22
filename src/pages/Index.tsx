
import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import RestaurantResults from '@/components/RestaurantResults';
import FoodSelection from '@/components/FoodSelection';
import { searchDeliveryApps } from '@/services/deliveryService';
import { Restaurant } from '@/types/restaurant';

const Index = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showFoodSelection, setShowFoodSelection] = useState(false);
  const [currentPostcode, setCurrentPostcode] = useState('');
  const [currentFoodCategory, setCurrentFoodCategory] = useState('');

  // Food category definitions
  const foodCategories = {
    curry: {
      title: 'Select Your Curry Type',
      category: 'curry',
      items: [
        { name: 'Chicken Tikka Masala', price: '£12.99' },
        { name: 'Lamb Vindaloo', price: '£14.50' },
        { name: 'Thai Green Curry', price: '£13.25' },
        { name: 'Thai Red Curry', price: '£13.25' },
        { name: 'Chicken Korma', price: '£12.75' },
        { name: 'Beef Madras', price: '£14.99' },
        { name: 'Vegetable Curry', price: '£11.50' },
        { name: 'Fish Curry', price: '£15.25' },
        { name: 'Butter Chicken', price: '£13.99' },
        { name: 'Prawn Curry', price: '£16.50' }
      ]
    },
    burger: {
      title: 'Select Your Burger Type',
      category: 'burger',
      items: [
        { name: 'Classic Cheeseburger', price: '£8.99' },
        { name: 'Bacon Burger', price: '£10.50' },
        { name: 'Chicken Burger', price: '£9.25' },
        { name: 'Veggie Burger', price: '£8.75' },
        { name: 'Fish Burger', price: '£9.99' },
        { name: 'BBQ Burger', price: '£11.25' },
        { name: 'Double Cheeseburger', price: '£12.50' },
        { name: 'Spicy Chicken Burger', price: '£10.75' },
        { name: 'Mushroom Swiss Burger', price: '£11.99' },
        { name: 'Turkey Burger', price: '£9.50' }
      ]
    },
    pizza: {
      title: 'Select Your Pizza Type',
      category: 'pizza',
      items: [
        { name: 'Margherita Pizza', price: '£9.99' },
        { name: 'Pepperoni Pizza', price: '£11.50' },
        { name: 'Hawaiian Pizza', price: '£12.25' },
        { name: 'Meat Feast Pizza', price: '£14.99' },
        { name: 'Vegetarian Pizza', price: '£10.75' },
        { name: 'BBQ Chicken Pizza', price: '£13.50' },
        { name: 'Four Cheese Pizza', price: '£12.99' },
        { name: 'Mushroom Pizza', price: '£10.25' },
        { name: 'Spicy Pepperoni Pizza', price: '£12.75' },
        { name: 'Seafood Pizza', price: '£15.50' }
      ]
    },
    pasta: {
      title: 'Select Your Pasta Type',
      category: 'pasta',
      items: [
        { name: 'Spaghetti Bolognese', price: '£10.99' },
        { name: 'Chicken Alfredo', price: '£12.50' },
        { name: 'Carbonara', price: '£11.75' },
        { name: 'Penne Arrabbiata', price: '£9.99' },
        { name: 'Lasagna', price: '£13.25' },
        { name: 'Seafood Linguine', price: '£15.50' },
        { name: 'Mushroom Risotto', price: '£11.99' },
        { name: 'Pesto Pasta', price: '£10.25' },
        { name: 'Mac and Cheese', price: '£8.75' },
        { name: 'Chicken Parmigiana', price: '£14.99' }
      ]
    }
  };

  const handleSearch = async (food: string, postcode: string) => {
    const foodLower = food.toLowerCase().trim();
    
    // Check if user searched for a generic food category
    if (foodCategories[foodLower as keyof typeof foodCategories]) {
      setShowFoodSelection(true);
      setCurrentPostcode(postcode);
      setCurrentFoodCategory(foodLower);
      setHasSearched(false);
      return;
    }

    setShowFoodSelection(false);
    setLoading(true);
    setHasSearched(true);
    
    try {
      // Simulate API delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 1500));
      const results = await searchDeliveryApps(food, postcode);
      setRestaurants(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFoodSelect = async (foodType: string) => {
    setShowFoodSelection(false);
    setLoading(true);
    setHasSearched(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const results = await searchDeliveryApps(foodType, currentPostcode);
      setRestaurants(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentCategory = foodCategories[currentFoodCategory as keyof typeof foodCategories];

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
          <p className="text-sm text-gray-500 mt-2">
            Demo app using sample data for illustration purposes
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Try searching: "curry", "burger", "pizza", or "pasta" for specific options
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>

        {/* Food Selection */}
        {showFoodSelection && currentCategory && (
          <div className="mb-12">
            <FoodSelection 
              onFoodSelect={handleFoodSelect} 
              postcode={currentPostcode}
              category={currentCategory.category}
              title={currentCategory.title}
              items={currentCategory.items}
            />
          </div>
        )}

        {/* Results */}
        {hasSearched && (
          <div className="max-w-6xl mx-auto">
            <RestaurantResults restaurants={restaurants} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;

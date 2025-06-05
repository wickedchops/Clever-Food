
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';

interface SearchFormProps {
  onSearch: (food: string, postcode: string) => void;
  loading: boolean;
}

const SearchForm = ({ onSearch, loading }: SearchFormProps) => {
  const [food, setFood] = useState('');
  const [postcode, setPostcode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (food.trim() && postcode.trim()) {
      onSearch(food.trim(), postcode.trim());
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="What are you craving? (e.g., Katsu Curry)"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              disabled={loading}
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Enter UK postcode (e.g., SW1A 1AA)"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              disabled={loading}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={!food.trim() || !postcode.trim() || loading}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-xl transition-all duration-200 transform hover:scale-105"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Searching all platforms...
            </div>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Find Best Deals
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;

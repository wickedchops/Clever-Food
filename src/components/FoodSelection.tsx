
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FoodItem {
  name: string;
  price: string;
}

interface FoodSelectionProps {
  onFoodSelect: (foodType: string) => void;
  postcode: string;
  category: string;
  title: string;
  items: FoodItem[];
}

const FoodSelection = ({ onFoodSelect, postcode, category, title, items }: FoodSelectionProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            {title}
          </CardTitle>
          <p className="text-gray-600">Choose from our available {category} options in {postcode}</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Button
                key={item.name}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-1 hover:bg-blue-50 hover:border-blue-300"
                onClick={() => onFoodSelect(item.name)}
              >
                <span className="font-semibold text-gray-800">{item.name}</span>
                <span className="text-sm text-gray-600">From {item.price}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodSelection;

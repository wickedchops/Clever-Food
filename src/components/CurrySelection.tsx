
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CurrySelectionProps {
  onCurrySelect: (curryType: string) => void;
  postcode: string;
}

const CurrySelection = ({ onCurrySelect, postcode }: CurrySelectionProps) => {
  const curryTypes = [
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
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Select Your Curry Type
          </CardTitle>
          <p className="text-gray-600">Choose from our available curry options in {postcode}</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {curryTypes.map((curry) => (
              <Button
                key={curry.name}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-1 hover:bg-blue-50 hover:border-blue-300"
                onClick={() => onCurrySelect(curry.name)}
              >
                <span className="font-semibold text-gray-800">{curry.name}</span>
                <span className="text-sm text-gray-600">From {curry.price}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrySelection;

import { TopSellingItem } from '../../types/dashboard';

type TopSellingItemsProps = {
  items: TopSellingItem[];
};

const TopSellingItems: React.FC<TopSellingItemsProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
          <div className="flex-shrink-0 h-12 w-12 bg-gray-100 rounded-lg overflow-hidden">
            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
            <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
          </div>
          <div className="ml-2 flex items-center">
            <div className="text-sm font-medium text-gray-900">{item.soldCount}</div>
            <span className="ml-1 text-xs text-gray-500">sold</span>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className="h-2 bg-gray-100 rounded-full w-24">
              <div 
                className="h-2 bg-blue-600 rounded-full" 
                style={{ width: `${Math.min(item.soldCount / item.totalStock * 100, 100)}%` }} 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopSellingItems;
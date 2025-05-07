import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  iconBgColor: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, iconBgColor }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition duration-300 hover:shadow-md">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span className="text-sm font-medium ml-1">
            {Math.abs(change)}%
          </span>
        </div>
        <span className="text-sm text-gray-500 ml-2">vs. last period</span>
      </div>
    </div>
  );
};

export default StatCard;
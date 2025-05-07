import { useEffect, useState } from 'react';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Coffee
} from 'lucide-react';
import { getRecentOrders, getTopSellingItems } from '../../services/dashboardService';
import StatCard from '../../components/dashboard/StatCard';
import RecentOrdersList from '../../components/dashboard/RecentOrdersList';
import TopSellingItems from '../../components/dashboard/TopSellingItems';
import SalesByDayChart from '../../components/dashboard/SalesByDayChart';
import { RecentOrder, TopSellingItem } from '../../types/dashboard';

const DashboardPage = () => {
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topSellingItems, setTopSellingItems] = useState<TopSellingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const ordersData = await getRecentOrders();
        const topItemsData = await getTopSellingItems();
        
        setRecentOrders(ordersData);
        setTopSellingItems(topItemsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsData = [
    {
      title: 'Total Orders',
      value: '1,234',
      change: 12.5,
      icon: <ShoppingBag size={24} />,
      iconColor: 'bg-orange-100 text-orange-600',
    },
    {
      title: 'Total Customers',
      value: '856',
      change: 8.2,
      icon: <Users size={24} />,
      iconColor: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Total Revenue',
      value: '$23,456',
      change: -2.5,
      icon: <DollarSign size={24} />,
      iconColor: 'bg-green-100 text-green-600',
    },
    {
      title: 'Avg. Order Value',
      value: '$19.00',
      change: 4.7,
      icon: <TrendingUp size={24} />,
      iconColor: 'bg-purple-100 text-purple-600',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center space-x-2 text-sm">
          <Calendar size={16} className="text-gray-500" />
          <span className="text-gray-500">
            {new Date().toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            iconBgColor={stat.iconColor}
          />
        ))}
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Sales Overview</h2>
            <select className="text-sm border-gray-300 rounded-md">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <SalesByDayChart />
        </div>

        {/* Top Selling Items */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Top Selling Items</h2>
            <select className="text-sm border-gray-300 rounded-md">
              <option>This Week</option>
              <option>This Month</option>
              <option>All Time</option>
            </select>
          </div>
          <TopSellingItems items={topSellingItems} />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
          <button className="text-blue-600 text-sm font-medium">View All Orders</button>
        </div>
        <RecentOrdersList orders={recentOrders} />
      </div>
    </div>
  );
};

export default DashboardPage;
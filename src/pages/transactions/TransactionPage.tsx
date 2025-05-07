import { useState } from 'react';
import { Search, Download, Eye, Calendar, DollarSign, Clock } from 'lucide-react';

type Transaction = {
  id: string;
  orderId: string;
  customer: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
};

const mockTransactions: Transaction[] = [
  {
    id: 'TRX-001',
    orderId: 'ORD-001',
    customer: 'John Doe',
    date: '2025-04-10 14:30:00',
    amount: 45.99,
    status: 'completed',
    paymentMethod: 'Credit Card',
    items: [
      { name: 'Cheeseburger', quantity: 2, price: 12.99 },
      { name: 'French Fries', quantity: 1, price: 4.99 },
      { name: 'Soft Drink', quantity: 2, price: 2.99 }
    ]
  },
  {
    id: 'TRX-002',
    orderId: 'ORD-002',
    customer: 'Jane Smith',
    date: '2025-04-10 15:15:00',
    amount: 32.50,
    status: 'completed',
    paymentMethod: 'PayPal',
    items: [
      { name: 'Pizza', quantity: 1, price: 24.99 },
      { name: 'Salad', quantity: 1, price: 7.51 }
    ]
  }
];

const TransactionPage = () => {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transaction History</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search transactions..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700">
            <Download size={20} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transactions List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                      <div className="text-sm text-gray-500">{transaction.orderId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${transaction.amount.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => setSelectedTransaction(transaction)}
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="lg:col-span-1">
          {selectedTransaction ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b">
                  <div className="text-sm text-gray-500">Transaction ID</div>
                  <div className="font-medium">{selectedTransaction.id}</div>
                </div>
                <div className="flex items-center justify-between pb-3 border-b">
                  <div className="text-sm text-gray-500">Order ID</div>
                  <div className="font-medium">{selectedTransaction.orderId}</div>
                </div>
                <div className="flex items-center justify-between pb-3 border-b">
                  <div className="text-sm text-gray-500">Customer</div>
                  <div className="font-medium">{selectedTransaction.customer}</div>
                </div>
                <div className="flex items-center justify-between pb-3 border-b">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-1" />
                    Date
                  </div>
                  <div className="font-medium">{selectedTransaction.date}</div>
                </div>
                <div className="flex items-center justify-between pb-3 border-b">
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign size={16} className="mr-1" />
                    Amount
                  </div>
                  <div className="font-medium">${selectedTransaction.amount.toFixed(2)}</div>
                </div>
                <div className="flex items-center justify-between pb-3 border-b">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock size={16} className="mr-1" />
                    Status
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedTransaction.status)}`}>
                    {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Order Items</h3>
                  <div className="bg-gray-50 rounded-lg p-3">
                    {selectedTransaction.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <div>
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                        </div>
                        <div className="text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    ))}
                    <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center">
                      <div className="font-medium">Total</div>
                      <div className="font-medium">${selectedTransaction.amount.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Select a transaction to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
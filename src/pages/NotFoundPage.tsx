import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFoundPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsVisible(false);
    navigate('/admin/dashboard');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden transform transition-all animate-fade-in-up">
        <div className="bg-red-50 p-4 sm:p-6 flex items-center border-b border-red-100">
          <div className="flex-shrink-0">
            <AlertTriangle size={32} className="text-red-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-red-800">Page Not Found</h3>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center">
            <p className="text-gray-700 mb-6">
              The page you are looking for does not exist or may have been moved.
            </p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={handleClose}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Home size={16} className="mr-2" />
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
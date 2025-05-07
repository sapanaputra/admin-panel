import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Coffee, 
  Users, 
  User, 
  Image, 
  Phone, 
  ShoppingCart,
  FileText,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <li 
      className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive 
          ? 'bg-blue-700 text-white' 
          : 'text-gray-300 hover:bg-blue-800 hover:text-white'
      }`}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <span className="font-medium">{label}</span>
    </li>
  );
};

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/food', label: 'Food Menu', icon: <Coffee size={20} /> },
    { path: '/admin/customers', label: 'Customers', icon: <Users size={20} /> },
    { path: '/admin/profile', label: 'User Profile', icon: <User size={20} /> },
    { path: '/admin/banners', label: 'Banners', icon: <Image size={20} /> },
    { path: '/admin/contacts', label: 'Contact', icon: <Phone size={20} /> },
    { path: '/admin/transactions', label: 'Transactions', icon: <ShoppingCart size={20} /> },
    { path: '/admin/reports', label: 'Reports', icon: <FileText size={20} /> },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-blue-900 text-white">
        <div className="p-5 border-b border-blue-800">
          <h1 className="text-2xl font-bold">Food Admin</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <SidebarItem 
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isActive={location.pathname === item.path}
                onClick={() => handleNavigate(item.path)}
              />
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-blue-800">
          <button 
            className="flex items-center w-full px-4 py-2 text-white rounded-lg hover:bg-blue-800 transition-colors"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="md:hidden mr-2 text-gray-700 hover:text-gray-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                {navItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
              </h2>
            </div>
            
            <div className="flex items-center">
              <div className="text-right">
                <p className="text-sm text-gray-700">Welcome,</p>
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              </div>
              <div className="ml-3 relative">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  {user?.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-20 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="fixed inset-y-0 left-0 w-64 bg-blue-900 shadow-lg z-30" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-blue-800 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Food Admin</h1>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} className="text-white" />
                </button>
              </div>
              
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <SidebarItem 
                      key={item.path}
                      icon={item.icon}
                      label={item.label}
                      path={item.path}
                      isActive={location.pathname === item.path}
                      onClick={() => handleNavigate(item.path)}
                    />
                  ))}
                </ul>
              </nav>
              
              <div className="p-4 border-t border-blue-800">
                <button 
                  className="flex items-center w-full px-4 py-2 text-white rounded-lg hover:bg-blue-800 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut size={20} className="mr-3" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
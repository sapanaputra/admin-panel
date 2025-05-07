import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import FoodManagementPage from './pages/food/FoodManagementPage';
import FoodFormPage from './pages/food/FoodFormPage';
import CustomerPage from './pages/customers/CustomerPage';
import UserProfilePage from './pages/users/UserProfilePage';
import BannerPage from './pages/banners/BannerPage';
import ContactPage from './pages/contacts/ContactPage';
import TransactionPage from './pages/transactions/TransactionPage';
import ReportPage from './pages/reports/ReportPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Protected Routes */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="food" element={<FoodManagementPage />} />
            <Route path="food/create" element={<FoodFormPage />} />
            <Route path="food/edit/:id" element={<FoodFormPage />} />
            <Route path="customers" element={<CustomerPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="banners" element={<BannerPage />} />
            <Route path="contacts" element={<ContactPage />} />
            <Route path="transactions" element={<TransactionPage />} />
            <Route path="reports" element={<ReportPage />} />
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
          
          {/* Redirect from root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
}

export default App;
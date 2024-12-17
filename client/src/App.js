import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/welcomepage/Header';
import MainContent from './components/welcomepage/MainContent';
import Footer from './components/welcomepage/Footer';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/register/RegisterPage';
import PasswordReset from './components/password_reset/Password_reset';
import ResetPassword from './components/password_reset/NewPassword';
import FAQPage from './components/faq/FAQPage';
import FloatingChatButton from './components/faq/FloatingChatButton';
import ContactPage from './components/contact/ContactPage'; 
import InformationPage from './components/information/InformationPage';
import Homepage from './components/homepage/homepage';
import PersonalInfoPage from './components/user_account/PersonalInfoPage';
import DataSharingPage from './components/user_account/DataSharingPage';
import DashboardPage from './components/user_account/DashboardPage';
import SettingsPage from './components/user_account/SettingsPage';
import Sidebar from './components/user_account/Sidebar';
import UserAccountLayout from './components/user_account/UserAccountLayout';
import FeedbackForm from './components/feedback/FeedbackForm';
import BatteryDashboard from './components/battery_dashboard/batteryDashboard';
import SolarDashboard from './components/solar_dashboard/solarDashboard';
import AboutUs from './components/about_us/AboutUsPage';
import AboutUsPage from "./components/aboutus/AboutUs"
import SimulatieForm from './components/simulatie_dashboard/SimulatieForm';
import SimulatieResults from './components/simulatie_dashboard/SimulatieResults'; 
import EnergyPrices  from './components/simulatie_dashboard/EnergyPrices';
import SunHours from './components/simulatie_dashboard/SunHours';
import SimulatieDashboard from './components/simulatie_dashboard/SimulatieDashboard';
import { PrivateRoute, PublicRoute } from './components/routes/PrivateRoute';
import { AuthProvider, useAuth } from './components/AuthContext';
import './App.css';

function LogoutTimer() {
  const logoutTimeout = 15 * 60 * 1000; // 15 minutes
  const navigate = useNavigate();
  const { loggedIn, logout } = useAuth(); // Access loggedIn state and logout method

  const handleLogout = useCallback(() => {
    logout(); // Call the logout method from AuthContext
    alert("You have been logged out due to inactivity.");
    navigate('/login');
  }, [logout, navigate]);

  useEffect(() => {
    if (!loggedIn) return; 

    let timer = setTimeout(handleLogout, logoutTimeout);

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(handleLogout, logoutTimeout);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [loggedIn, handleLogout, logoutTimeout]);

  return null;
}
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
        <LogoutTimer />
          <Header />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainContent />} />
            <Route path="/password_reset" element={<PasswordReset />} />
            <Route path="/reset/:token" element={<ResetPassword />} />

            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/information" element={<InformationPage />} />
            <Route path="/feedback" element={<FeedbackForm />} />

            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/about_us1" element={<AboutUsPage />} />

            {/* Public Routes where logged-in users cannot access */}
            <Route path="/login" element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } />

            {/* User Account Section (Nested Routes) */}
            <Route 
              path="/user-account/*" 
              element={
                <PrivateRoute>
                  <UserAccountLayout />
                </PrivateRoute>
              }
            >
              <Route path="personal-info" element={<PersonalInfoPage />} />
              <Route path="data-sharing" element={<DataSharingPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Private Routes where non logged-in users cannot access */}
            <Route path="/home" element={
                <PrivateRoute>
                  <Homepage />
                </PrivateRoute>
              } />
            <Route path="/battery_dashboard" element={
              <PrivateRoute>
                <BatteryDashboard />
              </PrivateRoute>
            } />
            <Route path="/solar_dashboard" element={
              <PrivateRoute>
                <SolarDashboard  />
              </PrivateRoute>
            } />
            <Route path="/simulatie" element={
              <PrivateRoute>
                <SimulatieForm userId={1} />
              </PrivateRoute>
            } />
            <Route path="/simulatie-results/:userId" element={
              <PrivateRoute>
                <SimulatieResults />
              </PrivateRoute>
            } />
            <Route path="/energy-prices" element={
              <PrivateRoute>
                <EnergyPrices />
              </PrivateRoute>
            } />
            <Route path="/sun-hours" element={
              <PrivateRoute>
                <SunHours />
              </PrivateRoute>
            } />
            <Route path="/simulatie_dashboard" element={
              <PrivateRoute>
                <SimulatieDashboard />
              </PrivateRoute>
            } />
          </Routes>

          <FloatingChatButton />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

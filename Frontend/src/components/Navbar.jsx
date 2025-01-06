import React, { useState, useContext } from 'react';
import { Menu, X, Home, CreditCard, LogOut, UserPlus, Barcode, Phone, Wallet, Ticket, Bolt, DollarSign, Train, Settings as SettingsIcon, List } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/Context';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const navigationLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Transaction', path: '/transaction', icon: CreditCard },
    { name: 'Transaction History', path: '/transaction-history', icon: List },  // Added Transaction History
    { name: 'Profile', path: '/profile', icon: UserPlus },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleNavigate = () => navigate("/login");

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-blue-600">PayApp</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigationLinks.map(({ name, path, icon: Icon }) => (
              <Link
                key={name}
                to={path}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <Icon className="h-5 w-5" />
                <span>{name}</span>
              </Link>
            ))}
          </div>

          {/* Auth Button */}
          <div className="hidden md:flex items-center">
            {user ? (
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={handleNavigate}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors duration-200"
              >
                <UserPlus className="h-5 w-5" />
                <span>Sign Up</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
            {navigationLinks.map(({ name, path, icon: Icon }) => (
              <Link
                key={name}
                to={path}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{name}</span>
              </Link>
            ))}
            <div className="mt-4 px-3 py-2">
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleNavigate();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors duration-200"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Sign Up</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Service Buttons for Additional Features */}
      <div className="md:flex md:justify-between md:px-4 mt-4 md:mt-0">
        <div className="flex gap-4">
          <Link to="/scan-pay">
            <button className="bg-white hover:bg-gray-100 p-2 rounded-md">
              <Barcode className="h-6 w-6 text-blue-600" />
              <span className="text-xs">Scan & Pay</span>
            </button>
          </Link>

          <Link to="/mobile-recharge">
            <button className="bg-white hover:bg-gray-100 p-2 rounded-md">
              <Phone className="h-6 w-6 text-blue-600" />
              <span className="text-xs">Mobile Recharge</span>
            </button>
          </Link>

          <Link to="/personal-loan">
            <button className="bg-white hover:bg-gray-100 p-2 rounded-md">
              <Wallet className="h-6 w-6 text-blue-600" />
              <span className="text-xs">Personal Loan</span>
            </button>
          </Link>

          <Link to="/movie-tickets">
            <button className="bg-white hover:bg-gray-100 p-2 rounded-md">
              <Ticket className="h-6 w-6 text-blue-600" />
              <span className="text-xs">Movie Tickets</span>
            </button>
          </Link>

          <Link to="/electricity-bill">
            <button className="bg-white hover:bg-gray-100 p-2 rounded-md">
              <Bolt className="h-6 w-6 text-blue-600" />
              <span className="text-xs">Electricity Bill</span>
            </button>
          </Link>

          <Link to="/gas-bill">
            <button className="bg-white hover:bg-gray-100 p-2 rounded-md">
              <DollarSign className="h-6 w-6 text-blue-600" />
              <span className="text-xs">Gas Bill</span>
            </button>
          </Link>

          <Link to="/train-tickets">
            <button className="bg-white hover:bg-gray-100 p-2 rounded-md">
              <Train className="h-6 w-6 text-blue-600" />
              <span className="text-xs">Train Tickets</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

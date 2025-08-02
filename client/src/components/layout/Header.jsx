import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to check if current path is active
  const isActive = (path) => {
    if (path === '/' && (location.pathname === '/' || location.pathname === '/home')) {
      return true;
    }
    return location.pathname === path;
  };

  // Custom navigation function with scroll to top
  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    // Ensure scroll to top (backup to ScrollToTop component)
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>03447732310</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>Alex@valhallalogisticllc.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>1255 FRANKLIN AVE SUITE 350 GARDEN CITY, NY 11530</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <button onClick={() => handleNavigation('/')} className="flex items-center">
              <div className="text-2xl font-bold text-blue-900">
                Valhalla Logistic LLC
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => handleNavigation('/')}
                className={`transition-colors duration-200 font-medium ${
                  isActive('/') 
                    ? 'text-blue-900 border-b-2 border-blue-900 pb-1' 
                    : 'text-gray-700 hover:text-blue-900'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('/about')}
                className={`transition-colors duration-200 font-medium ${
                  isActive('/about') 
                    ? 'text-blue-900 border-b-2 border-blue-900 pb-1' 
                    : 'text-gray-700 hover:text-blue-900'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => handleNavigation('/services')}
                className={`transition-colors duration-200 font-medium ${
                  isActive('/services') 
                    ? 'text-blue-900 border-b-2 border-blue-900 pb-1' 
                    : 'text-gray-700 hover:text-blue-900'
                }`}
              >
                Services
              </button>
              <button 
                onClick={() => handleNavigation('/agreement')}
                className={`transition-colors duration-200 font-medium ${
                  isActive('/agreement') 
                    ? 'text-blue-900 border-b-2 border-blue-900 pb-1' 
                    : 'text-gray-700 hover:text-blue-900'
                }`}
              >
                Agreement
              </button>
              <button 
                onClick={() => handleNavigation('/contact')}
                className={`transition-colors duration-200 font-medium ${
                  isActive('/contact') 
                    ? 'text-blue-900 border-b-2 border-blue-900 pb-1' 
                    : 'text-gray-700 hover:text-blue-900'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex">
              <button 
                onClick={() => handleNavigation('/agreement')}
                className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-900 transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => handleNavigation('/')}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive('/') 
                    ? 'text-blue-900 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigation('/about')}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive('/about') 
                    ? 'text-blue-900 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => handleNavigation('/services')}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive('/services') 
                    ? 'text-blue-900 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
                }`}
              >
                Services
              </button>
              <button 
                onClick={() => handleNavigation('/agreement')}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive('/agreement') 
                    ? 'text-blue-900 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
                }`}
              >
                Agreement
              </button>
              <button 
                onClick={() => handleNavigation('/contact')}
                className={`block w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive('/contact') 
                    ? 'text-blue-900 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
                }`}
              >
                Contact
              </button>
              <div className="px-3 py-2">
                <button 
                  onClick={() => handleNavigation('/agreement')}
                  className="block w-full text-center bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors duration-200"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
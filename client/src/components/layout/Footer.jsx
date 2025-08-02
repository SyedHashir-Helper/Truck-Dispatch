import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  // Custom navigation function with scroll to top
  const handleNavigation = (path) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 100);
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', name: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', name: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', name: 'LinkedIn' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', name: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Valhalla Logistic LLC
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Your trusted partner in logistics and transportation. We specialize in reliable, efficient, and secure delivery solutions across the globe.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">03447732310</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">Alex@valhallalogisticllc.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                  <span className="text-gray-300">
                    1255 FRANKLIN AVE SUITE 350<br />
                    GARDEN CITY, NY 11530
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Our Services</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => handleNavigation('/services')}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    Dedicated Trucking
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/services')}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    Amazon Load Handling
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/services')}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    Government Contracts
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/services')}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    Logistics Solutions
                  </button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => handleNavigation('/about')}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/about')}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    Our Team
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/contact')}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/contact')}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    News & Updates
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Support</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => handleNavigation('/contact')}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    Contact Support
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/')}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    Track Shipment
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/contact')}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/agreement')}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    Documentation
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold text-white mb-2">
                Stay Updated
              </h4>
              <p className="text-gray-300">
                Get the latest updates on our services and industry insights.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Valhalla Logistic LLC. All rights reserved.
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="py-6 border-t border-gray-800">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">
              Licensed & Certified Transportation Provider
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>USDOT# 4091738</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>MC# 1558919</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>DOT Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Fully Insured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
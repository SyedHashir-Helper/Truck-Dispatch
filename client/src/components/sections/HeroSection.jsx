import React from 'react';
import { ArrowRight, Play, Shield, Clock, Users } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 to-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-900 to-blue-600"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4 mr-2" />
                Trusted By Industry Leaders
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Fast, Reliable, and{' '}
                <span className="text-blue-900 relative">
                  Efficient
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-200 rounded"></div>
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                At Valhalla Logistic LLC, we specialize in the transportation, storage, and distribution of goods with unmatched efficiency. We collaborate with the best in the industry to deliver exceptional service.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">On-Time</p>
                  <p className="text-sm text-gray-600">Delivery</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Secure</p>
                  <p className="text-sm text-gray-600">Transport</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Expert</p>
                  <p className="text-sm text-gray-600">Team</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#agreement" 
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all duration-200 font-semibold text-lg group"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-900 hover:text-blue-900 transition-all duration-200 font-semibold text-lg group">
                <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Watch Video
              </button>
            </div>
          </div>

          {/* Right Content - Video Placeholder */}
          <div className="relative">
            <div className="relative bg-gray-200 rounded-2xl aspect-video overflow-hidden shadow-2xl">
              {/* Video Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto">
                    <Play className="w-8 h-8 text-blue-900 ml-1" />
                  </div>
                  <p className="text-gray-600 font-medium">Play Video</p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-500 rounded-full animate-pulse delay-1000"></div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-900">1000+</p>
                  <p className="text-sm text-gray-600">Happy Clients</p>
                </div>
                <div className="w-px h-12 bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">99.9%</p>
                  <p className="text-sm text-gray-600">On-Time Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="white"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
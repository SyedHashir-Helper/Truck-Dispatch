import React, { useState } from 'react';
import { Search, MapPin, Truck, Package, CheckCircle, Clock, AlertCircle, Eye } from 'lucide-react';

const TrackingSection = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Sample tracking data
  const sampleTrackingData = {
    trackingNumber: 'VL2024001234',
    status: 'In Transit',
    estimatedDelivery: '2024-07-31',
    origin: 'Garden City, NY',
    destination: 'Los Angeles, CA',
    carrier: 'Valhalla Logistics',
    timeline: [
      {
        status: 'Package Picked Up',
        location: 'Garden City, NY',
        date: '2024-07-28',
        time: '09:30 AM',
        completed: true,
        icon: <Package className="w-5 h-5" />
      },
      {
        status: 'In Transit',
        location: 'Columbus, OH',
        date: '2024-07-29',
        time: '02:15 PM',
        completed: true,
        icon: <Truck className="w-5 h-5" />
      },
      {
        status: 'Out for Delivery',
        location: 'Los Angeles, CA',
        date: '2024-07-31',
        time: '08:00 AM',
        completed: false,
        icon: <MapPin className="w-5 h-5" />
      },
      {
        status: 'Delivered',
        location: 'Los Angeles, CA',
        date: '2024-07-31',
        time: 'Estimated',
        completed: false,
        icon: <CheckCircle className="w-5 h-5" />
      }
    ]
  };

  const handleTrackPackage = () => {
    if (!trackingNumber.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingResult({
        ...sampleTrackingData,
        trackingNumber: trackingNumber
      });
      setIsSearching(false);
    }, 1500);
  };

  const trackingFeatures = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-Time Updates",
      description: "Get instant notifications on your shipment status"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "GPS Tracking",
      description: "Live location tracking with precise coordinates"
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Delivery Alerts",
      description: "SMS and email notifications for important updates"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Proof of Delivery",
      description: "Photo confirmation and signature capture"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Search className="w-4 h-4 mr-2" />
            Track Your Shipment
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Real-Time Package Tracking
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about your shipment's journey with our advanced tracking system. Get real-time updates from pickup to delivery.
          </p>
        </div>

        {/* Tracking Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Enter Your Tracking Number
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number (e.g., VL2024001234)"
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleTrackPackage()}
                />
              </div>
              <button
                onClick={handleTrackPackage}
                disabled={isSearching || !trackingNumber.trim()}
                className="px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-semibold text-lg flex items-center justify-center"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Track Package
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setTrackingNumber('VL2024001234')}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Try sample tracking number: VL2024001234
              </button>
            </div>
          </div>
        </div>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Tracking Header */}
              <div className="border-b border-gray-200 pb-6 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Tracking Number</h4>
                    <p className="text-lg font-semibold text-gray-900">{trackingResult.trackingNumber}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <p className="text-lg font-semibold text-green-600">{trackingResult.status}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Estimated Delivery</h4>
                    <p className="text-lg font-semibold text-gray-900">{trackingResult.estimatedDelivery}</p>
                  </div>
                </div>
              </div>

              {/* Route Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">From</p>
                    <p className="text-lg font-semibold text-gray-900">{trackingResult.origin}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">To</p>
                    <p className="text-lg font-semibold text-gray-900">{trackingResult.destination}</p>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6">Shipment Timeline</h4>
                <div className="space-y-6">
                  {trackingResult.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        event.completed 
                          ? 'bg-green-100 text-green-600' 
                          : index === trackingResult.timeline.findIndex(e => !e.completed)
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        {event.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className={`font-semibold ${
                            event.completed 
                              ? 'text-gray-900' 
                              : index === trackingResult.timeline.findIndex(e => !e.completed)
                                ? 'text-blue-900'
                                : 'text-gray-500'
                          }`}>
                            {event.status}
                          </h5>
                          <span className="text-sm text-gray-500">
                            {event.date} at {event.time}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Advanced Tracking Features
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive tracking system provides complete visibility throughout your shipment's journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trackingFeatures.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section - Updated to Two Columns */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Text Content Column */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Need Help with Tracking?
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Our customer support team is available 24/7 to assist you with any tracking inquiries or shipment concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-semibold text-lg"
                >
                  Contact Support
                </a>
                <a 
                  href="tel:03447732310" 
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition-colors duration-200 font-semibold text-lg"
                >
                  Call: 03447732310
                </a>
              </div>
            </div>

            {/* Image Placeholder Column */}
            <div className="bg-gray-100 min-h-[300px] lg:min-h-[400px] relative">
              {/* Placeholder for image - replace with actual image */}
              
              
              {/* Uncomment to use actual image */}
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692"
                alt="Customer support team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackingSection;
import React from 'react';
import { Truck, Package, Shield, MapPin, Clock, Star, ArrowRight } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Dedicated Trucking Services",
      description: "We provide reliable and consistent trucking services for dedicated lanes, ensuring seamless, on-time deliveries tailored to your specific route needs. Whether you're shipping regionally or across the country, our dedicated lanes offer the flexibility and reliability your business depends on.",
      features: ["Dedicated Routes", "On-Time Delivery", "Real-Time Tracking"],
      color: "blue"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Amazon Load Handling",
      description: "We specialize in handling Amazon loads with precision and efficiency. Our drivers are experienced in meeting Amazon's strict delivery requirements, ensuring your shipments are delivered on time and in perfect condition. Trust us for smooth and timely deliveries that keep your supply chain moving.",
      features: ["Amazon Compliance", "Express Delivery", "Quality Assurance"],
      color: "green"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Government Contract Logistics",
      description: "As a trusted Broker, we provide expert logistics solutions for government contracts, handling everything from sensitive materials to large-scale shipments. We ensure compliance with all regulations and deadlines, delivering your cargo safely and on time.",
      features: ["Regulatory Compliance", "Secure Transport", "Government Certified"],
      color: "purple"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        iconBg: "bg-blue-100",
        iconText: "text-blue-600",
        accent: "text-blue-900",
        button: "bg-blue-900 hover:bg-blue-800"
      },
      green: {
        bg: "bg-green-50",
        iconBg: "bg-green-100",
        iconText: "text-green-600",
        accent: "text-green-900",
        button: "bg-green-900 hover:bg-green-800"
      },
      purple: {
        bg: "bg-purple-50",
        iconBg: "bg-purple-100",
        iconText: "text-purple-600",
        accent: "text-purple-900",
        button: "bg-purple-900 hover:bg-purple-800"
      }
    };
    return colorMap[color];
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2" />
            Our Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Logistics Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Valhalla Logistic LLC specializes in managing the transportation, storage, and distribution of goods with unmatched efficiency.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const colors = getColorClasses(service.color);
            return (
              <div 
                key={index}
                className={`${colors.bg} p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group hover:-translate-y-2`}
              >
                <div className={`${colors.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <div className={colors.iconText}>
                    {service.icon}
                  </div>
                </div>
                
                <h3 className={`text-2xl font-bold ${colors.accent} mb-4`}>
                  {service.title}
                </h3>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <div className={`w-2 h-2 ${colors.iconText.replace('text-', 'bg-')} rounded-full mr-3`}></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button className={`w-full ${colors.button} text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center group`}>
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-900 mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Successful Deliveries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-gray-600 font-medium">On-Time Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Partner Companies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
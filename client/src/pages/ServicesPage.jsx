import React from 'react';
import { Truck, Package, Shield, MapPin, Clock, Star, ArrowRight, CheckCircle } from 'lucide-react';
import ServicesSection from '../components/sections/ServicesSection';

const ServicesPage = () => {
  const services = [
    {
      image: "https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62", // Add your image paths
      title: "Dedicated Loads",
      icon: <Truck className="w-8 h-8" />,
      description: "At Valhalla Logistic LLC, we specialize in providing dependable trucking services for dedicated lanes and routes. Our dedicated load solutions are designed to offer consistency, efficiency, and peace of mind for businesses that require scheduled, repeat deliveries. Whether you're managing high-volume shipments or time-sensitive freight, we understand the importance of reliability in every mile.",
      features: ["Dedicated Routes", "On-Time Delivery", "Real-Time Tracking", "Flexible Scheduling"],
      color: "blue",
      stats: { routes: "500+", onTime: "99.8%", coverage: "48 States" }
    },
    {
      image: "https://d18279jai9mgjk.cloudfront.net/dims4/default/6a57c05/2147483647/strip/true/crop/718x404+24+0/resize/1000x563!/quality/90/?url=https%3A%2F%2Frelay2-production-relay.s3.us-east-1.amazonaws.com%2Fbrightspot%2F3f%2Ff1%2F4477a1c241318f96a48641791bc0%2Faf-blog-crop-944x404-ar-2023testimonial-campaign-carriers-ungradedimage-1579.png",
      icon: <Package className="w-8 h-8" />,
      title: "Amazon Load Handling",
      description: "We specialize in managing Amazon loads with precision, speed, and reliability. Our experienced logistics team understands the unique demands of Amazon’s shipping network, including the strict delivery windows, compliance standards, and performance metrics that sellers and carriers must meet.",
      features: ["Amazon Compliance", "Express Delivery", "Quality Assurance", "Peak Season Support"],
      color: "green",
      stats: { deliveries: "10,000+", accuracy: "99.9%", rating: "5 Stars" }
    },
    {
      image: "https://images.unsplash.com/photo-1465844880937-7c02addc633b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      icon: <Shield className="w-8 h-8" />,
      title: "Government Contract Logistics",
      description: "At Valhalla Logistic LLC, we are proud to offer specialized logistics and freight brokerage services tailored to meet the high standards of government contracts. As a trusted and experienced broker, we understand the complexity, precision, and confidentiality required when handling government-related shipments. Our mission is to provide secure, timely, and fully compliant transportation solutions that meet the demands of federal, state, and local agencies.",
      features: ["Regulatory Compliance", "Secure Transport", "Government Certified", "Background Checked Drivers"],
      color: "purple",
      stats: { contracts: "100+", security: "Top Secret", compliance: "100%" }
    }
  ];

  const additionalServices = [
    {
      title: "International Services – Ocean & Air Freight",
      description: "At Valhalla Logistic LLC, we provide comprehensive international freight solutions to support your global operations. Whether by sea or air, our services are designed to move your goods efficiently and securely across borders.",
      icon: <Clock className="w-6 h-6" />
    },
    {
      title: "Affordable Rates and Tailored Services",
      description: "Valhalla Logistic LLC provides cost-effective pricing along with adaptable logistics solutions for businesses of every size. We take the time to understand your specific challenges and create personalized strategies that fit your goals.",
      icon: <Package className="w-6 h-6" />
    },
    {
      title: "Enhanced Security and Compliance for Worry-Free Shipping",
      description: "Partnering with an experienced customs broker ensures smooth navigation through tariffs, duties, taxes, and all international shipping regulations. Our knowledgeable team is here to guide you, answer your questions, and help you confidently plan every step of your shipment.",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      title: "Expertise in International Transportation",
      description: "With decades of experience in global logistics, Valhalla Logistic LLC offers unmatched expertise in international freight forwarding and customs brokerage. Our skilled team of logistics professionals is committed to providing reliable, seamless service that ensures your shipments reach their destination smoothly. ",
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        iconBg: "bg-blue-100",
        iconText: "text-blue-600",
        accent: "text-blue-900",
        button: "bg-blue-900 hover:bg-blue-800",
        border: "border-blue-200"
      },
      green: {
        bg: "bg-green-50",
        iconBg: "bg-green-100",
        iconText: "text-green-600",
        accent: "text-green-900",
        button: "bg-green-900 hover:bg-green-800",
        border: "border-green-200"
      },
      purple: {
        bg: "bg-purple-50",
        iconBg: "bg-purple-100",
        iconText: "text-purple-600",
        accent: "text-purple-900",
        button: "bg-purple-900 hover:bg-purple-800",
        border: "border-purple-200"
      }
    };
    return colorMap[color];
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-2" />
              Our Services
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Comprehensive{' '}
              <span className="text-blue-900 relative">
                Logistics Solutions
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-200 rounded"></div>
              </span>
            </h1>
            {/* Comprehensive Logistics Solutions */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Valhalla Logistic LLC specializes in managing the transportation, storage, and distribution of goods with unmatched efficiency across multiple industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/agreement" 
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-semibold text-lg"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-900 hover:text-blue-900 transition-colors duration-200 font-semibold text-lg"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {services.map((service, index) => {
              const colors = getColorClasses(service.color);
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Content */}
                  <div className={`space-y-8 ${!isEven ? 'lg:col-start-2' : ''}`}>
                    <div className="space-y-6">
                      <div className={`${colors.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center`}>
                        <div className={colors.iconText}>
                          {service.icon}
                        </div>
                      </div>
                      
                      <h2 className={`text-4xl font-bold ${colors.accent}`}>
                        {service.title}
                      </h2>
                      
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className={`w-5 h-5 ${colors.iconText}`} />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6">
                      {Object.entries(service.stats).map(([key, value], statIndex) => (
                        <div key={statIndex} className="text-center">
                          <div className={`text-2xl font-bold ${colors.accent}`}>{value}</div>
                          <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div className={`${colors.bg} rounded-2xl p-8 border-2 ${colors.border}`}>
                     <div className="aspect-video w-full relative">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complementary services to support your complete logistics needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-200">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process ensures efficient and reliable service delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Request Quote", description: "Contact us with your shipping requirements" },
              { step: "02", title: "Plan Route", description: "We optimize the best route for your cargo" },
              { step: "03", title: "Execute Delivery", description: "Professional handling and transportation" },
              { step: "04", title: "Track & Confirm", description: "Real-time tracking with delivery confirmation" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                    {item.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gray-300 transform -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Our Services?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get started with a customized logistics solution tailored to your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/agreement" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold text-lg"
            >
              Start Agreement
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-200 font-semibold text-lg"
            >
              Get Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
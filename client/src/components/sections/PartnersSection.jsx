import React from 'react';
import { Users, Award, Globe, Handshake, ArrowRight, Star } from 'lucide-react';
import amazon from "../../assets/amazon.png"
import walmart from "../../assets/walmart.png"
import fedex from "../../assets/fedex.webp"

const PartnersSection = () => {
  const partners = [
    {
      name: "Amazon Logistics",
      logo: <img src={amazon} alt="Amazon Logo" className="w-16 h-16" />,
      category: "E-commerce",
      description: "Trusted partner for Amazon delivery services",
      partnership: "3+ Years"
    },
    {
      name: "FedEx Ground",
      logo: <img src={fedex} alt="Amazon Logo" className="w-16 h-12" />,
      category: "Shipping",
      description: "Strategic alliance for nationwide coverage",
      partnership: "5+ Years"
    },
    {
      name: "Walmart Supply Chain",
      logo: <img src={walmart} alt="Amazon Logo" className="w-16 h-12" />,
      category: "Retail",
      description: "Dedicated lanes for retail distribution",
      partnership: "2+ Years"
    },
    
  ];

  const partnerStats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "50+",
      label: "Strategic Partners",
      description: "Leading companies trust us"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      number: "15",
      label: "Countries Covered",
      description: "International network reach"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "99.8%",
      label: "Partner Satisfaction",
      description: "Exceptional service rating"
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      number: "5+ Years",
      label: "Average Partnership",
      description: "Long-term relationships"
    }
  ];

  const benefits = [
    {
      title: "Nationwide Coverage",
      description: "Access to extensive network across all 50 states",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Preferred Rates",
      description: "Competitive pricing through partner negotiations",
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Priority Support",
      description: "24/7 dedicated support for partner shipments",
      icon: <Award className="w-6 h-6" />
    },
    {
      title: "Advanced Technology",
      description: "Integrated tracking and management systems",
      icon: <Users className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Handshake className="w-4 h-4 mr-2" />
            Our Trusted Partners
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Industry-Leading Partnerships
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with the best in the industry to deliver exceptional service and expand our reach across multiple sectors and regions.
          </p>
        </div>

        {/* Partner Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partnerStats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <div className="text-blue-600">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Meet Our Partners
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16  rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {partner.logo}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-1">
                      {partner.name}
                    </h4>
                    <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {partner.category}
                    </div>
                  </div>
                </div>
                
                {/* <p className="text-gray-600 mb-4">
                  {partner.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Partnership: <span className="font-medium text-gray-700">{partner.partnership}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                </div> */}
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Benefits */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Partnership Benefits
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our strategic partnerships enable us to offer enhanced services and competitive advantages to all our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <div className="text-blue-600">
                    {benefit.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Become Our Partner
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join our network of industry leaders and expand your business reach with reliable logistics solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold text-lg"
              >
                Partner With Us
              </a>
              <a 
                href="/about" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-200 font-semibold text-lg"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
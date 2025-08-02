import React from 'react';
import { CreditCard, Shield, Clock, CheckCircle, Globe, Lock, ArrowRight } from 'lucide-react';

const PaymentProcessSection = () => {
  const paymentFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Transactions",
      description: "All payments are processed through encrypted channels"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Options",
      description: "Multiple payment methods to suit your needs"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Coverage",
      description: "Priority access to efficient routes worldwide"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Guaranteed Capacity",
      description: "Fixed rates and guaranteed shipping capacity"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Select Your Lane",
      description: "Choose from our dedicated shipping routes"
    },
    {
      step: "02",
      title: "Transparent Pricing",
      description: "View all costs including customs and tracking"
    },
    {
      step: "03",
      title: "Secure Payment",
      description: "Complete your transaction safely"
    },
    {
      step: "04",
      title: "Premium Service",
      description: "Enjoy reduced transit times and priority handling"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <CreditCard className="w-4 h-4 mr-2" />
            Streamlined Payment Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Secure Your Dedicated Shipping Lane
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent fee structure and flexible payment options with guaranteed capacity and fixed rates for confident logistics planning.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Our Dedicated Lane Slot Service
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Guarantees your shipments priority access to the most efficient routes across the globe. With guaranteed capacity and fixed rates, you can plan your logistics with confidence.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Secure your shipping lane with a transparent fee structure that includes customs clearance, route optimization, and real-time tracking. Our dedicated team ensures your cargo moves seamlessly from origin to destination.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {paymentFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <div className="text-blue-600">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
              <div className="flex items-start space-x-3">
                <Lock className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Premium Advantage</h4>
                  <p className="text-blue-800">
                    Experience reduced transit times, enhanced reliability, and priority handling at all checkpoints with our dedicated lanes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Process Steps */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h3>
            
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                {index < processSteps.length - 1 && (
                  <div className="absolute left-6 top-12 w-px h-8 bg-gray-200"></div>
                )}
              </div>
            ))}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <a 
                href="#agreement" 
                className="inline-flex items-center justify-center w-full px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-semibold text-lg group"
              >
                Start Your Agreement
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Secure Your Shipping Lane?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust us with their logistics needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#agreement" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold text-lg"
            >
              Get Started Now
            </a>
            <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-200 font-semibold text-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentProcessSection;
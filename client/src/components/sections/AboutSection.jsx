import React from 'react';
import { Award, Users, Globe, TrendingUp, CheckCircle, Star } from 'lucide-react';

const AboutSection = () => {
  const achievements = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Industry Excellence",
      description: "Recognized leader in logistics and transportation services",
      color: "text-yellow-600 bg-yellow-100"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Team",
      description: "Experienced professionals dedicated to your success",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Extensive network covering major trade routes worldwide",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Proven Growth",
      description: "Consistent track record of successful deliveries and client satisfaction",
      color: "text-purple-600 bg-purple-100"
    }
  ];

  const values = [
    "Reliability and on-time delivery guarantee",
    "Transparent pricing with no hidden fees",
    "24/7 customer support and real-time tracking",
    "Compliance with all industry regulations",
    "Sustainable and eco-friendly practices",
    "Continuous innovation in logistics solutions"
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2" />
            About Valhalla Logistic LLC
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            The Best Broker Company
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We collaborate with the best in the industry to deliver exceptional service, specializing in transportation, storage, and distribution of goods with unmatched efficiency.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Our Story & Mission
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Valhalla Logistic LLC, we've built our reputation on trust, reliability, and excellence. Our mission is to provide seamless logistics solutions that keep your business moving forward while maintaining the highest standards of service quality.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We understand that in today's fast-paced business environment, timely and secure delivery is crucial. That's why we've invested in cutting-edge technology, built strong partnerships, and assembled a team of logistics experts dedicated to your success.
              </p>
            </div>

            {/* Values List */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-900">Our Core Values</h4>
              <div className="grid grid-cols-1 gap-3">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Achievements */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us</h3>
            
            <div className="grid gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${achievement.color}`}>
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Our Impact</h3>
            <p className="text-gray-600 mt-2">Numbers that speak for our excellence</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">5+</div>
              <div className="text-gray-600 font-medium">Years of Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
              <div className="text-gray-600 font-medium">Satisfied Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50,000+</div>
              <div className="text-gray-600 font-medium">Deliveries Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">99.9%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 lg:p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl lg:text-2xl font-medium mb-4">
                "Valhalla Logistic LLC has transformed our supply chain operations. Their dedication to excellence and reliability is unmatched in the industry."
              </blockquote>
              <cite className="text-blue-200">
                - Industry Partner
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
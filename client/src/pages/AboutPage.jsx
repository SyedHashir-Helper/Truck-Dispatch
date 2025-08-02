import React from 'react';
import { Award, Users, Globe, TrendingUp, CheckCircle, Star, Target, Heart, Shield } from 'lucide-react';

const AboutPage = () => {
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

  const timeline = [
    {
      year: "2019",
      title: "Company Founded",
      description: "Valhalla Logistic LLC was established with a vision to revolutionize logistics services."
    },
    {
      year: "2020",
      title: "First Major Contract",
      description: "Secured our first government logistics contract, establishing our credibility in secure transport."
    },
    {
      year: "2021",
      title: "Amazon Partnership",
      description: "Became a certified Amazon logistics partner, expanding our e-commerce capabilities."
    },
    {
      year: "2022",
      title: "National Expansion",
      description: "Extended our services nationwide, covering all 48 continental states."
    },
    {
      year: "2023",
      title: "Technology Integration",
      description: "Implemented advanced tracking and management systems for enhanced customer experience."
    },
    {
      year: "2024",
      title: "Industry Leadership",
      description: "Recognized as a leading logistics provider with 1000+ satisfied customers."
    }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      description: "15+ years in logistics industry",
      initials: "AJ"
    },
    {
      name: "Sarah Mitchell",
      role: "Operations Director",
      description: "Expert in supply chain management",
      initials: "SM"
    },
    {
      name: "Michael Rodriguez",
      role: "Fleet Manager",
      description: "Specialized in transportation logistics",
      initials: "MR"
    },
    {
      name: "Emily Chen",
      role: "Customer Success Manager",
      description: "Dedicated to client satisfaction",
      initials: "EC"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-2" />
              About Valhalla Logistic LLC
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              The Best{' '}
              <span className="text-blue-900 relative">
                Broker Company
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-200 rounded"></div>
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Valhalla Logistics LLC was established with the goal of transforming the logistics and transportation landscape. Our mission is straightforward: to deliver dependable, efficient, and affordable brokerage services that link businesses to the ideal carriers for their freight needs.
              <p>Backed by years of industry experience, our committed team understands the complexities companies encounter in shipping and logistics. We have earned our reputation through unwavering trust, consistent reliability, and outstanding customer care.</p>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-semibold text-lg"
              >
                Get In Touch
              </a>
              <a 
                href="/services" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-900 hover:text-blue-900 transition-colors duration-200 font-semibold text-lg"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To deliver cutting-edge logistics solutions that streamline supply chains, lower operational costs, and boost efficiency for businesses, no matter their size.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Founded in 2019, we understood that in today's fast-paced business environment, timely and secure delivery is crucial. That's why we've invested in cutting-edge technology, built strong partnerships, and assembled a team of logistics experts dedicated to your success.
                </p>
              </div>

              {/* Values List */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-gray-900">Our Core Values</h3>
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

            {/* Right Content - Mission Icons */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center space-x-4 p-6 bg-blue-50 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Our Mission</h4>
                    <p className="text-gray-600"> To deliver cutting-edge logistics solutions that streamline supply chains, lower operational costs, and boost efficiency for businesses, no matter their size.</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-6 bg-green-50 rounded-xl">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Our Vision</h4>
                    <p className="text-gray-600">To be recognized as a top brokerage firm distinguished by trustworthiness, openness, and exceptional customer experience within the transportation sector.</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-6 bg-purple-50 rounded-xl">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Our Promise</h4>
                    <p className="text-gray-600">We commit to outstanding performance in every service we provide.
Integrity: We conduct all business with honesty and full transparency.
Dependability: We honor our commitments by providing timely, consistent, and reliable service.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small startup to an industry leader - here's how we've grown over the years
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <div className="text-2xl font-bold text-blue-900 mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence has earned us recognition across the industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow duration-200">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${achievement.color}`}>
                  {achievement.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to delivering exceptional logistics solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
              <p className="text-blue-100">Numbers that speak for our excellence</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">5+</div>
                <div className="text-blue-200 font-medium">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">1000+</div>
                <div className="text-blue-200 font-medium">Satisfied Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">50,000+</div>
                <div className="text-blue-200 font-medium">Deliveries Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                <div className="text-blue-200 font-medium">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 lg:p-12 text-center shadow-lg">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl font-medium text-gray-900 mb-4">
                  "Valhalla Logistic LLC has transformed our supply chain operations. Their dedication to excellence and reliability is unmatched in the industry. We couldn't be happier with their service."
                </blockquote>
                <cite className="text-gray-600">
                  - Industry Partner
                </cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the thousands of businesses that trust Valhalla Logistic LLC for their transportation and logistics needs.
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
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
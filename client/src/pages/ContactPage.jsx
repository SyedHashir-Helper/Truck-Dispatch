import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, Calendar, Users } from 'lucide-react';
import ContactSection from '../components/sections/ContactSection';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    urgency: 'normal'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        preferredContact: 'email',
        urgency: 'normal'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: "03447732310",
      description: "Call us for immediate assistance",
      action: "tel:03447732310"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: "Alex@valhallalogisticllc.com",
      description: "Send us your inquiries",
      action: "mailto:Alex@valhallalogisticllc.com"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: "1255 FRANKLIN AVE SUITE 350",
      description: "GARDEN CITY, NY 11530",
      action: "#"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: "24/7 Available",
      description: "We're here when you need us",
      action: "#"
    }
  ];

  const contactReasons = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "General Inquiry",
      description: "Questions about our services"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Schedule Pickup",
      description: "Arrange transportation services"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Partnership",
      description: "Explore partnership opportunities"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Support",
      description: "Customer service assistance"
    }
  ];

  const officeLocations = [
    {
      city: "New York (HQ)",
      address: "1255 FRANKLIN AVE SUITE 350, GARDEN CITY, NY 11530",
      phone: "03447732310",
      email: "Alex@valhallalogisticllc.com"
    },
    {
      city: "Los Angeles",
      address: "Coming Soon - West Coast Operations",
      phone: "03447732310",
      email: "Alex@valhallalogisticllc.com"
    },
    {
      city: "Chicago",
      address: "Coming Soon - Midwest Hub",
      phone: "03447732310",
      email: "Alex@valhallalogisticllc.com"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Contact{' '}
              <span className="text-blue-900 relative">
                Our Team
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-200 rounded"></div>
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Ready to streamline your logistics? Get in touch with our expert team for personalized solutions and exceptional service. We're here to help 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:03447732310" 
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-semibold text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
              <a 
                href="mailto:Alex@valhallalogisticllc.com" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-900 hover:text-blue-900 transition-colors duration-200 font-semibold text-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
};

export default ContactPage;
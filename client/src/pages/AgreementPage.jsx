import React from 'react';
import { FileText, Shield, Clock, CheckCircle } from 'lucide-react';
import AgreementForm from '../components/forms/AgreementForm';

const AgreementPage = () => {
  const benefits = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Process",
      description: "Your information is protected with enterprise-grade security"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Quick Setup",
      description: "Complete your agreement in just 5 simple steps"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Legal Compliance",
      description: "All agreements meet federal and state regulations"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Professional Support",
      description: "Our team is here to help throughout the process"
    }
  ];

  const agreementTypes = [
    {
      title: "Dedicated Trucking Agreement",
      description: "For carriers providing dedicated lane services",
      features: ["Fixed route assignments", "Guaranteed capacity", "Regular schedules"]
    },
    {
      title: "Amazon Logistics Agreement",
      description: "Specialized agreement for Amazon load handling",
      features: ["Amazon compliance requirements", "Express delivery terms", "Quality standards"]
    },
    {
      title: "Government Contract Agreement",
      description: "For secure government logistics services",
      features: ["Security clearance protocols", "Regulatory compliance", "Background checks"]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <FileText className="w-4 h-4 mr-2" />
              Broker/Carrier Agreement
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Start Your{' '}
              <span className="text-blue-900 relative">
                Partnership
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-200 rounded"></div>
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Begin your journey with Valhalla Logistic LLC. Our streamlined agreement process ensures you can start transporting cargo quickly and securely.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('agreement-form').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-semibold text-lg"
              >
                Start Agreement
              </button>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-900 hover:text-blue-900 transition-colors duration-200 font-semibold text-lg"
              >
                Need Help?
              </a>
            </div> */}
          </div>
        </div>
      </section>

      

      {/* Process Overview */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Simple 5-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process gets you started quickly and efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: "1", title: "Carrier Info", description: "Enter your company and contact details" },
              { step: "2", title: "Terms", description: "Review and accept our terms and conditions" },
              { step: "3", title: "Agreement", description: "Provide signatory information and preferences" },
              { step: "4", title: "Review", description: "Confirm all details before submission" },
              { step: "5", title: "Complete", description: "Download your signed agreement" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                    {item.step}
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-px bg-gray-300 transform -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

     

      {/* Agreement Form Section */}
      <div id="agreement-form">
        <AgreementForm />
      </div>
    </div>
  );
};

export default AgreementPage;
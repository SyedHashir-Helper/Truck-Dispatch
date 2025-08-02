// Updated email service to work with backend API
const API_BASE_URL = 'http://localhost:5000';

// Main email sending function using backend API
export const sendAgreementEmail = async (formData, pdfBlob) => {
  try {
    if(!(pdfBlob instanceof Blob)) {
      throw new Error('Invalid PDF blob provided');
    }

    // Validate required form data
    const requiredFields = ['carrierName', 'usdotNumber', 'phoneNumber', 'email', 'fullName', 'title', 'agreementDate', 'paymentMethod'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Invalid email format');
    }

    // Prepare form data for submission
    const formDataToSend = new FormData();
    
    // Add all form fields
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
        formDataToSend.append(key, formData[key]);
      }
    });
    console.log(pdfBlob)
    // Add PDF attachment if provided
    if (pdfBlob) {
      const filename = `Agreement_${formData.carrierName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.pdf`;
      formDataToSend.append('agreement_pdf', pdfBlob, filename);
    }

    // Send to backend API
    const response = await fetch(`${API_BASE_URL}/api/send-agreement`, {
      method: 'POST',
      body: formDataToSend
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.error || 'Failed to send agreement');
    }

    console.log('Agreement sent successfully via backend:', result);
    
    return {
      success: true,
      agreementId: result.agreementId,
      submittedDate: result.submittedDate,
      messageId: result.emailResult?.messageId
    };

  } catch (error) {
    console.error('Email sending failed:', error);
    
    // Fallback to Web3Forms if backend fails
    if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
      console.log('Backend unavailable, attempting fallback method...');
      return await sendEmailViaWeb3Forms(formData, pdfBlob);
    }
    
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Fallback method using Web3Forms (keep as backup)
const sendEmailViaWeb3Forms = async (formData, pdfBlob) => {
  try {
    const WEB3_FORMS_KEY = 'ff60080c-a01f-4b68-a7cc-2f23b64bcdcf'; // Your Web3Forms key
    
    const formDataToSend = new FormData();
    
    // Basic form fields
    formDataToSend.append('access_key', WEB3_FORMS_KEY);
    formDataToSend.append('subject', `New Broker/Carrier Agreement - ${formData.carrierName}`);
    formDataToSend.append('from_name', formData.carrierName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('to', 'Alex@valhallalogisticllc.com');
    
    // Agreement details
    formDataToSend.append('carrier_name', formData.carrierName);
    formDataToSend.append('carrier_usdot', formData.usdotNumber);
    formDataToSend.append('carrier_phone', formData.phoneNumber);
    formDataToSend.append('carrier_email', formData.email);
    formDataToSend.append('signed_by', formData.fullName);
    formDataToSend.append('title', formData.title);
    formDataToSend.append('agreement_date', formData.agreementDate);
    formDataToSend.append('payment_method', formData.paymentMethod);
    formDataToSend.append('bank_name', formData.bankName || 'Not provided');
    formDataToSend.append('account_type', formData.accountType || 'Not provided');
    
    // Generate agreement ID and timestamp
    const agreementId = `VL-FALLBACK-${Date.now()}`;
    const submittedDate = new Date().toISOString();
    formDataToSend.append('agreement_id', agreementId);
    formDataToSend.append('submitted_date', submittedDate);
    
    // Message content
    const message = generatePlainTextMessage(formData, agreementId, submittedDate);
    formDataToSend.append('message', message);
    
    // Attach PDF file
    if (pdfBlob) {
      const filename = `Agreement_${formData.carrierName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.pdf`;
      formDataToSend.append('attachment', pdfBlob, filename);
    }
    
    // Send via Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formDataToSend
    });
    
    const result = await response.json();
    
    if (result.success) {
      return { 
        success: true, 
        response: result,
        agreementId,
        submittedDate 
      };
    } else {
      throw new Error(result.message || 'Email sending failed');
    }
    
  } catch (error) {
    console.error('Web3Forms fallback failed:', error);
    throw error;
  }
};

// Send contact form email
export const sendContactEmail = async (contactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.error || 'Failed to send contact message');
    }

    return {
      success: true,
      messageId: result.messageId
    };

  } catch (error) {
    console.error('Contact email sending failed:', error);
    throw new Error(`Failed to send contact message: ${error.message}`);
  }
};

// Test email functionality
export const testEmailService = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/test-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.error || 'Test email failed');
    }

    return { success: true, result };
  } catch (error) {
    console.error('Email test failed:', error);
    return { success: false, error: error.message };
  }
};

// Helper function to generate plain text message
const generatePlainTextMessage = (formData, agreementId, submittedDate) => {
  return `
NEW BROKER/CARRIER AGREEMENT SUBMITTED

CARRIER INFORMATION:
====================
Company Name: ${formData.carrierName}
USDOT/MC Number: ${formData.usdotNumber}
Phone: ${formData.phoneNumber}
Email: ${formData.email}

AGREEMENT DETAILS:
==================
Signed By: ${formData.fullName}
Title: ${formData.title}
Agreement Date: ${formData.agreementDate}
Payment Method: ${formData.paymentMethod}

BANKING INFORMATION:
====================
Bank Name: ${formData.bankName || 'Not provided'}
Account Type: ${formData.accountType || 'Not provided'}

SYSTEM INFORMATION:
===================
Agreement ID: ${agreementId}
Submitted: ${submittedDate}

NEXT STEPS:
===========
- Agreement will be reviewed within 24 hours
- Carrier will receive confirmation email once processed
- Setup carrier profile to start receiving loads

The signed broker/carrier agreement is attached as a PDF file for your review and processing.

---
Valhalla Logistics LLC
1255 Franklin Ave Suite 350, Garden City, NY 11530
Phone: 03447732310 | Email: Alex@valhallalogisticllc.com
USDOT# 4091738 | MC# 1558919
  `.trim();
};

// Check API connection
export const checkAPIConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const result = await response.json();
    
    return {
      connected: response.ok,
      status: result.status,
      timestamp: result.timestamp
    };
  } catch (error) {
    return {
      connected: false,
      error: error.message
    };
  }
};
const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

// Email configuration
const EMAIL_CONFIG = {
  service: process.env.EMAIL_SERVICE || 'gmail', // gmail, outlook, yahoo, etc.
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  fromEmail: process.env.FROM_EMAIL || process.env.EMAIL_USER,
  toEmail: process.env.TO_EMAIL || 'Alex@valhallalogisticllc.com'
};

// Create transporter
const createTransporter = () => {
  const transporterConfig = {
    service: EMAIL_CONFIG.service,
    auth: {
      user: EMAIL_CONFIG.user,
      pass: EMAIL_CONFIG.password
    }
  };
  
  // If using custom SMTP settings
  if (EMAIL_CONFIG.host) {
    delete transporterConfig.service;
    transporterConfig.host = EMAIL_CONFIG.host;
    transporterConfig.port = EMAIL_CONFIG.port;
    transporterConfig.secure = EMAIL_CONFIG.secure;
  }
  
  return nodemailer.createTransport(transporterConfig);
};

// Verify email configuration
const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    logger.info('Email service configuration verified successfully');
    return true;
  } catch (error) {
    logger.error('Failed to verify email configuration:', error);
    throw new Error(`Email configuration verification failed: ${error.message}`);
  }
};

// Generate HTML email template for agreement
const generateAgreementEmailHTML = (emailData) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Broker/Carrier Agreement</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background-color: #f8fafc; 
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            border-radius: 12px; 
            overflow: hidden; 
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); 
        }
        .header { 
            background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); 
            color: white; 
            padding: 30px; 
            text-align: center; 
        }
        .logo { 
            font-size: 24px; 
            font-weight: 700; 
            margin-bottom: 8px; 
            letter-spacing: -0.5px; 
        }
        .subtitle { 
            font-size: 16px; 
            opacity: 0.9; 
        }
        .content { 
            padding: 30px; 
        }
        .section { 
            margin-bottom: 25px; 
        }
        .section-title { 
            font-size: 18px; 
            font-weight: 600; 
            color: #1f2937; 
            margin-bottom: 15px; 
            padding-bottom: 8px; 
            border-bottom: 2px solid #e5e7eb; 
            display: flex;
            align-items: center;
        }
        .section-icon {
            width: 20px;
            height: 20px;
            margin-right: 8px;
            background: #3b82f6;
            border-radius: 4px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 12px;
        }
        .info-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 15px; 
        }
        .info-card { 
            background: #f9fafb; 
            padding: 15px; 
            border-radius: 8px; 
            border-left: 4px solid #3b82f6; 
        }
        .info-label { 
            font-weight: 600; 
            color: #374151; 
            font-size: 14px; 
            text-transform: uppercase; 
            letter-spacing: 0.5px; 
            margin-bottom: 4px;
        }
        .info-value { 
            color: #111827; 
            font-size: 16px; 
            font-weight: 500;
        }
        .highlight-box { 
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); 
            padding: 20px; 
            border-radius: 12px; 
            margin: 25px 0; 
            border: 1px solid #93c5fd; 
            text-align: center;
        }
        .agreement-id { 
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; 
            background: #1f2937; 
            color: #f9fafb; 
            padding: 10px 15px; 
            border-radius: 6px; 
            display: inline-block; 
            font-weight: 600; 
            font-size: 14px;
            letter-spacing: 0.5px;
        }
        .footer { 
            background: #f9fafb; 
            padding: 25px; 
            text-align: center; 
            color: #6b7280; 
            font-size: 14px; 
            border-top: 1px solid #e5e7eb; 
        }
        .footer-title {
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
            font-size: 16px;
        }
        .contact-info {
            margin-top: 12px;
            font-size: 12px;
        }
        .next-steps {
            background: #ecfdf5;
            border: 1px solid #d1fae5;
            border-radius: 8px;
            padding: 15px;
        }
        .next-steps h4 {
            color: #065f46;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .next-steps-list {
            list-style: none;
            padding: 0;
            text-align: left;
        }
        .next-steps-list li {
            color: #047857;
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
        }
        .next-steps-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        @media (max-width: 600px) {
            .container { margin: 0; border-radius: 0; }
            .content { padding: 20px; }
            .header { padding: 20px; }
            .info-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">VALHALLA LOGISTICS LLC</div>
            <div class="subtitle">New Broker/Carrier Agreement Submitted</div>
        </div>
        
        <div class="content">
            <div class="section">
                <div class="section-title">
                    <span class="section-icon">🏢</span>
                    Carrier Information
                </div>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-label">Company Name</div>
                        <div class="info-value">${emailData.carrierName}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">USDOT/MC Number</div>
                        <div class="info-value">${emailData.usdotNumber}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Phone Number</div>
                        <div class="info-value">${emailData.phoneNumber}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Email Address</div>
                        <div class="info-value">${emailData.email}</div>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <span class="section-icon">📋</span>
                    Agreement Details
                </div>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-label">Authorized Signatory</div>
                        <div class="info-value">${emailData.fullName}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Title/Position</div>
                        <div class="info-value">${emailData.title}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Agreement Date</div>
                        <div class="info-value">${emailData.agreementDate}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Payment Method</div>
                        <div class="info-value">${emailData.paymentMethod.toUpperCase()}</div>
                    </div>
                </div>
            </div>

            ${emailData.bankName ? `
            <div class="section">
                <div class="section-title">
                    <span class="section-icon">🏦</span>
                    Banking Information
                </div>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-label">Bank Name</div>
                        <div class="info-value">${emailData.bankName}</div>
                    </div>
                    ${emailData.accountType ? `
                    <div class="info-card">
                        <div class="info-label">Account Type</div>
                        <div class="info-value">${emailData.accountType.charAt(0).toUpperCase() + emailData.accountType.slice(1)}</div>
                    </div>
                    ` : ''}
                </div>
            </div>
            ` : ''}
            
            <div class="highlight-box">
                <div style="font-size: 32px; margin-bottom: 10px;">📎</div>
                <h3 style="color: #1f2937; margin-bottom: 8px;">Signed Agreement Attached</h3>
                <p style="color: #374151; margin: 0;">The completed broker/carrier agreement is attached as a PDF file for your review and processing.</p>
            </div>
            
            <div class="section">
                <div class="section-title">
                    <span class="section-icon">📈</span>
                    Next Steps
                </div>
                <div class="next-steps">
                    <h4>What happens next?</h4>
                    <ul class="next-steps-list">
                        <li>Our operations team will review this agreement within 24 hours</li>
                        <li>The carrier will receive a confirmation email once processed</li>
                        <li>Account setup instructions will be provided</li>
                        <li>Load assignments can begin immediately after approval</li>
                    </ul>
                </div>
            </div>
            
            <div style="text-align: center; margin: 25px 0;">
                <div style="color: #6b7280; margin-bottom: 8px; font-size: 14px;">Agreement Reference ID</div>
                <div class="agreement-id">${emailData.agreementId}</div>
                <div style="color: #9ca3af; font-size: 12px; margin-top: 8px;">
                    Submitted: ${new Date(emailData.submittedDate).toLocaleString()}
                </div>
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-title">Valhalla Logistics LLC</div>
            <div>1255 Franklin Ave Suite 350, Garden City, NY 11530</div>
            <div class="contact-info">
                <div>📞 Phone: 03447732310 | ✉️ Email: Alex@valhallalogisticllc.com</div>
                <div style="margin-top: 4px;">🚛 USDOT# 4091738 | 📋 MC# 1558919</div>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

// Generate plain text email for agreement
const generateAgreementEmailText = (emailData) => {
  return `
NEW BROKER/CARRIER AGREEMENT SUBMITTED

CARRIER INFORMATION:
====================
Company Name: ${emailData.carrierName}
USDOT/MC Number: ${emailData.usdotNumber}
Phone: ${emailData.phoneNumber}
Email: ${emailData.email}

AGREEMENT DETAILS:
==================
Signed By: ${emailData.fullName}
Title: ${emailData.title}
Agreement Date: ${emailData.agreementDate}
Payment Method: ${emailData.paymentMethod}

BANKING INFORMATION:
====================
Bank Name: ${emailData.bankName || 'Not provided'}
Account Type: ${emailData.accountType || 'Not provided'}

SYSTEM INFORMATION:
===================
Agreement ID: ${emailData.agreementId}
Submitted: ${new Date(emailData.submittedDate).toLocaleString()}

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

// Send agreement email with attachment
const sendAgreementEmail = async (emailData) => {
  try {
    // Verify email configuration first
    const isConfigValid = await verifyEmailConfig();
    if (!isConfigValid) {
      throw new Error('Email service configuration is invalid');
    }

    const transporter = createTransporter();

    // Prepare email options
    const mailOptions = {
      from: {
        name: 'Valhalla Logistics LLC',
        address: EMAIL_CONFIG.fromEmail
      },
      to: EMAIL_CONFIG.toEmail,
      replyTo: emailData.email,
      subject: `New Broker/Carrier Agreement - ${emailData.carrierName}`,
      text: generateAgreementEmailText(emailData),
      html: generateAgreementEmailHTML(emailData),
      attachments: []
    };


    // Add PDF attachment if provided
    if (emailData.attachment && emailData.attachment.content) {
      mailOptions.attachments.push({
        filename: emailData.attachment.filename,
        content: emailData.attachment.content,
        contentType: emailData.attachment.contentType || 'application/pdf'
      });
    }

    // Send email
    const result = await transporter.sendMail(mailOptions);
    
    logger.info('Agreement email sent successfully', {
      messageId: result.messageId,
      carrierName: emailData.carrierName,
      agreementId: emailData.agreementId
    });

    return {
      success: true,
      messageId: result.messageId,
      response: result.response
    };

  } catch (error) {
    logger.error('Failed to send agreement email:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Send contact form email
const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'Valhalla Logistics Contact Form',
        address: EMAIL_CONFIG.fromEmail,
      },
      to: EMAIL_CONFIG.toEmail,
      replyTo: contactData.email,
      subject: `New Contact Form Submission - ${contactData.name}`,
      text: `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone || 'Not provided'}

Message:
${contactData.message}

---
Sent from Valhalla Logistics Contact Form
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #374151; }
    .value { margin-top: 5px; }
    .message-box { background: white; padding: 15px; border-left: 4px solid #3b82f6; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${contactData.name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value">${contactData.email}</div>
      </div>
      <div class="field">
        <div class="label">Phone:</div>
        <div class="value">${contactData.phone || 'Not provided'}</div>
      </div>
      <div class="message-box">
        <div class="label">Message:</div>
        <div class="value">${contactData.message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    logger.info('Contact email sent successfully', {
      messageId: result.messageId,
      name: contactData.name,
      email: contactData.email,
    });

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    logger.error('Failed to send contact email:', error);
    throw new Error(`Contact email sending failed: ${error.message}`);
  }
};

// Send confirmation email to carrier
const sendCarrierConfirmationEmail = async (carrierData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: 'Valhalla Logistics LLC',
        address: EMAIL_CONFIG.fromEmail
      },
      to: carrierData.email,
      subject: `Agreement Received - Welcome to Valhalla Logistics!`,
      text: `
Dear ${carrierData.fullName},

Thank you for submitting your broker/carrier agreement with Valhalla Logistics LLC.

Agreement Details:
- Company: ${carrierData.carrierName}
- Agreement ID: ${carrierData.agreementId}
- Submitted: ${new Date(carrierData.submittedDate).toLocaleString()}

What's Next:
1. Our team will review your agreement within 24 hours
2. You'll receive setup instructions once approved
3. You can start receiving load assignments immediately after approval

If you have any questions, please contact us:
Phone: 03447732310
Email: Alex@valhallalogisticllc.com

Welcome aboard!

Best regards,
Valhalla Logistics Team
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1e3a8a; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
        .welcome-box { background: #ecfdf5; border: 1px solid #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .details-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .steps { background: white; padding: 20px; border-radius: 8px; }
        .step { margin-bottom: 10px; padding-left: 20px; position: relative; }
        .step:before { content: "✓"; position: absolute; left: 0; color: #10b981; font-weight: bold; }
      </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Valhalla Logistics!</h1>
            <p>Your agreement has been received</p>
        </div>
        <div class="content">
            <div class="welcome-box">
                <h3 style="color: #065f46; margin-bottom: 10px;">Dear ${carrierData.fullName},</h3>
                <p style="color: #047857;">Thank you for submitting your broker/carrier agreement with Valhalla Logistics LLC.</p>
            </div>
            
            <div class="details-box">
                <h4>Agreement Details:</h4>
                <p><strong>Company:</strong> ${carrierData.carrierName}</p>
                <p><strong>Agreement ID:</strong> ${carrierData.agreementId}</p>
                <p><strong>Submitted:</strong> ${new Date(carrierData.submittedDate).toLocaleString()}</p>
            </div>
            
            <div class="steps">
                <h4>What's Next:</h4>
                <div class="step">Our team will review your agreement within 24 hours</div>
                <div class="step">You'll receive setup instructions once approved</div>
                <div class="step">You can start receiving load assignments immediately after approval</div>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #dbeafe; border-radius: 8px; text-align: center;">
                <h4>Contact Us</h4>
                <p>Phone: 03447732310<br>Email: Alex@valhallalogisticllc.com</p>
            </div>
        </div>
    </div>
</body>
</html>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    
    logger.info('Carrier confirmation email sent successfully', {
      messageId: result.messageId,
      carrierEmail: carrierData.email
    });

    return {
      success: true,
      messageId: result.messageId
    };

  } catch (error) {
    logger.error('Failed to send carrier confirmation email:', error);
    throw new Error(`Carrier confirmation email failed: ${error.message}`);
  }
};

// Test email functionality
const testEmailService = async () => {
  try {
    const testData = {
      carrierName: 'Test Carrier LLC',
      usdotNumber: 'MC123456',
      phoneNumber: '1234567890',
      email: 'test@example.com',
      fullName: 'John Doe',
      title: 'Owner',
      agreementDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'zelle',
      bankName: 'Test Bank',
      accountType: 'checking',
      agreementId: `VL-TEST-${Date.now()}`,
      submittedDate: new Date().toISOString()
    };

    const result = await sendAgreementEmail(testData);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendAgreementEmail,
  sendContactEmail,
  sendCarrierConfirmationEmail,
  testEmailService,
  verifyEmailConfig
};
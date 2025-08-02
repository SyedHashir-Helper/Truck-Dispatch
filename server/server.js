const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const emailService = require('./services/emailService');
console.log('Starting Valhalla Logistics API...');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com', 'https://www.your-domain.com'] 
    : ['http://localhost:5173', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Email-specific rate limiting
const emailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 emails per hour
  message: {
    error: 'Too many email requests from this IP, please try again later.'
  },
});

// Middleware
app.use(compression());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5
  },
  fileFilter: (req, file, cb) => {
    // Allow PDF files and images
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/jpg'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPEG, and PNG files are allowed.'), false);
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Valhalla Logistics API',
    version: '1.0.0'
  });
});

// Send agreement email endpoint
app.post('/api/send-agreement', emailLimiter, upload.single('agreement_pdf'), async (req, res) => {
  try {
    logger.info('Received agreement submission request');
    
    // Validate required fields
    const requiredFields = [
      'carrierName', 'usdotNumber', 'phoneNumber', 'email',
      'fullName', 'title', 'agreementDate', 'paymentMethod'
    ];
    
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        missingFields
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Generate agreement ID and timestamp
    const agreementId = `VL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const submittedDate = new Date().toISOString();

    // Prepare email data
    const emailData = {
      ...req.body,
      agreementId,
      submittedDate,
      attachment: req.file ? {
        filename: req.file.originalname || `Agreement_${req.body.carrierName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.pdf`,
        content: req.file.buffer,
        contentType: req.file.mimetype
      } : null
    };

    // Send email
    const emailResult = await emailService.sendAgreementEmail(emailData);

    // Log successful submission
    logger.info(`Agreement submitted successfully`, {
      agreementId,
      carrierName: req.body.carrierName,
      email: req.body.email,
      usdotNumber: req.body.usdotNumber
    });

    res.json({
      success: true,
      message: 'Agreement sent successfully',
      agreementId,
      submittedDate,
      emailResult
    });

  } catch (error) {
    logger.error('Agreement submission failed:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to send agreement',
      message: error.message
    });
  }
});

// Test email endpoint (for development)
app.post('/api/test-email', emailLimiter, async (req, res) => {
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

    const result = await emailService.sendAgreementEmail(testData);
    
    res.json({
      success: true,
      message: 'Test email sent successfully',
      result
    });
    
  } catch (error) {
    logger.error('Test email failed:', error);
    
    res.status(500).json({
      success: false,
      error: 'Test email failed',
      message: error.message
    });
  }
});

// Contact form endpoint
app.post('/api/contact', emailLimiter, async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and message are required'
      });
    }

    await emailService.sendContactEmail({ name, email, message, phone });
    
    res.json({
      success: true,
      message: 'Contact message sent successfully'
    });
    
  } catch (error) {
    logger.error('Contact form submission failed:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to send contact message',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: 'File too large. Maximum size is 10MB.'
      });
    }
  }
  
  logger.error('Unhandled error:', error);
  
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`CORS enabled for: ${process.env.NODE_ENV === 'production' ? 'production domains' : 'localhost:3000'}`);
});

module.exports = app;
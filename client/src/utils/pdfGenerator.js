import jsPDF from 'jspdf';

export const generateAgreementPDF = async (formData) => {
  try {
    // Create new PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);
    
    // Set initial position
    let yPosition = 20;
    
    // Helper function to add page if needed
    const checkPageBreak = (requiredSpace = 10) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
        return true;
      }
      return false;
    };
    
    // Helper function to add text with word wrapping
    const addWrappedText = (text, x, y, maxWidth, fontSize = 10, fontStyle = 'normal') => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', fontStyle);
      const lines = pdf.splitTextToSize(text, maxWidth);
      pdf.text(lines, x, y);
      return y + (lines.length * (fontSize * 0.4));
    };

    // Header Section
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Broker/Carrier Agreement', pageWidth / 2, yPosition, { align: 'center' });
    
    // Add Valhalla Logo (text-based)
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setFillColor(30, 58, 138); // Blue background
    pdf.setTextColor(255, 255, 255); // White text
    pdf.rect(pageWidth - 35, 10, 25, 15, 'F');
    pdf.text('VALHALLA', pageWidth - 32, 16);
    pdf.text('LOGISTICS', pageWidth - 32, 21);
    pdf.setTextColor(0, 0, 0); // Reset to black
    
    yPosition += 15;
    
    // Add border line
    pdf.setLineWidth(2);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Information Grid Section
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(30, 58, 138); // Blue color
    pdf.text('Broker Information', margin, yPosition);
    pdf.text('Carrier Information', pageWidth / 2 + 10, yPosition);
    pdf.setTextColor(0, 0, 0); // Reset to black
    yPosition += 8;

    // Broker Information
    const brokerInfo = [
      { label: 'Broker Name:', value: 'VALHALLA LOGISTICS LLC' },
      { label: 'MC Number:', value: 'MC# 1558919' },
      { label: 'U.S. DOT Number:', value: 'USDOT# 4091738' },
      { label: 'Email:', value: 'Alex@valhallalogisticllc.com' },
      { label: 'Address:', value: '1255 FRANKLIN AVE SUITE 350' },
      { label: '', value: 'GARDEN CITY, NY 11530' }
    ];

    // Carrier Information
    const carrierInfo = [
      { label: 'Carrier Name:', value: formData.carrierName || 'N/A' },
      { label: 'Carrier USDOT/MC:', value: formData.usdotNumber || 'N/A' },
      { label: 'Carrier Phone number:', value: formData.phoneNumber || 'N/A' },
      { label: 'Agreement Date:', value: formData.agreementDate || 'N/A' },
      { label: 'Bank Name:', value: formData.bankName || 'N/A' }
    ];

    pdf.setFontSize(9);
    const maxRows = Math.max(brokerInfo.length, carrierInfo.length);
    
    for (let i = 0; i < maxRows; i++) {
      if (brokerInfo[i]) {
        pdf.setFont('helvetica', 'bold');
        pdf.text(brokerInfo[i].label, margin, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(brokerInfo[i].value, margin + 35, yPosition);
      }
      
      if (carrierInfo[i]) {
        pdf.setFont('helvetica', 'bold');
        pdf.text(carrierInfo[i].label, pageWidth / 2 + 10, yPosition);
        pdf.setFont('helvetica', 'normal');
        pdf.text(carrierInfo[i].value, pageWidth / 2 + 45, yPosition);
      }
      
      yPosition += 5;
    }

    yPosition += 10;
    
    // Add border lines
    pdf.setLineWidth(1);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Agreement Text Section
    const agreementText = `This Broker/Carrier Agreement is being entered into by and between: VALHALLA LOGISTICS LLC, hereinafter referred to as "BROKER", and: ${formData.carrierName || 'N/A'} (hereinafter referred to as "CARRIER") as defined below, on this: ${formData.agreementDate || 'N/A'}`;
    
    yPosition = addWrappedText(agreementText, margin, yPosition, contentWidth, 10, 'normal');
    yPosition += 5;
    
    const agreementText2 = `This Agreement between Valhalla Logistic LLC and the Carrier/Broker is intended to enhance the joint efforts of both entities in developing a more secure environment by improving the security for the transportation of conveyances and cargo throughout the commercial process. The Carrier/Broker agrees to develop, implement and stay current, within a framework consistent with the listed recommendations, a verifiable, documented program to enhance security procedures throughout its supply chain process.`;
    
    yPosition = addWrappedText(agreementText2, margin, yPosition, contentWidth, 10, 'normal');
    yPosition += 10;

    // Add border line
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Terms and Conditions Sections
    const sections = [
      {
        title: 'BROKER OBLIGATIONS',
        content: `Broker shall pay CARRIER for services rendered in an amount equal to the rates and charges agreed to as set forth on any Load Confirmation(s) that is issued and that supplements and amends this Agreement to the extent its terms conflict with those in this Agreement. All payments on the Load Confirmation(s) become due when delivery with all services have been performed. CARRIER shall not bill for any accessorial or other charge not approved in this Agreement or on Load Confirmation(s). Rates may be amended orally but must be confirmed in writing within a framework consistent with order to remain binding between the parties. As a condition precedent to payment.`
      },
      {
        title: 'CARRIER OBLIGATIONS',
        content: `CARRIER must submit proof of delivery with all invoices, and the invoices must reflect that CARRIER delivered the freight to its final destination. BROKER agrees to arrange for the transportation of a shipper's freight with CARRIER pursuant to the terms of this Agreement, and to comply with all federal, state, and local laws and regulations pertaining to the brokerage services covered by this Agreement.`
      },
      {
        title: 'SLOT FEE (REFUNDABLE)',
        content: `The Carrier shall make a security deposit of $395 by direct payment, through instant payment methods to the Valhalla Logistic LLC. It is a refundable fee upon the first delivery, along with the payment of the load, for the securement of the load. Once carrier pays $395 to, carrier must get a Receipt for the Deposit Fee by the representative. The security deposit shall be refundable upon the termination of this Agreement, subject to any outstanding obligations or damages incurred by the Carrier. The Carrier may terminate this Agreement with one week's written notice to the Company. Broker is responsible for Detention.`
      },
      {
        title: 'PAYMENT TERMS',
        content: `Signed Copy of rate confirmation and the company's invoice to the broker to get paid. We have two options: We charge 2% for Quick pay (same-day deposit). No fees for 24 hours deposit. Factoring.`
      },
      {
        title: 'TERM',
        content: `The term of this Agreement shall be 90 day's, commencing on the date listed above. If not cancelled by one of The Parties, the Agreement shall automatically renew itself for consecutive one year terms. The Agreement can be terminated at any time by either of The Parties with thirty (30) days written or electronic notice to the other party provided all balances are settled.`
      },
      {
        title: 'NOTICES',
        content: `If carrier wants to end the contract or want to switch the jobs, carrier must give prior notice of 3 days before ending the contract.`
      },
      {
        title: 'ENTIRE CONTRACT',
        content: `The provisions contained in this AGREEMENT properly express and memorialize the complete understanding and agreement between the parties, including those contained in all prior agreements, both verbal or written, and there are no other agreements or understandings between the parties, express or implied, except as set forth herein.`
      },
      {
        title: 'DISCLAIMER',
        content: `Nothing in this Agreement relieves Carrier/Broker of any responsibilities with respect to Canadian and United States law, including Customs Regulations.`
      }
    ];

    // Add sections
    sections.forEach((section, index) => {
      checkPageBreak(20);
      
      // Section title
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(30, 58, 138); // Blue color
      pdf.text(section.title, margin, yPosition);
      pdf.setTextColor(0, 0, 0); // Reset to black
      yPosition += 8;
      
      // Section content
      yPosition = addWrappedText(section.content, margin, yPosition, contentWidth, 10, 'normal');
      yPosition += 8;
      
      // Add payment method info for payment terms section
      if (section.title === 'PAYMENT TERMS') {
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Selected Payment Method: ${formData.paymentMethod}`, margin, yPosition);
        yPosition += 8;
      }
    });

    // Check if we need a new page for signatures
    checkPageBreak(60);

    // Signatures Section
    yPosition += 10;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SIGNATURES', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Signature boxes
    const signatureY = yPosition;
    
    // Broker signature section
    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BROKER: VALHALLA LOGISTICS LLC', margin, signatureY);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Signature:', margin, signatureY + 10);
    pdf.setFont('times', 'italic');
    pdf.setFontSize(12);
    pdf.text('James Martin', margin + 25, signatureY + 10);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Print Name:', margin, signatureY + 15);
    pdf.text('James Martin', margin + 25, signatureY + 15);
    
    pdf.text('Title:', margin, signatureY + 20);
    pdf.text('President', margin + 25, signatureY + 20);
    
    pdf.text('Date:', margin, signatureY + 25);
    pdf.text(new Date().toLocaleDateString(), margin + 25, signatureY + 25);

    // Carrier signature section
    const carrierX = pageWidth / 2 + 10;
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.text(`CARRIER: ${(formData.carrierName || 'N/A').toUpperCase()}`, carrierX, signatureY);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Signature:', carrierX, signatureY + 10);
    pdf.setFont('times', 'italic');
    pdf.setFontSize(12);
    pdf.text(formData.signature || 'N/A', carrierX + 25, signatureY + 10);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text('Print Name:', carrierX, signatureY + 15);
    pdf.text(formData.fullName || 'N/A', carrierX + 25, signatureY + 15);
    
    pdf.text('Title:', carrierX, signatureY + 20);
    pdf.text(formData.title || 'N/A', carrierX + 25, signatureY + 20);
    
    pdf.text('Date:', carrierX, signatureY + 25);
    pdf.text(formData.date || new Date().toLocaleDateString(), carrierX + 25, signatureY + 25);

    // Check if we need new page for certificate or can fit on current page
    yPosition = signatureY + 60;
    
    if (yPosition > pageHeight - 100) {
      pdf.addPage();
      yPosition = 20;
    } else {
      // Add some space before certificate
      yPosition += 15;
    }

    // Add top border for certificate section
    pdf.setLineWidth(2);
    pdf.setDrawColor(30, 58, 138); // Blue color
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;

    // Certificate Section Header
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(30, 58, 138); // Blue color
    pdf.text('CERTIFICATE', pageWidth / 2, yPosition, { align: 'center' });
    pdf.setTextColor(0, 0, 0); // Reset to black
    yPosition += 15;

    // Certificate header info with better alignment
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    // Create two columns for certificate info
    const leftColumn = margin;
    const rightColumn = pageWidth / 2 + 20;
    
    // Left side
    pdf.setFont('helvetica', 'bold');
    pdf.text('MC: 1558919', leftColumn, yPosition);
    pdf.setFont('helvetica', 'normal');
    
    // Right side
    pdf.setFont('helvetica', 'bold');
    pdf.text('Valhalla Logistic LLC', rightColumn, yPosition);
    pdf.setFont('helvetica', 'normal');
    yPosition += 6;
    
    // Second line
    pdf.setFont('helvetica', 'bold');
    pdf.text('USDOT# 4091738', leftColumn, yPosition);
    pdf.setFont('helvetica', 'normal');
    
    pdf.setFont('helvetica', 'bold');
    pdf.text('1255 FRANKLIN AVE SUITE 350', rightColumn, yPosition);
    pdf.setFont('helvetica', 'normal');
    yPosition += 6;
    
    // Third line for full address
    pdf.text('GARDEN CITY, NY 11530', rightColumn, yPosition);
    yPosition += 15;

    // Certificate main text with better formatting
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    
    const certificateText1 = `This License is evidence of the applicant's authority to engage in operations, in interstate or foreign as a broker, arranging for transportation of freight (except household goods) by Motor Vehicle.`;
    
    yPosition = addWrappedText(certificateText1, margin, yPosition, contentWidth, 9, 'normal');
    yPosition += 8;
    
    const certificateText2 = `This authority will be effective as long as the broker maintains insurance coverage for the protection of the public (49 CFR 387) and the designation of agents upon whom process may be served (49 CFR 366). The applicant shall also make reasonably continuous and adequate service to the public. Failure to maintain compliance will constitute sufficient grounds for revocation of this authority.`;
    
    yPosition = addWrappedText(certificateText2, margin, yPosition, contentWidth, 9, 'normal');
    yPosition += 20;

    // Certificate signature - right aligned
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    const signatureText1 = 'Jeffrey L. Secrist, Chief';
    const signatureText2 = 'Information Technology Operations Division';
    
    // Calculate right alignment
    const sig1Width = pdf.getTextWidth(signatureText1);
    const sig2Width = pdf.getTextWidth(signatureText2);
    
    pdf.text(signatureText1, pageWidth - margin - sig1Width, yPosition);
    yPosition += 5;
    pdf.text(signatureText2, pageWidth - margin - sig2Width, yPosition);
    yPosition += 20;

    // Note section with better spacing
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(30, 58, 138); // Blue color
    pdf.text('NOTE:', margin, yPosition);
    pdf.setTextColor(0, 0, 0); // Reset to black
    yPosition += 8;

    const noteText = `Willful and persistent noncompliance with applicable safety fitness regulations as evidenced by a DOT safety fitness rating of unsatisfactory, or by other indicators, could result in proceedings requiring the holder of this certificate or permit to show cause why this authority should not be suspended or revoked.`;

    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    addWrappedText(noteText, margin, yPosition, contentWidth, 9, 'normal');

    // Generate and return blob
    const pdfBlob = pdf.output('blob');
    return pdfBlob;
    
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
};

// Alternative function to generate PDF with enhanced styling
export const generateStyledAgreementPDF = async (formData) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 12;
    const contentWidth = pageWidth - (margin * 2);
    
    let yPosition = 15;
    
    // Colors
    const primaryColor = [30, 58, 138]; // Blue
    const secondaryColor = [100, 116, 139]; // Gray
    const textColor = [15, 23, 42]; // Dark gray
    
    // Helper functions
    const addStyledHeader = (text, fontSize = 14, color = primaryColor) => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...color);
      pdf.text(text, margin, yPosition);
      pdf.setTextColor(...textColor);
      yPosition += fontSize * 0.5;
      
      // Add underline
      pdf.setLineWidth(0.5);
      pdf.setDrawColor(...color);
      pdf.line(margin, yPosition, margin + pdf.getTextWidth(text), yPosition);
      pdf.setDrawColor(0, 0, 0);
      yPosition += 5;
    };
    
    const addInfoBox = (title, items, startX = margin, boxWidth = contentWidth / 2 - 5) => {
      const startY = yPosition;
      
      // Box background
      pdf.setFillColor(248, 250, 252); // Light gray background
      pdf.rect(startX, startY - 5, boxWidth, (items.length * 5) + 15, 'F');
      
      // Box border
      pdf.setLineWidth(0.3);
      pdf.setDrawColor(...primaryColor);
      pdf.rect(startX, startY - 5, boxWidth, (items.length * 5) + 15);
      
      // Title
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(...primaryColor);
      pdf.text(title, startX + 3, startY + 2);
      
      // Items
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(...textColor);
      
      items.forEach((item, index) => {
        const itemY = startY + 8 + (index * 5);
        pdf.setFont('helvetica', 'bold');
        pdf.text(item.label, startX + 3, itemY);
        pdf.setFont('helvetica', 'normal');
        const labelWidth = pdf.getTextWidth(item.label);
        pdf.text(item.value, startX + 3 + labelWidth + 2, itemY);
      });
      
      return startY + (items.length * 5) + 15;
    };

    // Document Header
    pdf.setFillColor(...primaryColor);
    pdf.rect(0, 0, pageWidth, 25, 'F');
    
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('BROKER/CARRIER AGREEMENT', pageWidth / 2, 15, { align: 'center' });
    
    // Logo
    pdf.setFillColor(255, 255, 255);
    pdf.rect(pageWidth - 35, 5, 30, 15, 'F');
    pdf.setFontSize(8);
    pdf.setTextColor(...primaryColor);
    pdf.text('VALHALLA', pageWidth - 32, 11);
    pdf.text('LOGISTICS', pageWidth - 32, 16);
    
    yPosition = 35;
    
    // Company Information Boxes
    const brokerItems = [
      { label: 'Broker Name: ', value: 'VALHALLA LOGISTICS LLC' },
      { label: 'MC Number: ', value: 'MC# 1558919' },
      { label: 'USDOT Number: ', value: 'USDOT# 4091738' },
      { label: 'Email: ', value: 'Alex@valhallalogisticllc.com' },
      { label: 'Address: ', value: '1255 FRANKLIN AVE SUITE 350' },
      { label: '', value: 'GARDEN CITY, NY 11530' }
    ];
    
    const carrierItems = [
      { label: 'Carrier Name: ', value: formData.carrierName || 'N/A' },
      { label: 'USDOT/MC: ', value: formData.usdotNumber || 'N/A' },
      { label: 'Phone: ', value: formData.phoneNumber || 'N/A' },
      { label: 'Agreement Date: ', value: formData.agreementDate || 'N/A' },
      { label: 'Bank Name: ', value: formData.bankName || 'N/A' },
      { label: 'Account Type: ', value: formData.accountType || 'N/A' }
    ];
    
    const brokerBoxHeight = addInfoBox('Broker Information', brokerItems, margin);
    const carrierBoxHeight = addInfoBox('Carrier Information', carrierItems, pageWidth / 2 + 5);
    
    yPosition = Math.max(brokerBoxHeight, carrierBoxHeight) + 10;
    
    // Agreement introduction with styled box
    pdf.setFillColor(239, 246, 255); // Light blue background
    pdf.rect(margin, yPosition, contentWidth, 25, 'F');
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(...primaryColor);
    pdf.rect(margin, yPosition, contentWidth, 25);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...textColor);
    
    const introText = `This Broker/Carrier Agreement is entered into between VALHALLA LOGISTICS LLC ("BROKER") and ${formData.carrierName || 'N/A'} ("CARRIER") on ${formData.agreementDate || 'N/A'}.`;
    const introLines = pdf.splitTextToSize(introText, contentWidth - 6);
    pdf.text(introLines, margin + 3, yPosition + 8);
    
    yPosition += 35;
    
    // Terms sections with improved styling
    const sections = [
      { title: 'BROKER OBLIGATIONS', content: 'Broker shall pay CARRIER for services rendered in accordance with agreed rates on Load Confirmations. All payments become due upon delivery completion.' },
      { title: 'CARRIER OBLIGATIONS', content: 'CARRIER must submit proof of delivery with invoices and comply with all applicable laws and regulations.' },
      { title: 'SLOT FEE (REFUNDABLE)', content: 'Carrier shall make a $395 security deposit via instant payment methods. This fee is refundable upon first delivery completion.' },
      { title: 'PAYMENT TERMS', content: `Quick pay: 2% fee (same-day). Standard: 24-hour deposit. Selected method: ${formData.paymentMethod}` },
      { title: 'TERM', content: '90-day initial term, auto-renewing for one-year periods unless terminated with 30 days notice.' }
    ];
    
    sections.forEach((section) => {
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = margin;
      }
      
      // Section header with background
      pdf.setFillColor(...primaryColor);
      pdf.rect(margin, yPosition - 2, contentWidth, 8, 'F');
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.text(section.title, margin + 2, yPosition + 3);
      
      yPosition += 10;
      
      // Section content
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(...textColor);
      const lines = pdf.splitTextToSize(section.content, contentWidth - 4);
      pdf.text(lines, margin + 2, yPosition);
      
      yPosition += (lines.length * 4) + 8;
    });
    
    // Signatures section
    if (yPosition > pageHeight - 60) {
      pdf.addPage();
      yPosition = margin;
    }
    
    yPosition += 10;
    
    // Signature header
    pdf.setFillColor(...primaryColor);
    pdf.rect(margin, yPosition, contentWidth, 10, 'F');
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('SIGNATURES', pageWidth / 2, yPosition + 6, { align: 'center' });
    
    yPosition += 20;
    
    // Signature boxes
    const sigBoxWidth = (contentWidth / 2) - 5;
    
    // Broker signature box
    pdf.setFillColor(248, 250, 252);
    pdf.rect(margin, yPosition, sigBoxWidth, 35, 'F');
    pdf.setLineWidth(0.3);
    pdf.setDrawColor(...primaryColor);
    pdf.rect(margin, yPosition, sigBoxWidth, 35);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text('BROKER: VALHALLA LOGISTICS LLC', margin + 2, yPosition + 6);
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...textColor);
    pdf.text('Signature: James Martin', margin + 2, yPosition + 13);
    pdf.text('Title: President', margin + 2, yPosition + 20);
    pdf.text(`Date: ${new Date().toLocaleDateString()}`, margin + 2, yPosition + 27);
    
    // Carrier signature box
    const carrierBoxX = margin + sigBoxWidth + 10;
    pdf.setFillColor(248, 250, 252);
    pdf.rect(carrierBoxX, yPosition, sigBoxWidth, 35, 'F');
    pdf.rect(carrierBoxX, yPosition, sigBoxWidth, 35);
    
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...primaryColor);
    pdf.text(`CARRIER: ${(formData.carrierName || 'N/A').toUpperCase()}`, carrierBoxX + 2, yPosition + 6);
    
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...textColor);
    pdf.text(`Signature: ${formData.signature || 'N/A'}`, carrierBoxX + 2, yPosition + 13);
    pdf.text(`Title: ${formData.title || 'N/A'}`, carrierBoxX + 2, yPosition + 20);
    pdf.text(`Date: ${formData.date || new Date().toLocaleDateString()}`, carrierBoxX + 2, yPosition + 27);
    
    // Check if we need new page for certificate
    yPosition += 50;
    
    if (yPosition > pageHeight - 120) {
      pdf.addPage();
      yPosition = 20;
    } else {
      yPosition += 15;
    }
    
    // Certificate section with improved design
    pdf.setFillColor(...primaryColor);
    pdf.rect(0, yPosition, pageWidth, 25, 'F');
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text('CERTIFICATE OF AUTHORITY', pageWidth / 2, yPosition + 15, { align: 'center' });
    
    yPosition += 35;
    
    // Certificate content with better layout
    pdf.setFillColor(248, 250, 252); // Light background
    pdf.rect(margin, yPosition, contentWidth, 25, 'F');
    pdf.setLineWidth(0.3);
    pdf.setDrawColor(...primaryColor);
    pdf.rect(margin, yPosition, contentWidth, 25);
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...textColor);
    
    // Two column layout for certificate info
    pdf.setFont('helvetica', 'bold');
    pdf.text('MC: 1558919', margin + 5, yPosition + 8);
    pdf.text('Valhalla Logistic LLC', pageWidth - margin - 45, yPosition + 8);
    
    pdf.text('USDOT# 4091738', margin + 5, yPosition + 15);
    pdf.text('1255 FRANKLIN AVE SUITE 350', pageWidth - margin - 65, yPosition + 15);
    pdf.text('GARDEN CITY, NY 11530', pageWidth - margin - 50, yPosition + 22);
    
    yPosition += 35;
    
    // Certificate authority text
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    const certText = `This License is evidence of the applicant's authority to engage in operations as a broker, arranging for transportation of freight by Motor Vehicle.`;
    const certLines = pdf.splitTextToSize(certText, contentWidth - 10);
    pdf.text(certLines, margin + 5, yPosition);
    
    yPosition += (certLines.length * 4) + 10;
    
    const certText2 = `This authority will be effective as long as the broker maintains insurance coverage for the protection of the public and complies with all applicable regulations.`;
    const certLines2 = pdf.splitTextToSize(certText2, contentWidth - 10);
    pdf.text(certLines2, margin + 5, yPosition);
    
    yPosition += (certLines2.length * 4) + 15;
    
    // Signature section - right aligned
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    const sigText1 = 'Jeffrey L. Secrist, Chief';
    const sigText2 = 'Information Technology Operations Division';
    
    pdf.text(sigText1, pageWidth - margin - pdf.getTextWidth(sigText1), yPosition);
    pdf.text(sigText2, pageWidth - margin - pdf.getTextWidth(sigText2), yPosition + 5);
    
    yPosition += 20;
    
    // Note section with styling
    pdf.setFillColor(254, 242, 242); // Light red background
    pdf.rect(margin, yPosition, contentWidth, 30, 'F');
    pdf.setLineWidth(0.3);
    pdf.setDrawColor(239, 68, 68); // Red border
    pdf.rect(margin, yPosition, contentWidth, 30);
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(10);
    pdf.setTextColor(153, 27, 27); // Dark red
    pdf.text('NOTE:', margin + 5, yPosition + 8);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(127, 29, 29); // Dark red
    const noteText = `Willful and persistent noncompliance with safety regulations could result in suspension or revocation of this authority.`;
    const noteLines = pdf.splitTextToSize(noteText, contentWidth - 10);
    pdf.text(noteLines, margin + 5, yPosition + 15);
    
    return pdf.output('blob');
    
  } catch (error) {
    console.error('Styled PDF Generation Error:', error);
    throw new Error(`Failed to generate styled PDF: ${error.message}`);
  }
};
"use client"

import { useState, useEffect } from "react"
import {
  Check,
  ChevronRight,
  ChevronLeft,
  FileText,
  User,
  CreditCard,
  Shield,
  Download,
  Mail,
  AlertCircle,
  Eye,
  Phone,
  MapPin,
  Wifi,
  WifiOff,
} from "lucide-react"
import { generateAgreementPDF } from "../../utils/pdfGenerator"
import { sendAgreementEmail, checkAPIConnection } from "../../utils/emailService"

const AgreementForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [pdfGenerated, setPdfGenerated] = useState(false)
  const [pdfBlob, setPdfBlob] = useState(null)
  const [pdfUrl, setPdfUrl] = useState(null)
  const [emailSent, setEmailSent] = useState(false)
  const [isEmailSending, setIsEmailSending] = useState(false)
  const [apiConnected, setApiConnected] = useState(true)
  const [agreementData, setAgreementData] = useState(null)

  const [formData, setFormData] = useState({
    // Carrier Info
    carrierName: "",
    usdotNumber: "",
    phoneNumber: "",
    agreementDate: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "",

    // Agreement Info
    fullName: "",
    title: "",
    signature: "",
    email: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "zelle",

    // Terms acceptance
    termsAccepted: false,
    entireContract: false,
  })

  const steps = [
    { id: 1, name: "Carrier Info", icon: <User className="w-5 h-5" /> },
    { id: 2, name: "Conditions", icon: <FileText className="w-5 h-5" /> },
    { id: 3, name: "Agreement Info", icon: <CreditCard className="w-5 h-5" /> },
    { id: 4, name: "Agreement", icon: <Shield className="w-5 h-5" /> },
    { id: 5, name: "Done", icon: <Check className="w-5 h-5" /> },
  ]

  // Check API connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connectionStatus = await checkAPIConnection()
        setApiConnected(connectionStatus.connected)

        if (!connectionStatus.connected) {
          console.warn("Backend API is not available. Fallback methods will be used.")
        }
      } catch (error) {
        console.warn("Failed to check API connection:", error)
        setApiConnected(false)
      }
    }
    checkConnection()
  }, [])

  // Clean up blob URL on unmount
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [pdfUrl])

  // PDF Generation Function
  const generatePDF = async () => {
    setIsGeneratingPDF(true)

    try {
      const pdfBlobData = await generateAgreementPDF(formData)
      setPdfBlob(pdfBlobData)

      // Create URL for preview
      const url = URL.createObjectURL(pdfBlobData)
      setPdfUrl(url)
      setPdfGenerated(true)
    } catch (error) {
      console.error("PDF Generation Error:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  // Email sending function
  const sendEmailWithPDF = async (pdfBlobToSend = null) => {
    try {
      setIsEmailSending(true)

      const blobToSend = pdfBlob || pdfBlobToSend
      if (!blobToSend) {
        throw new Error("PDF not available for sending")
      }

      const result = await sendAgreementEmail(formData, blobToSend)

      if (result.success) {
        setEmailSent(true)
        setAgreementData({
          agreementId: result.agreementId,
          submittedDate: result.submittedDate,
          messageId: result.messageId,
        })

        // Show success message
        alert("Agreement sent successfully! You will receive a confirmation email shortly.")
      } else {
        throw new Error(result.error || "Failed to send agreement")
      }
    } catch (error) {
      console.error("Email sending error:", error)
      alert(`Error sending email: ${error.message}`)
    } finally {
      setIsEmailSending(false)
    }
  }

  // Submit agreement function
  const submitAgreement = async () => {
    try {
      if (!pdfBlob) {
        alert("Please generate the PDF first.")
        return
      }

      // Send email if not already sent
      if (!emailSent) {
        await sendEmailWithPDF()
      }

      // Move to next step only if email was sent successfully
      if (emailSent || agreementData) {
        setCurrentStep(5)
      }
    } catch (error) {
      console.error("Agreement submission error:", error)
      alert(`Error submitting agreement: ${error.message}`)
    }
  }

  // Download PDF function
  const downloadPDF = () => {
    if (pdfBlob) {
      const link = document.createElement("a")
      link.href = URL.createObjectURL(pdfBlob)
      link.download = `Agreement_${formData.carrierName.replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      alert("Please generate the PDF first.")
    }
  }

  // Validation rules
  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.carrierName.trim()) newErrors.carrierName = "Carrier name is required"
      if (!formData.usdotNumber.trim()) newErrors.usdotNumber = "USDOT/MC number is required"
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required"
      if (!formData.agreementDate) newErrors.agreementDate = "Agreement date is required"

      // Phone validation
      const phoneRegex = /^\d{10,}$/
      if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber.replace(/\D/g, ""))) {
        newErrors.phoneNumber = "Please enter a valid phone number (10+ digits)"
      }

      // USDOT validation
      if (formData.usdotNumber && formData.usdotNumber.length < 5) {
        newErrors.usdotNumber = "USDOT/MC number must be at least 5 characters"
      }
    }

    if (step === 2) {
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = "You must accept the terms and conditions"
      }
    }

    if (step === 3) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      if (!formData.signature.trim()) newErrors.signature = "Signature is required"
      if (!formData.title.trim()) newErrors.title = "Title/Position is required"
      if (!formData.entireContract) newErrors.entireContract = "You must agree to the entire contract"

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* API Connection Status */}
            <div
              className={`p-4 rounded-lg border ${
                apiConnected ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"
              }`}
            >
              <div className="flex items-center">
                {apiConnected ? (
                  <>
                    {/* <Wifi className="w-5 h-5 text-green-600 mr-2" /> */}
                    {/* <span className="text-green-800 text-sm font-medium">Connected to server</span> */}
                  </>
                ) : (
                  <>
                    <WifiOff className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-yellow-800 text-sm font-medium">Using fallback email service</span>
                  </>
                )}
              </div>
            </div>

            {/* Broker Information */}
                  <div className="  text-black p-6 rounded-lg">
                    <h3 className="text-white text-lg font-bold mb-4 flex items-center bg-blue-800 px-4 py-2 rounded text-white">
                    <Shield className="w-5 h-5 mr-2" />
                    Broker Details
                    </h3>
                    <div className="grid grid-white md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="underline ">Broker Name:</strong>{" "}
                      <span className="underline ">VALHALLA LOGISTICS LLC</span>
                    </div>
                    <div>
                      <strong className="underline ">USDOT Number:</strong>{" "}
                      <span className="underline ">USDOT# 4091738</span>
                    </div>
                    <div>
                      <strong className="underline ">MC Number:</strong>{" "}
                      <span className="underline ">MC# 1558919</span>
                    </div>
                    <div>
                      <strong className="underline ">Email:</strong>{" "}
                      <span className="underline ">Alex@valhallalogisticllc.com</span>
                    </div>
                    <div className="md:col-span-2">
                      <strong className="underline ">Address:</strong>{" "}
                      <span className="underline ">1255 FRANKLIN AVE SUITE 350 GARDEN CITY, NY 11530</span>
                    </div>
                    </div>
                  </div>

                  {/* Carrier Details */}
            <div className="bg-white text-black p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Carrier Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Carrier Name *</label>
                  <input
                    type="text"
                    value={formData.carrierName}
                    onChange={(e) => handleInputChange("carrierName", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.carrierName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your carrier name"
                  />
                  {errors.carrierName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.carrierName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">USDOT/MC Number *</label>
                  <input
                    type="text"
                    value={formData.usdotNumber}
                    onChange={(e) => handleInputChange("usdotNumber", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.usdotNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your USDOT or MC number"
                  />
                  {errors.usdotNumber && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.usdotNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phoneNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Agreement Date *</label>
                <input
                  type="date"
                  value={formData.agreementDate}
                  onChange={(e) => handleInputChange("agreementDate", e.target.value)}
                  className={`w-full md:w-auto px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.agreementDate ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.agreementDate && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.agreementDate}
                  </p>
                )}
              </div>
            </div>

            {/* Banking Information */}
            <div className="bg-gray-50 text-black p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Banking Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange("bankName", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your bank name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your account number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Routing Number</label>
                  <input
                    type="text"
                    value={formData.routingNumber}
                    onChange={(e) => handleInputChange("routingNumber", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your routing number"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <select
                  value={formData.accountType}
                  onChange={(e) => handleInputChange("accountType", e.target.value)}
                  className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an account type</option>
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </select>
              </div>

              <div className="mt-4 p-4 bg-white rounded-lg">
                <div className="flex items-start space-x-2">
                  <Shield className="w-5 h-5 text-black mt-0.5" />
                  <p className="text-sm text-black">
                    All information provided will be kept confidential and secure. If you are not interested or
                    comfortable then write 0000 in all banking fields.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Terms and Conditions</h3>
            <p className="text-gray-600">Please review the following terms and conditions carefully.</p>

            <div className="bg-white border rounded-lg p-6 max-h-96 overflow-y-auto">
              <div className="space-y-6 text-sm">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">BROKER OBLIGATIONS</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Broker shall pay CARRIER for services rendered in an amount equal to the rates and charges agreed to
                    as set forth on any Load Confirmation(s) that is issued and that supplements and amends this
                    Agreement to the extent its terms conflict with those in this Agreement. All payments on the Load
                    Confirmation(s) become due when delivery with all services have been performed. CARRIER shall not
                    bill for any accessorial or other charge not approved in this Agreement or on Load Confirmation(s).
                    Rates may be amended orally but must be confirmed in writing within a framework consistent with
                    order to remain binding between the parties. As a condition precedent to payment.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">CARRIER OBLIGATIONS</h4>
                  <p className="text-gray-700 leading-relaxed">
                    CARRIER must submit proof of delivery with all invoices, and the invoices must reflect that CARRIER
                    delivered the freight to its final destination. BROKER agrees to arrange for the transportation of a
                    shipper's freight with CARRIER pursuant to the terms of this Agreement, and to comply with all
                    federal, state, and local laws and regulations pertaining to the brokerage services covered by this
                    Agreement.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">SLOT FEE (REFUNDABLE)</h4>
                  <p className="text-gray-700 leading-relaxed">
                    The Carrier shall make a security deposit of $395 by direct payment, through instant payment methods
                    to the Valhalla Logistic LLC. It is a refundable fee upon the first delivery, along with the payment
                    of the load, for the securement of the load. Once carrier pays $395 to, carrier must get a Receipt
                    for the Deposit Fee by the representative. The security deposit shall be refundable upon the
                    termination of this Agreement, subject to any outstanding obligations or damages incurred by the
                    Carrier. The Carrier may terminate this Agreement with one week's written notice to the Company.
                    Broker is responsible for Detention.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">PAYMENT TERMS</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Signed Copy of rate confirmation and the company's invoice to the broker to get paid. We have two
                    options: We charge 2% for Quick pay (same-day deposit). No fees for 24 hours deposit. Factoring.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-2">
                    <strong>Selected Payment Method:</strong> {formData.paymentMethod}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">TERM</h4>
                  <p className="text-gray-700 leading-relaxed">
                    The term of this Agreement shall be 90 day's, commencing on the date listed above. If not cancelled
                    by one of The Parties, the Agreement shall automatically renew itself for consecutive one year
                    terms. The Agreement can be terminated at any time by either of The Parties with thirty (30) days
                    written or electronic notice to the other party provided all balances are settled.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">NOTICES</h4>
                  <p className="text-gray-700 leading-relaxed">
                    If carrier wants to end the contract or want to switch the jobs, carrier must give prior notice of 3
                    days before ending the contract.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">ENTIRE CONTRACT</h4>
                  <p className="text-gray-700 leading-relaxed">
                    The provisions contained in this AGREEMENT properly express and memorialize the complete
                    understanding and agreement between the parties, including those contained in all prior agreements,
                    both verbal or written, and there are no other agreements or understandings between the parties,
                    express or implied, except as set forth herein.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">DISCLAIMER</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Nothing in this Agreement relieves Carrier/Broker of any responsibilities with respect to Canadian
                    and United States law, including Customs Regulations.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms-accepted"
                checked={formData.termsAccepted}
                onChange={(e) => handleInputChange("termsAccepted", e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
              />
              <label htmlFor="terms-accepted" className="text-sm text-gray-700">
                I have read and agree to the terms and conditions
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="text-red-500 text-xs flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                {errors.termsAccepted}
              </p>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Agreement Information</h3>
            <p className="text-gray-600">Provide your details to complete the agreement.</p>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Signatory Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title/Position *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., Owner, Dispatcher"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Signature *</label>
                  <input
                    type="text"
                    value={formData.signature}
                    onChange={(e) => handleInputChange("signature", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.signature ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Type your name to sign"
                    style={{ fontFamily: "cursive" }}
                  />
                  {errors.signature && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.signature}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Payment Method</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {["zelle", "cashapp", "paypal", "venmo", "chime"].map((method) => (
                  <label key={method} className="flex flex-col items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-full p-3 border-2 rounded-lg text-center transition-all ${
                        formData.paymentMethod === method
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <span className="capitalize font-medium">{method}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">ENTIRE CONTRACT:</h4>
              <p className="text-gray-700 text-sm mb-4">
                The provisions contained in this AGREEMENT properly express and memorialize the complete understanding
                and agreement between the parties, including those contained in all prior agreements, both verbal or
                written, and there are no other agreements or understandings between the parties, express or implied,
                except as set forth herein.
              </p>

              <h4 className="font-semibold text-gray-900 mb-2">NOTICES:</h4>
              <p className="text-gray-700 text-sm mb-4">
                If carrier wants to end the contract or want to switch the jobs, carrier must give prior notice of 3
                days before ending the contract.
              </p>

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="entire-contract"
                  checked={formData.entireContract}
                  onChange={(e) => handleInputChange("entireContract", e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                />
                <label htmlFor="entire-contract" className="text-sm text-gray-700">
                  I have read and agree to the terms set forth in this agreement.
                </label>
              </div>
              {errors.entireContract && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.entireContract}
                </p>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">Review Your Agreement</h3>
            <p className="text-gray-600">Please review all information before generating your agreement.</p>

            <div className="bg-white border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <User className="w-5 h-5 mr-2 text-blue-600" />
                    Carrier Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Name:</span> {formData.carrierName || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">USDOT/MC:</span> {formData.usdotNumber || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {formData.phoneNumber || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">Agreement Date:</span> {formData.agreementDate || "Not set"}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                    Agreement Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Signed By:</span> {formData.fullName || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">Title:</span> {formData.title || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> {formData.email || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">Payment Method:</span> {formData.paymentMethod}
                    </div>
                  </div>
                </div>
              </div>

              {formData.bankName && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                    Banking Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Bank Name:</span> {formData.bankName}
                    </div>
                    <div>
                      <span className="font-medium">Account Type:</span> {formData.accountType || "Not specified"}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* PDF Preview */}
            {pdfGenerated && pdfUrl && (
              <div className="bg-white border rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Agreement Preview
                </h4>

                <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  <iframe src={pdfUrl} className="w-full h-96" title="Agreement Preview" />
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={downloadPDF}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-semibold text-sm flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>

                  <button
                    onClick={sendEmailWithPDF}
                    disabled={emailSent || isEmailSending}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200 font-semibold text-sm flex items-center justify-center"
                  >
                    {isEmailSending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : emailSent ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Email Sent!
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Send to Business
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start space-x-3">
                <FileText className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {pdfGenerated ? "Agreement Generated Successfully!" : "Ready to Generate Agreement"}
                  </h4>
                  <p className="text-blue-800 mb-4">
                    {pdfGenerated
                      ? "Your agreement has been generated and is ready for review. You can download it and send it to our business when ready."
                      : "Click the button below to generate your PDF agreement for review and submission."}
                  </p>
                  {!pdfGenerated && (
                    <button
                      onClick={generatePDF}
                      disabled={isGeneratingPDF}
                      className="inline-flex items-center px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 disabled:bg-gray-400 transition-colors duration-200 font-semibold"
                    >
                      {isGeneratingPDF ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Generating PDF...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Generate Agreement
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Agreement Section */}
            {pdfGenerated && (
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start space-x-3">
                  <Mail className="w-6 h-6 text-green-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-900 mb-2">Ready to Submit Agreement</h4>
                    <p className="text-green-800 mb-4">
                      {emailSent
                        ? "Your agreement has been successfully sent to our business team and is ready for processing."
                        : "Click the button below to send your agreement to our business team and complete the process."}
                    </p>
                    {agreementData && (
                      <div className="bg-white p-3 rounded border mb-4">
                        <p className="text-sm text-gray-600">
                          <strong>Agreement ID:</strong> {agreementData.agreementId}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Submitted:</strong> {new Date(agreementData.submittedDate).toLocaleString()}
                        </p>
                      </div>
                    )}
                    <button
                      onClick={submitAgreement}
                      disabled={isEmailSending}
                      className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors duration-200 font-semibold"
                    >
                      {isEmailSending ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Submitting Agreement...
                        </>
                      ) : emailSent ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Complete Process
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5 mr-2" />
                          Submit Agreement
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-10 h-10 text-green-600" />
            </div>

            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Agreement Submitted Successfully!</h3>
              <p className="text-lg text-gray-600 mb-8">
                Your agreement has been generated and sent to our business team.
              </p>
            </div>

            {/* Agreement Summary */}
            <div className="bg-white border rounded-lg p-6 max-w-2xl mx-auto text-left">
              <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Agreement Summary</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    Carrier Information
                  </h5>
                  <div className="space-y-2 text-gray-600">
                    <div>
                      <strong>Name:</strong> {formData.carrierName}
                    </div>
                    <div>
                      <strong>USDOT/MC:</strong> {formData.usdotNumber}
                    </div>
                    <div>
                      <strong>Phone:</strong> {formData.phoneNumber}
                    </div>
                    <div>
                      <strong>Email:</strong> {formData.email}
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-blue-600" />
                    Agreement Details
                  </h5>
                  <div className="space-y-2 text-gray-600">
                    <div>
                      <strong>Signed By:</strong> {formData.fullName}
                    </div>
                    <div>
                      <strong>Title:</strong> {formData.title}
                    </div>
                    <div>
                      <strong>Date:</strong> {formData.agreementDate}
                    </div>
                    <div>
                      <strong>Payment Method:</strong> {formData.paymentMethod}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-green-600 mb-2">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Agreement sent to: Alex@valhallalogisticllc.com</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">PDF generated and available for download</span>
                </div>
                {agreementData && (
                  <div className="flex items-center space-x-2 text-blue-600 mt-2">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm font-medium">Agreement ID: {agreementData.agreementId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {pdfBlob && (
                <button
                  onClick={downloadPDF}
                  className="inline-flex items-center px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-semibold"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Agreement
                </button>
              )}

              <button
                onClick={() => {
                  // Reset form for new agreement
                  setCurrentStep(1)
                  setFormData({
                    carrierName: "",
                    usdotNumber: "",
                    phoneNumber: "",
                    agreementDate: "",
                    bankName: "",
                    accountNumber: "",
                    routingNumber: "",
                    accountType: "",
                    fullName: "",
                    title: "",
                    signature: "",
                    email: "",
                    date: new Date().toISOString().split("T")[0],
                    paymentMethod: "zelle",
                    termsAccepted: false,
                    entireContract: false,
                  })
                  setPdfGenerated(false)
                  setPdfBlob(null)
                  if (pdfUrl) {
                    URL.revokeObjectURL(pdfUrl)
                    setPdfUrl(null)
                  }
                  setEmailSent(false)
                  setAgreementData(null)
                  setErrors({})
                }}
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-blue-900 hover:text-blue-900 transition-colors duration-200 font-semibold"
              >
                Create New Agreement
              </button>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 mb-3">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>03447732310</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>Alex@valhallalogisticllc.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Garden City, NY</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">What's Next?</h4>
              <ul className="text-gray-700 text-sm space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <span>Our team will review your agreement within 24 hours</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <span>You'll receive a confirmation email with next steps</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <span>Setup your carrier profile and start receiving loads</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <span>Contact support if you have any questions</span>
                </li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section id="agreement" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Broker/Carrier Agreement</h2>
          <p className="text-xl text-gray-600">Please enter your carrier information below.</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                    currentStep >= step.id
                      ? "bg-blue-900 border-blue-900 text-white"
                      : currentStep === step.id
                        ? "border-blue-900 text-blue-900 bg-white"
                        : "border-gray-300 text-gray-400 bg-white"
                  }`}
                >
                  {currentStep > step.id ? <Check className="w-6 h-6" /> : step.icon}
                </div>

                <div className="ml-3">
                  <div className={`text-sm font-medium ${currentStep >= step.id ? "text-blue-900" : "text-gray-500"}`}>
                    {step.name}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-4 ${currentStep > step.id ? "bg-blue-900" : "bg-gray-300"}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderStepContent()}

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </button>

              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 2 && !formData.termsAccepted) ||
                  (currentStep === 3 && !formData.entireContract) ||
                  (currentStep === 4 && (!pdfGenerated || !emailSent))
                }
                className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  (currentStep === 2 && !formData.termsAccepted) ||
                  (currentStep === 3 && !formData.entireContract) ||
                  (currentStep === 4 && (!pdfGenerated || !emailSent))
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-900 text-white hover:bg-blue-800"
                }`}
              >
                Continue
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AgreementForm

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    number: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    number: '',
  });

  const [downloadComplete, setDownloadComplete] = useState(false); // New state to track download completion
  const history = useNavigate(); // Hook for programmatic navigation

  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    let isValid = true;
    let newErrors = { email: '', number: '' };

    // Validate email
    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    // Validate phone number
    if (!phoneRegex.test(form.number)) {
      newErrors.number = 'Phone number must be 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear errors dynamically as user is typing
    if (e.target.name === 'email' && errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
    if (e.target.name === 'number' && errors.number) {
      setErrors((prevErrors) => ({ ...prevErrors, number: '' }));
    }
  };

  const handleDownload = async () => {
    if (!validateForm()) return;
  
    try {
      // Save the contact info to MongoDB
      await axios.post('http://localhost:3001/api/contact', form);
  
      // Trigger the download of the PDF
      window.location.href = 'http://localhost:3001/brochure.pdf'; // Use the full URL to avoid React Router conflict
  
      // Show download complete message
      setDownloadComplete(true);
  
      // Redirect to home page after 3 seconds
      setTimeout(() => {
        history.push('/'); // Redirect to home page
      }, 3000); // Delay for 3 seconds
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Something went wrong. Please try again later.');
    }
  };
  
  

  return (
    <>
      <Header />

      {/* Page top bar - visible only on md and above */}
      <div className="bg-[#33668a] pt-24 md:pt-16 px-4 hidden md:flex justify-between items-center text-white">
        <h1 className="text-2xl ms-8 mt-4 md:text-3xl font-bold">Contact Us</h1>
        <h1 className="text-2xl me-80 mt-4 md:text-3xl font-bold">Enroll Now</h1>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-[#33668a] pt-24 md:pt-8 p-4 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        {/* Left section */}
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <h2 className="text-white text-2xl font-bold mb-2 md:hidden">Contact Us</h2>

          {/* Address Card */}
          <div className="bg-white p-6 rounded-2xl mt-12 text-black text-lg min-h-[200px]">
            <p>Address</p>
            <p>Email</p>
            <p>mob:</p>
          </div>

          {/* Google Map Circle */}
          <div className="flex justify-center items-center">
            <div className="w-60 h-60 overflow-hidden rounded-full border-4 border-white">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.307246823547!2d-122.4194156846811!3d37.77492977975966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c0bd7ed99%3A0x8a6d2f9e2d7f8c19!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1649250987072!5m2!1sen!2sus"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col w-full mt-12 md:w-1/2 justify-center items-center gap-4">
          {/* Enroll Now - visible only on small screens */}
          <h2 className="text-white text-2xl font-bold mb-2 md:hidden">Enroll Now</h2>

          {/* Name Input */}
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full max-w-md p-4 rounded-sm text-lg font-semibold text-[#33668a] focus:outline-none"
          />
          
          {/* Phone Input */}
          <input
            name="number"
            type="text"
            placeholder="Phone Number"
            value={form.number}
            onChange={handleChange}
            className="w-full max-w-md p-4 rounded-sm text-lg font-semibold text-[#33668a] focus:outline-none"
          />
          {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}

          {/* Email Input */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full max-w-md p-4 rounded-sm text-lg font-semibold text-[#33668a] focus:outline-none"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* Submit Button */}
          {form.name && form.number && form.email && !errors.email && !errors.number ? (
            <button
              onClick={handleDownload}
              className="mt-4 bg-white text-[#33668a] font-semibold text-xl px-6 py-4 rounded-2xl shadow-md text-center"
            >
              Download <br /> brochure
            </button>
          ) : (
            <button
              disabled
              className="mt-4 bg-white/50 text-[#33668a] font-semibold text-xl px-6 py-4 rounded-2xl shadow-md cursor-not-allowed"
            >
              Fill all fields <br /> to download
            </button>
          )}
          
          {/* Show download complete message */}
          {downloadComplete && (
            <div className="mt-4 text-white text-xl">
              <p>Download Complete! Redirecting to homepage...</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;











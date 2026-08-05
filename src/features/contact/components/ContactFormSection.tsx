"use client";

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { contactService } from '@/services/contactService';

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    title: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullname || !formData.email || !formData.title || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const data = await contactService.submitContactForm(formData);
      toast.success(data.message || 'Contact form submitted successfully');
      setFormData({ fullname: '', email: '', title: '', message: '' });
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while submitting. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="w-full bg-[#F5F5F0] flex justify-center font-['Poppins'] px-6 md:px-12"
      style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px' }}
    >
      <Toaster position="top-right" />
      <div className="max-w-[1234px] w-full flex flex-col lg:flex-row justify-between gap-12 lg:gap-16">
        
        {/* Left Side: Contact Info */}
        <div className="flex flex-col gap-10 lg:w-[45%]">
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-black font-medium text-[36px] md:text-[58px] leading-none capitalize">
              Contact Us
            </h2>
            <p className="text-black text-[16px] md:text-[23px] leading-[26px] md:leading-[28px] max-w-[450px]">
              We are committed to processing the information in order to contact you and talk about your project.
            </p>
          </div>

          <div className="flex flex-col gap-8 mt-4">
            {/* Email */}
            <div className="flex items-start gap-4 md:gap-6">
              <div className="w-6 h-6 flex-shrink-0 mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#FFCE65" strokeWidth="2"/>
                  <path d="M2 6L12 13L22 6" stroke="#FFCE65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-black text-[16px] md:text-[20px] leading-[145%]">
                support@nattypay.com
              </p>
            </div>

            {/* Address */}
            <div className="flex items-start gap-6">
              <div className="w-6 h-6 flex-shrink-0 mt-1">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#FFCE65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="#FFCE65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-black text-[16px] md:text-[20px] leading-[145%] max-w-[300px]">
                Head office: C3 & C4 Suite second floor Ejiobi plaza new market road Main market onitsha Anambra state
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-6">
              <div className="w-6 h-6 flex-shrink-0 mt-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="2" width="14" height="20" rx="2" stroke="#FFCE65" strokeWidth="2"/>
                  <path d="M12 18H12.01" stroke="#FFCE65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-black text-[16px] md:text-[20px] leading-[145%]">
                +234 813 414 6909
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col gap-6 lg:w-[50%]">
          <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
            <div className="w-full relative">
              <input 
                type="text" 
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Name *" 
                className="w-full bg-white border border-[#D8D8D8] rounded-[8px] text-[#494949] text-[16px] outline-none focus:border-[#FFCE65]"
                style={{ padding: '24px 28px', height: '82px' }}
                disabled={isSubmitting}
              />
            </div>
            <div className="w-full relative">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *" 
                className="w-full bg-white border border-[#D8D8D8] rounded-[8px] text-[#494949] text-[16px] outline-none focus:border-[#FFCE65]"
                style={{ padding: '24px 28px', height: '82px' }}
                disabled={isSubmitting}
              />
            </div>
            <div className="w-full relative">
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Subject *" 
                className="w-full bg-white border border-[#D8D8D8] rounded-[8px] text-[#494949] text-[16px] outline-none focus:border-[#FFCE65]"
                style={{ padding: '24px 28px', height: '82px' }}
                disabled={isSubmitting}
              />
            </div>
            <div className="w-full relative">
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message *" 
                className="w-full bg-white border border-[#D8D8D8] rounded-[8px] text-[#494949] text-[16px] outline-none focus:border-[#FFCE65] resize-none"
                style={{ padding: '24px 28px', height: '189px' }}
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#F0BF4C] rounded-[6px] text-black font-semibold text-[16px] transition-colors mt-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#e0b040]'}`}
              style={{ padding: '24px 28px' }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

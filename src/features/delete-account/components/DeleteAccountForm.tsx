"use client";

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { contactService } from '@/services/contactService';

export default function DeleteAccountForm() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.fullname || !formData.email || !formData.reason) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    const formattedMessage = `Phone: ${formData.phone || 'Not provided'}\n\nReason for deletion:\n${formData.reason}`;

    try {
      const data = await contactService.submitContactForm({
        fullname: formData.fullname,
        email: formData.email,
        title: 'Account Deletion Request',
        message: formattedMessage
      });
      toast.success(data.message || 'Account deletion request submitted successfully');
      setFormData({ fullname: '', email: '', phone: '', reason: '' });
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while submitting. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-transparent flex justify-center font-['Poppins'] px-6 md:px-12" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <Toaster position="top-right" />
      <div className="max-w-[1240px] w-full flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 items-start">
        
        {/* Left Side: Content */}
        <div className="flex flex-col gap-6 lg:w-[45%] pt-4">
          <h1 className="text-white font-medium text-[36px] md:text-[52px] leading-tight m-0">
            Account Deletion
          </h1>
          <p className="text-white/60 font-normal text-[16px] md:text-[20px] leading-[1.6]">
            You may request to permanently delete your NattyPay account at any time. Once your deletion request is processed, you will no longer be able to log in, and all non-essential personal data associated with your account will be permanently removed from our systems.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-[50%]">
          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
            <div className="w-full">
              <input 
                type="text" 
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Name *" 
                className="w-full bg-[#16161E] border border-white/5 rounded-[8px] text-white placeholder-white/40 text-[15px] outline-none focus:border-[#F0BF4C] transition-colors shadow-sm"
                style={{ padding: '20px 24px', height: '64px' }}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="w-full">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (Linked to your account) *" 
                className="w-full bg-[#16161E] border border-white/5 rounded-[8px] text-white placeholder-white/40 text-[15px] outline-none focus:border-[#F0BF4C] transition-colors shadow-sm"
                style={{ padding: '20px 24px', height: '64px' }}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="w-full">
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number" 
                className="w-full bg-[#16161E] border border-white/5 rounded-[8px] text-white placeholder-white/40 text-[15px] outline-none focus:border-[#F0BF4C] transition-colors shadow-sm"
                style={{ padding: '20px 24px', height: '64px' }}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="w-full">
              <textarea 
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Reason for deletion *" 
                className="w-full bg-[#16161E] border border-white/5 rounded-[8px] text-white placeholder-white/40 text-[15px] outline-none focus:border-[#F0BF4C] transition-colors resize-none shadow-sm"
                style={{ padding: '20px 24px', height: '160px' }}
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#EBBB4D] hover:bg-[#d4a844] rounded-[8px] text-black font-medium text-[16px] transition-colors mt-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              style={{ padding: '20px 24px', height: '64px' }}
            >
              {isSubmitting ? 'Submitting...' : 'Request Account Deletion'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

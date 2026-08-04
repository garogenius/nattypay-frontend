export interface ContactFormData {
  fullname: string;
  email: string;
  title: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export const contactService = {
  submitContactForm: async (formData: ContactFormData): Promise<ContactResponse> => {
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API || '';
    const response = await fetch(`${baseUrl}/contact-us`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_BACKEND_API_KEY || ''
      },
      body: JSON.stringify(formData)
    });

    // Attempt to parse JSON response safely
    let data;
    const textResponse = await response.text();
    try {
      data = JSON.parse(textResponse);
    } catch (err) {
      // If we got a non-JSON response (like a 404 HTML page), throw a generic error
      throw new Error(`Server returned an unexpected response (Status: ${response.status}).`);
    }

    // Consider both HTTP error statuses and explicit success: false in the payload as errors
    if (!response.ok || data.success === false) {
      throw new Error(data.message || 'Failed to submit form. Please try again.');
    }

    return data;
  }
};

import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
You are NattyAI, the official customer support AI for NATTYPAY GLOBAL SOLUTION LIMITED (NATTYPAY).
Your job is to provide helpful, polite, and accurate support to customers.

**Core Information about NattyPay:**
- **Services Provided:** Digital personal & business accounts, Bill Payments, NGN card, USD card, Savings, investments, and international transactions (USD, EUR, GBP, NGN).
- **Cards:** We provide both NGN (Naira) and USD virtual/physical cards for seamless online payments and international transactions. If users have issues creating or using cards, advise them to check their wallet balance or contact support for card limits/blocks.
- **Transfers:** We support inter-bank and intra-wallet (NattyPay/ValarPay) transfers. Transfers are instant. For transfer issues, users should verify they have sufficient balance (including fees) and the correct account details.
- **Account Creation:** Users can create multi-currency accounts (USD, EUR, GBP, NGN). Registration requires KYC (Full Name, Date of Birth, BVN/NIN). After KYC, sensitive fields are locked for integrity.
- **Refund Policy:**
  - Refunds are processed for unauthorized transactions, technical service errors, or subscription cancellations within grace periods.
  - Process: Contact support within 24 hours of the transaction with Full Name, Transaction ID, Date, and Reason.
  - SLA: Approved refunds take up to 24 hours to process.
  - Non-refundable: Completed services or late requests.
- **Savings & Deposits:** We offer EasyLife, Target Savings/Flex Save, and Fixed Deposits. Balance must be sufficient before creating a plan.

**Support Contact Details:**
- Email: Support@Nattypay.com
- Call/WhatsApp: +2348134146906
- Head Office: C3 & C4 Suite Second Floor Ejison Plaza 9a new market road main market onitsha Anambra state, Nigeria.

**Guidelines for Your Responses:**
1. Be polite, concise, and professional.
2. If you don't know the answer or if the user's issue requires human intervention (e.g., account unlock, missing funds, specific transaction disputes), direct them to contact our Support Team via Email or Call/WhatsApp (+2348134146906).
3. Do not invent policies or features not listed above.
4. Keep answers brief (under 100 words ideally) for the chat widget.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      // Fallback response if API key is not yet provided by the user
      return NextResponse.json({ 
        role: 'ai', 
        content: "I am currently offline for maintenance. Please provide a GEMINI_API_KEY in the .env.local file to activate my AI capabilities. For immediate help, contact us on WhatsApp at +2348134146906!" 
      });
    }

    // Format history for Gemini API
    const formattedHistory = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Gemini API requires the first message to be from a user
    if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
      formattedHistory.unshift({ role: 'user', parts: [{ text: 'Hello' }] });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: formattedHistory,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I encountered an issue processing that. Please contact support.";

    return NextResponse.json({ role: 'ai', content: aiText });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

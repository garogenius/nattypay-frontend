export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  content?: string;
}

export const MOCK_POSTS: BlogPost[] = [
  {
    slug: 'nattypay-multi-currency-business-wallets',
    title: 'NattyPay Launches Multi-Currency Business Wallets',
    excerpt: 'Experience borderless financial growth with our newly released multi-currency wallets, designed to reduce conversion fees for global businesses.',
    category: 'Product News',
    date: 'December 12, 2026',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>Going Borderless</h2>
      <p>Today, we are incredibly excited to announce the launch of NattyPay Multi-Currency Business Wallets. This new product feature allows entrepreneurs and global businesses to hold, receive, and spend money in NGN, USD, GBP, and EUR—all from a single, unified dashboard.</p>
      
      <h2>Why Multi-Currency?</h2>
      <p>For too long, businesses have suffered from exorbitant conversion rates and slow processing times when dealing with international clients. With our new wallets, you can receive payments directly in the native currency of your client, hold the funds securely, and convert them to your local currency only when rates are favorable.</p>
    `
  },
  {
    slug: 'future-of-digital-payments-nigeria',
    title: 'The Future of Digital Payments in Nigeria: What to Expect in 2026',
    excerpt: 'Explore how mobile money, blockchain, and regulatory shifts are fundamentally reshaping the way Nigerians transact on a daily basis.',
    category: 'Industry Trends',
    date: 'August 2, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>The Shift to Cashless Ecosystems</h2>
      <p>The landscape of digital payments in Nigeria is evolving at an unprecedented pace. Over the past decade, we've witnessed a massive shift from a cash-heavy society to an ecosystem thriving on mobile wallets, USSD transactions, and real-time bank transfers.</p>
      <p>In 2026, this shift is moving beyond just basic transfers. We are now entering an era of programmable money and seamless cross-border interoperability.</p>
      
      <h2>Regulatory Impact</h2>
      <p>Recent directives from the Central Bank of Nigeria have mandated stricter KYC protocols while simultaneously opening the door for open banking APIs. This means third-party applications can now offer highly personalized financial services directly linked to your primary bank account.</p>
      
      <h2>What This Means for Small Businesses</h2>
      <p>For small and medium enterprises (SMEs), the barrier to accepting digital payments has never been lower. Expensive POS terminals are being replaced by "Tap to Pay" features on standard smartphones, democratizing commerce across the nation.</p>
      
      <blockquote>"The future of finance in Africa isn't in bank branches; it's right in the palm of your hand."</blockquote>
      
      <p>At NattyPay, we are building the infrastructure to ensure that every Nigerian can participate in this digital revolution seamlessly, securely, and affordably.</p>
    `
  },
  {
    slug: 'maximizing-savings-nattypay',
    title: '5 Smart Ways to Maximize Your Savings with NattyPay Flex',
    excerpt: 'Discover the hidden features of NattyPay Flex that can help you reach your financial goals faster with automated saving rules.',
    category: 'Financial Tips',
    date: 'July 28, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1200',
    content: `
      <h2>Automate Everything</h2>
      <p>The number one reason people fail to save is because they rely on willpower. With NattyPay Flex, you can set up automated deductions daily, weekly, or monthly.</p>
      
      <h2>Round-Up Your Spare Change</h2>
      <p>Did you know you can turn on the "Round-Up" feature? Every time you make a transfer or pay a bill, NattyPay automatically rounds the amount up to the nearest hundred Naira and deposits the difference straight into your Flex savings.</p>
      
      <h2>Set Strict Withdrawal Limits</h2>
      <p>If you're tempted to dip into your savings, you can lock your Flex account for a specific duration. During this time, withdrawals are restricted, ensuring you don't sabotage your long-term goals for short-term gratification.</p>
    `
  },
  {
    slug: 'understanding-crypto-regulations',
    title: 'Navigating the New Crypto Regulations: A Guide for Beginners',
    excerpt: 'Confused by the latest CBN directives? We break down exactly what the new cryptocurrency regulations mean for your digital wallet.',
    category: 'Crypto',
    date: 'July 15, 2026',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=1200'
  }
];

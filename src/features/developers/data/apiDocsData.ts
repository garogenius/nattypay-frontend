export interface DocCodeExample {
  language: string;
  code: string;
}

export interface DocSection {
  heading: string;
  body: string;
  codeExample?: DocCodeExample;
}

export interface DocPage {
  id: string;
  title: string;
  subtitle: string;
  sections: DocSection[];
}

export interface DocSidebarSection {
  title: string;
  items: DocPage[];
}

export const apiDocsData: DocSidebarSection[] = [
  {
    title: 'Get Started',
    items: [
      {
        id: 'introduction',
        title: 'Introduction',
        subtitle: 'Welcome to the NattyPay API documentation.',
        sections: [
          {
            heading: 'Overview',
            body: `The NattyPay API is organized around REST. Our API accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.\n\nYou can use the NattyPay API in test mode, which does not affect your live data or interact with banking networks. The API key you use to authenticate the request determines whether the request is in live mode or test mode.`,
          },
          {
            heading: 'Base URL',
            body: 'All API requests are made to the following base URL:',
            codeExample: {
              language: 'text',
              code: 'https://backend-api-production-e7f2.up.railway.app',
            },
          },
          {
            heading: 'Request Format',
            body: 'All POST and PUT requests must send a JSON body with the Content-Type header set to application/json.',
            codeExample: {
              language: 'bash',
              code: `curl --location 'https://backend-api-production-e7f2.up.railway.app/api/v1/...' \\
--header 'Content-Type: application/json' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{ ... }'`,
            },
          },
        ],
      },
      {
        id: 'quick-start',
        title: 'Quick Start',
        subtitle: 'Get up and running with NattyPay in minutes.',
        sections: [
          {
            heading: 'Step 1 — Get Your API Key',
            body: 'Log in to your NattyPay developer dashboard and navigate to Apps & Credentials. Copy your API key from the REST API apps section.',
          },
          {
            heading: 'Step 2 — Register a User',
            body: 'Make your first API call to register a new user on the platform.',
            codeExample: {
              language: 'bash',
              code: `curl --location 'https://backend-api-production-e7f2.up.railway.app/api/v1/auth/register-user' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "username": "johndoe",
  "fullName": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "SecurePass123",
  "dateOfBirth": "8-Mar-1996",
  "countryCode": "NGN",
  "accountType": "PERSONAL"
}'`,
            },
          },
          {
            heading: 'Step 3 — Initiate a Transfer',
            body: 'Once authenticated, you can initiate fund transfers between wallets.',
            codeExample: {
              language: 'bash',
              code: `curl --location 'https://backend-api-production-e7f2.up.railway.app/api/v1/wallet/initiate-transfer' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "recipientUsername": "janedoe",
  "amount": 500000,
  "currency": "NGN",
  "passcode": "123456",
  "narration": "Payment for services"
}'`,
            },
          },
        ],
      },
      {
        id: 'client',
        title: 'Client',
        subtitle: 'Configure and initialize the NattyPay API client.',
        sections: [
          {
            heading: 'JavaScript / Node.js',
            body: 'Install the NattyPay SDK using npm and initialize it with your API key.',
            codeExample: {
              language: 'bash',
              code: 'npm install nattypay-sdk',
            },
          },
          {
            heading: 'Initialize the Client',
            body: 'Import and initialize the client in your application.',
            codeExample: {
              language: 'javascript',
              code: `import NattyPay from 'nattypay-sdk';

const client = new NattyPay({
  apiKey: 'YOUR_API_KEY',
  environment: 'production', // or 'sandbox'
});`,
            },
          },
          {
            heading: 'Python',
            body: 'Install the Python SDK and configure your client.',
            codeExample: {
              language: 'bash',
              code: `pip install nattypay-python

# Initialize
from nattypay import NattyPay
client = NattyPay(api_key="YOUR_API_KEY")`,
            },
          },
        ],
      },
      {
        id: 'libraries',
        title: 'Libraries',
        subtitle: 'Official NattyPay SDK libraries for popular languages.',
        sections: [
          {
            heading: 'Available SDKs',
            body: 'NattyPay provides official client libraries to make integration simple across popular programming languages.',
          },
          {
            heading: 'JavaScript / Node.js',
            body: 'Full support for both browser and Node.js environments.',
            codeExample: { language: 'bash', code: 'npm install nattypay-sdk' },
          },
          {
            heading: 'Python',
            body: 'Compatible with Python 3.7+.',
            codeExample: { language: 'bash', code: 'pip install nattypay-python' },
          },
          {
            heading: 'PHP',
            body: 'Composer package for PHP 7.4+.',
            codeExample: { language: 'bash', code: 'composer require nattypay/nattypay-php' },
          },
          {
            heading: 'Ruby',
            body: 'Gem available for Ruby 2.7+.',
            codeExample: { language: 'bash', code: 'gem install nattypay' },
          },
          {
            heading: 'Go',
            body: 'Go module for Go 1.18+.',
            codeExample: { language: 'bash', code: 'go get github.com/nattypay/nattypay-go' },
          },
        ],
      },
    ],
  },
  {
    title: 'Guide',
    items: [
      {
        id: 'authentication',
        title: 'Authentication',
        subtitle: 'Secure your API requests using API keys and Bearer tokens.',
        sections: [
          {
            heading: 'API Key',
            body: 'All requests require an x-api-key header. You can find your API key in the developer dashboard under Apps & Credentials.',
            codeExample: {
              language: 'bash',
              code: `curl --location 'https://backend-api-production-e7f2.up.railway.app/api/v1/...' \\
--header 'x-api-key: YOUR_API_KEY'`,
            },
          },
          {
            heading: 'Bearer Token',
            body: 'After logging in, protected endpoints require a Bearer token passed in the Authorization header.',
            codeExample: {
              language: 'bash',
              code: `--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'`,
            },
          },
          {
            heading: 'Token Expiry',
            body: 'Access tokens expire after 24 hours. Use your refresh token to obtain a new access token without requiring the user to log in again.',
          },
        ],
      },
      {
        id: 'error-handling',
        title: 'Error Handling',
        subtitle: 'Understand and handle API errors gracefully.',
        sections: [
          {
            heading: 'HTTP Status Codes',
            body: `NattyPay uses standard HTTP response codes:\n\n• 200 — Success\n• 400 — Bad Request (invalid parameters)\n• 401 — Unauthorized (invalid or missing API key)\n• 403 — Forbidden (insufficient permissions)\n• 404 — Not Found\n• 422 — Unprocessable Entity (validation error)\n• 429 — Too Many Requests (rate limit exceeded)\n• 500 — Internal Server Error`,
          },
          {
            heading: 'Error Response Format',
            body: 'All error responses follow a consistent JSON structure:',
            codeExample: {
              language: 'json',
              code: `{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "email must be a valid email address"
    }
  ]
}`,
            },
          },
        ],
      },
      {
        id: 'response',
        title: 'Response',
        subtitle: 'All API responses follow a consistent JSON format.',
        sections: [
          {
            heading: 'Success Response',
            body: 'Successful responses include a message, the requested data, and a 200 statusCode.',
            codeExample: {
              language: 'json',
              code: `{
  "message": "Operation successful",
  "data": { ... },
  "statusCode": 200
}`,
            },
          },
          {
            heading: 'Pagination Response',
            body: 'List endpoints return paginated data with metadata.',
            codeExample: {
              language: 'json',
              code: `{
  "message": "Records fetched",
  "data": [ ... ],
  "meta": {
    "total": 100,
    "page": 1,
    "perPage": 20,
    "totalPages": 5
  },
  "statusCode": 200
}`,
            },
          },
        ],
      },
      {
        id: 'request',
        title: 'Request',
        subtitle: 'How to structure API requests correctly.',
        sections: [
          {
            heading: 'Headers',
            body: 'Every request must include the following headers:',
            codeExample: {
              language: 'bash',
              code: `--header 'Content-Type: application/json'
--header 'x-api-key: YOUR_API_KEY'
--header 'authorization: Bearer YOUR_TOKEN'  # for protected routes`,
            },
          },
          {
            heading: 'Request Body',
            body: 'POST and PUT requests must send a JSON-encoded body.',
            codeExample: {
              language: 'json',
              code: `{
  "key": "value",
  "amount": 50000,
  "currency": "NGN"
}`,
            },
          },
        ],
      },
      {
        id: 'pagination',
        title: 'Pagination',
        subtitle: 'Navigate large datasets using cursor-based pagination.',
        sections: [
          {
            heading: 'Query Parameters',
            body: 'Use the page and perPage query parameters to paginate list results.',
            codeExample: {
              language: 'bash',
              code: `curl --location 'https://backend-api-production-e7f2.up.railway.app/api/v1/transactions?page=2&perPage=20' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY'`,
            },
          },
          {
            heading: 'Response Meta',
            body: 'The response includes a meta object with pagination info.',
            codeExample: {
              language: 'json',
              code: `"meta": {
  "total": 250,
  "page": 2,
  "perPage": 20,
  "totalPages": 13
}`,
            },
          },
        ],
      },
      {
        id: 'webhook',
        title: 'Webhook',
        subtitle: 'Receive real-time event notifications via webhooks.',
        sections: [
          {
            heading: 'Overview',
            body: 'Webhooks allow NattyPay to push real-time notifications to your server when events occur, such as successful payments or transfers.',
          },
          {
            heading: 'Setting Up a Webhook',
            body: 'Register your webhook URL in the developer dashboard. NattyPay will send a POST request to your URL when events occur.',
          },
          {
            heading: 'Webhook Payload',
            body: 'Each webhook event includes an event type and the relevant data.',
            codeExample: {
              language: 'json',
              code: `{
  "event": "transfer.success",
  "data": {
    "ref": "TXN-20240115-TRF-001",
    "amount": 500000,
    "currency": "NGN",
    "status": "success",
    "timestamp": "2024-01-15T20:30:00.000Z"
  }
}`,
            },
          },
          {
            heading: 'Verifying Webhooks',
            body: 'Validate the webhook signature using your secret key to ensure requests are from NattyPay.',
            codeExample: {
              language: 'javascript',
              code: `const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hash = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  return hash === signature;
}`,
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Core Resources',
    items: [
      {
        id: 'payment',
        title: 'Payment',
        subtitle: 'Process and manage payments using the NattyPay API.',
        sections: [
          {
            heading: 'Overview',
            body: 'The Payment resource allows you to initiate, track, and manage payment transactions. Payments support multiple currencies including NGN, USD, GBP, EUR, and GHS.',
          },
          {
            heading: 'Initiate Payment',
            body: 'Create a new payment transaction.',
            codeExample: {
              language: 'bash',
              code: `curl --location 'https://backend-api-production-e7f2.up.railway.app/api/v1/payment/initiate' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "amount": 500000,
  "currency": "NGN",
  "reference": "PAY-REF-001",
  "description": "Payment for order #001"
}'`,
            },
          },
        ],
      },
      {
        id: 'overview',
        title: 'Overview',
        subtitle: 'A high-level view of NattyPay core resources.',
        sections: [
          {
            heading: 'Core Resources',
            body: `NattyPay's core resources include:\n\n• Payment — Process and track financial transactions\n• Accept Payment — Generate payment links and checkout flows\n• Subscription — Manage recurring billing plans\n• Payout — Disburse funds to bank accounts\n• Refund — Reverse completed transactions\n• Split Payment — Distribute payments among multiple recipients\n• Transaction Search — Query and filter transaction history\n• Orders — Manage purchase orders\n• Invoicing — Generate and send invoices`,
          },
        ],
      },
      {
        id: 'accept-payment',
        title: 'Accept Payment',
        subtitle: 'Generate payment links and hosted checkout pages.',
        sections: [
          {
            heading: 'Create Payment Link',
            body: 'Generate a secure payment link to share with your customers.',
            codeExample: {
              language: 'bash',
              code: `curl --location 'https://backend-api-production-e7f2.up.railway.app/api/v1/payment/create-link' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "amount": 250000,
  "currency": "NGN",
  "title": "Product Purchase",
  "description": "Payment for Blue Sneakers",
  "expiresAt": "2024-12-31T23:59:59Z"
}'`,
            },
          },
          {
            heading: 'Response',
            body: 'The API returns a unique payment URL that customers can use to complete payment.',
            codeExample: {
              language: 'json',
              code: `{
  "message": "Payment link created",
  "data": {
    "id": "lnk-abc123",
    "url": "https://pay.nattypay.com/checkout/lnk-abc123",
    "amount": 250000,
    "currency": "NGN",
    "status": "active"
  },
  "statusCode": 200
}`,
            },
          },
        ],
      },
      {
        id: 'subscription',
        title: 'Subscription',
        subtitle: 'Create and manage recurring payment plans.',
        sections: [
          {
            heading: 'Overview',
            body: 'Subscriptions let you charge customers on a recurring schedule — daily, weekly, monthly, or annually.',
          },
          {
            heading: 'Create a Plan',
            body: 'First, create a subscription plan that defines the billing cycle and amount.',
            codeExample: {
              language: 'bash',
              code: `curl --location 'https://backend-api-production-e7f2.up.railway.app/api/v1/subscription/plan' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "name": "Pro Monthly",
  "amount": 500000,
  "currency": "NGN",
  "interval": "monthly"
}'`,
            },
          },
        ],
      },
      {
        id: 'payout',
        title: 'Payout',
        subtitle: 'Disburse funds to bank accounts and wallets.',
        sections: [
          {
            heading: 'Overview',
            body: 'The Payout resource enables you to send funds from your NattyPay balance to bank accounts or other wallets.',
          },
          {
            heading: 'Initiate Payout',
            body: 'Send funds to a bank account.',
            codeExample: {
              language: 'bash',
              code: `curl --location 'https://backend-api-production-e7f2.up.railway.app/api/v1/payout/initiate' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "accountNumber": "0123456789",
  "bankCode": "058",
  "amount": 100000,
  "currency": "NGN",
  "narration": "Vendor payout"
}'`,
            },
          },
        ],
      },
      {
        id: 'refund',
        title: 'Refund',
        subtitle: 'Reverse a completed transaction and return funds.',
        sections: [
          {
            heading: 'Overview',
            body: 'Refunds allow you to return funds for a completed transaction. Partial and full refunds are supported.',
          },
          {
            heading: 'Create a Refund',
            body: 'Initiate a refund by providing the transaction reference.',
            codeExample: {
              language: 'bash',
              code: `curl --location 'https://backend-api-production-e7f2.up.railway.app/api/v1/refund' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "transactionRef": "TXN-20240115-001",
  "amount": 250000,
  "reason": "Customer returned item"
}'`,
            },
          },
        ],
      },
      {
        id: 'split-payment',
        title: 'Split Payment',
        subtitle: 'Distribute a single payment among multiple recipients.',
        sections: [
          {
            heading: 'Overview',
            body: 'Split payments let you automatically distribute incoming funds among multiple wallet accounts at the time of transaction.',
          },
          {
            heading: 'Create Split Payment',
            body: 'Define recipients and their share of the payment.',
            codeExample: {
              language: 'bash',
              code: `curl --location 'https://backend-api-production-e7f2.up.railway.app/api/v1/payment/split' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "totalAmount": 1000000,
  "currency": "NGN",
  "splits": [
    { "username": "vendor_a", "amount": 600000 },
    { "username": "vendor_b", "amount": 400000 }
  ]
}'`,
            },
          },
        ],
      },
      {
        id: 'transaction-search',
        title: 'Transaction Search',
        subtitle: 'Query and filter your transaction history.',
        sections: [
          {
            heading: 'Search Transactions',
            body: 'Filter transactions by date, status, type, or amount.',
            codeExample: {
              language: 'bash',
              code: `curl --location 'https://backend-api-production-e7f2.up.railway.app/api/v1/transactions?status=success&currency=NGN&from=2024-01-01&to=2024-01-31&page=1&perPage=20' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY'`,
            },
          },
          {
            heading: 'Filter Parameters',
            body: `Available query parameters:\n\n• status — success | pending | failed\n• currency — NGN | USD | GBP | EUR | GHS\n• from — Start date (YYYY-MM-DD)\n• to — End date (YYYY-MM-DD)\n• type — transfer | payment | refund | payout\n• page — Page number (default: 1)\n• perPage — Results per page (default: 20)`,
          },
        ],
      },
      {
        id: 'orders',
        title: 'Orders',
        subtitle: 'Create and manage purchase orders.',
        sections: [
          {
            heading: 'Overview',
            body: 'Orders allow merchants to create structured purchase requests that customers can pay for using NattyPay.',
          },
          {
            heading: 'Create an Order',
            body: 'Create a new order with line items.',
            codeExample: {
              language: 'bash',
              code: `curl --location 'https://backend-api-production-e7f2.up.railway.app/api/v1/orders' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "items": [
    { "name": "Blue Sneakers", "quantity": 1, "price": 250000 },
    { "name": "White T-Shirt", "quantity": 2, "price": 50000 }
  ],
  "currency": "NGN",
  "customerEmail": "customer@email.com"
}'`,
            },
          },
        ],
      },
      {
        id: 'invoicing',
        title: 'Invoicing',
        subtitle: 'Generate and send professional invoices to clients.',
        sections: [
          {
            heading: 'Overview',
            body: 'The Invoicing resource lets you create, send, and track invoices. Customers receive a payment link to settle invoices directly.',
          },
          {
            heading: 'Create an Invoice',
            body: 'Generate a new invoice with line items and due date.',
            codeExample: {
              language: 'bash',
              code: `curl --location 'https://backend-api-production-e7f2.up.railway.app/api/v1/invoices' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "customerName": "Acme Corp",
  "customerEmail": "billing@acmecorp.com",
  "dueDate": "2024-02-15",
  "currency": "NGN",
  "items": [
    { "description": "Web Development", "quantity": 1, "unitPrice": 2000000 },
    { "description": "Hosting (12 months)", "quantity": 1, "unitPrice": 300000 }
  ]
}'`,
            },
          },
          {
            heading: 'Invoice Response',
            body: 'The created invoice includes a shareable payment link.',
            codeExample: {
              language: 'json',
              code: `{
  "message": "Invoice created successfully",
  "data": {
    "id": "inv-xyz789",
    "invoiceNumber": "INV-2024-001",
    "total": 2300000,
    "currency": "NGN",
    "status": "pending",
    "paymentUrl": "https://pay.nattypay.com/invoice/inv-xyz789",
    "dueDate": "2024-02-15"
  },
  "statusCode": 200
}`,
            },
          },
        ],
      },
    ],
  },
];

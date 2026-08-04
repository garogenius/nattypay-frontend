const BASE_URL = 'https://backend-api-production-e7f2.up.railway.app';

export interface ApiParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface ApiEndpoint {
  id: string;
  title: string;
  description: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  headers: ApiParam[];
  bodyParams?: ApiParam[];
  queryParams?: ApiParam[];
  curlExample: string;
  sampleResponse: string;
}

export interface SidebarSection {
  title: string;
  items: ApiEndpoint[];
}

export const apiReferencesData: SidebarSection[] = [
  {
    title: 'Auth',
    items: [
      {
        id: 'register-user',
        title: 'Register User',
        description: 'Register a new user on the NattyPay platform.',
        method: 'POST',
        endpoint: '/api/v1/auth/register-user',
        headers: [
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        bodyParams: [
          { name: 'username', type: 'string', required: true, description: 'Unique username for the user.' },
          { name: 'fullName', type: 'string', required: true, description: 'Full legal name of the user.' },
          { name: 'email', type: 'string', required: true, description: 'Valid email address.' },
          { name: 'password', type: 'string', required: true, description: 'Secure password (min 8 chars).' },
          { name: 'dateOfBirth', type: 'string', required: true, description: 'Date of birth e.g. 8-Mar-1996.' },
          { name: 'countryCode', type: 'string', required: true, description: 'Currency country code e.g. NGN.' },
          { name: 'accountType', type: 'string', required: true, description: 'PERSONAL or BUSINESS.' },
          { name: 'referralCode', type: 'string', required: false, description: 'Optional referral code.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/auth/register-user' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "username": "johndoe",
  "fullName": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "SecurePass123",
  "dateOfBirth": "8-Mar-1996",
  "countryCode": "NGN",
  "accountType": "PERSONAL",
  "referralCode": ""
}'`,
        sampleResponse: `{
  "message": "user created successfully",
  "user": {
    "id": "4c8c3a7e-68a8-4c3c-8956-d73117ae4f41",
    "email": "johndoe@gmail.com",
    "username": "johndoe",
    "fullName": "John Doe",
    "createdAt": "2024-01-15T20:16:55.374Z",
    "status": "active",
    "accountType": "PERSONAL"
  },
  "statusCode": 200
}`,
      },
    ],
  },
  {
    title: 'User',
    items: [
      {
        id: 'verify-phone',
        title: 'Verify Phone Number',
        description: 'Verify a user\'s phone number via OTP.',
        method: 'POST',
        endpoint: '/api/v1/user/verify-phone',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        bodyParams: [
          { name: 'phoneNumber', type: 'string', required: true, description: 'Phone number to verify e.g. +2348012345678.' },
          { name: 'otp', type: 'string', required: true, description: 'OTP sent to the phone number.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/user/verify-phone' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "phoneNumber": "+2348012345678",
  "otp": "123456"
}'`,
        sampleResponse: `{
  "message": "Phone number verified successfully",
  "statusCode": 200
}`,
      },
      {
        id: 'verify-nin',
        title: 'Verify NIN',
        description: 'Verify a user\'s National Identification Number (NIN).',
        method: 'POST',
        endpoint: '/api/v1/user/verify-nin',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        bodyParams: [
          { name: 'nin', type: 'string', required: true, description: '11-digit NIN number.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/user/verify-nin' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "nin": "12345678901"
}'`,
        sampleResponse: `{
  "message": "NIN verified successfully",
  "data": {
    "nin": "12345678901",
    "verified": true
  },
  "statusCode": 200
}`,
      },
      {
        id: 'report-scam',
        title: 'Report Scam',
        description: 'Report a suspicious or fraudulent transaction.',
        method: 'POST',
        endpoint: '/api/v1/user/report-scam',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        bodyParams: [
          { name: 'suspectUsername', type: 'string', required: true, description: 'Username of the suspected scammer.' },
          { name: 'transactionRef', type: 'string', required: true, description: 'Reference ID of the transaction.' },
          { name: 'description', type: 'string', required: true, description: 'Description of the scam incident.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/user/report-scam' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "suspectUsername": "badactor123",
  "transactionRef": "TXN-20240115-001",
  "description": "Sent money but item not delivered"
}'`,
        sampleResponse: `{
  "message": "Scam report submitted successfully",
  "reportId": "RPT-7f3a2b1c",
  "statusCode": 200
}`,
      },
      {
        id: 'create-business-account',
        title: 'Create Business Account',
        description: 'Upgrade a user account to a business account.',
        method: 'POST',
        endpoint: '/api/v1/user/create-business',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        bodyParams: [
          { name: 'businessName', type: 'string', required: true, description: 'Registered business name.' },
          { name: 'registrationNumber', type: 'string', required: true, description: 'CAC registration number.' },
          { name: 'businessType', type: 'string', required: true, description: 'Type of business e.g. LLC, Sole Proprietorship.' },
          { name: 'address', type: 'string', required: true, description: 'Business address.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/user/create-business' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "businessName": "Acme Corp",
  "registrationNumber": "RC-134555",
  "businessType": "LLC",
  "address": "123 Business Street, Lagos"
}'`,
        sampleResponse: `{
  "message": "Business account created successfully",
  "business": {
    "id": "biz-9a1b2c3d",
    "businessName": "Acme Corp",
    "status": "pending_verification"
  },
  "statusCode": 200
}`,
      },
      {
        id: 'change-passcode',
        title: 'Change Passcode',
        description: 'Change the transaction passcode for a user account.',
        method: 'PUT',
        endpoint: '/api/v1/user/change-passcode',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        bodyParams: [
          { name: 'oldPasscode', type: 'string', required: true, description: 'Current 6-digit passcode.' },
          { name: 'newPasscode', type: 'string', required: true, description: 'New 6-digit passcode.' },
          { name: 'confirmPasscode', type: 'string', required: true, description: 'Confirm new passcode.' },
        ],
        curlExample: `curl --location --request PUT '${BASE_URL}/api/v1/user/change-passcode' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "oldPasscode": "123456",
  "newPasscode": "654321",
  "confirmPasscode": "654321"
}'`,
        sampleResponse: `{
  "message": "Passcode changed successfully",
  "statusCode": 200
}`,
      },
      {
        id: 'create-foreign-account',
        title: 'Create Foreign Account',
        description: 'Create a foreign currency wallet account for the user.',
        method: 'POST',
        endpoint: '/api/v1/user/create-foreign-account',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        bodyParams: [
          { name: 'currency', type: 'string', required: true, description: 'Currency code e.g. USD, GBP, EUR.' },
          { name: 'passcode', type: 'string', required: true, description: 'User transaction passcode.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/user/create-foreign-account' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "currency": "USD",
  "passcode": "123456"
}'`,
        sampleResponse: `{
  "message": "Foreign account created successfully",
  "account": {
    "id": "acc-5f6e7d8c",
    "currency": "USD",
    "accountNumber": "USD-00123456",
    "balance": 0.00
  },
  "statusCode": 200
}`,
      },
    ],
  },
  {
    title: 'Bill',
    items: [
      {
        id: 'get-airtime-variation',
        title: 'Get Airtime Variation',
        description: 'Retrieve available airtime top-up variations for all networks.',
        method: 'GET',
        endpoint: '/api/v1/bill/airtime-variation',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/bill/airtime-variation' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY'`,
        sampleResponse: `{
  "message": "Airtime variations fetched successfully",
  "data": [
    { "network": "MTN", "code": "mtn" },
    { "network": "Airtel", "code": "airtel" },
    { "network": "Glo", "code": "glo" },
    { "network": "9mobile", "code": "etisalat" }
  ],
  "statusCode": 200
}`,
      },
      {
        id: 'get-airtime-plan',
        title: 'Get Airtime Plan',
        description: 'Get specific airtime plans for a given network.',
        method: 'GET',
        endpoint: '/api/v1/bill/airtime-plan',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        queryParams: [
          { name: 'network', type: 'string', required: true, description: 'Network code e.g. mtn, airtel.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/bill/airtime-plan?network=mtn' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY'`,
        sampleResponse: `{
  "message": "Airtime plans fetched successfully",
  "data": [
    { "amount": 100, "description": "MTN N100 Airtime" },
    { "amount": 200, "description": "MTN N200 Airtime" },
    { "amount": 500, "description": "MTN N500 Airtime" }
  ],
  "statusCode": 200
}`,
      },
      {
        id: 'pay-school-fee',
        title: 'Pay for School Fee',
        description: 'Process a school fee payment for a student.',
        method: 'POST',
        endpoint: '/api/v1/bill/school-fee',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        bodyParams: [
          { name: 'schoolCode', type: 'string', required: true, description: 'Unique school identifier code.' },
          { name: 'studentId', type: 'string', required: true, description: 'Student ID or matric number.' },
          { name: 'amount', type: 'number', required: true, description: 'Amount to pay in kobo.' },
          { name: 'passcode', type: 'string', required: true, description: 'User transaction passcode.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/bill/school-fee' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "schoolCode": "UNILAG",
  "studentId": "190404001",
  "amount": 150000,
  "passcode": "123456"
}'`,
        sampleResponse: `{
  "message": "School fee payment successful",
  "transaction": {
    "ref": "TXN-20240115-SCH-001",
    "amount": 150000,
    "status": "success"
  },
  "statusCode": 200
}`,
      },
      {
        id: 'get-data-plans',
        title: 'Get Data Plans',
        description: 'Retrieve all available data plans for a network.',
        method: 'GET',
        endpoint: '/api/v1/bill/data-plans',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        queryParams: [
          { name: 'network', type: 'string', required: true, description: 'Network code e.g. mtn, airtel, glo.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/bill/data-plans?network=mtn' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY'`,
        sampleResponse: `{
  "message": "Data plans fetched successfully",
  "data": [
    { "id": "mtn-1gb", "name": "1GB", "amount": 300, "validity": "30 days" },
    { "id": "mtn-2gb", "name": "2GB", "amount": 500, "validity": "30 days" },
    { "id": "mtn-5gb", "name": "5GB", "amount": 1000, "validity": "30 days" }
  ],
  "statusCode": 200
}`,
      },
      {
        id: 'buy-data',
        title: 'Buy Data',
        description: 'Purchase a data bundle for a phone number.',
        method: 'POST',
        endpoint: '/api/v1/bill/buy-data',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        bodyParams: [
          { name: 'network', type: 'string', required: true, description: 'Network code e.g. mtn, airtel.' },
          { name: 'planId', type: 'string', required: true, description: 'Data plan ID from Get Data Plans.' },
          { name: 'phoneNumber', type: 'string', required: true, description: 'Recipient phone number.' },
          { name: 'passcode', type: 'string', required: true, description: 'User transaction passcode.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/bill/buy-data' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "network": "mtn",
  "planId": "mtn-2gb",
  "phoneNumber": "+2348012345678",
  "passcode": "123456"
}'`,
        sampleResponse: `{
  "message": "Data purchase successful",
  "transaction": {
    "ref": "TXN-20240115-DATA-001",
    "network": "mtn",
    "plan": "2GB - 30 days",
    "phoneNumber": "+2348012345678",
    "status": "success"
  },
  "statusCode": 200
}`,
      },
    ],
  },
  {
    title: 'Wallet',
    items: [
      {
        id: 'set-wallet',
        title: 'Set Wallet',
        description: 'Initialize or configure a wallet for a user.',
        method: 'POST',
        endpoint: '/api/v1/wallet/set',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        bodyParams: [
          { name: 'currency', type: 'string', required: true, description: 'Wallet currency code e.g. NGN.' },
          { name: 'passcode', type: 'string', required: true, description: '6-digit transaction passcode.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/wallet/set' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "currency": "NGN",
  "passcode": "123456"
}'`,
        sampleResponse: `{
  "message": "Wallet set up successfully",
  "wallet": {
    "id": "wal-1a2b3c4d",
    "currency": "NGN",
    "balance": 0.00,
    "accountNumber": "NGN-00987654"
  },
  "statusCode": 200
}`,
      },
      {
        id: 'change-wallet-pin',
        title: 'Get Change Wallet Pin',
        description: 'Change the PIN associated with a user wallet.',
        method: 'PUT',
        endpoint: '/api/v1/wallet/change-pin',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        bodyParams: [
          { name: 'oldPin', type: 'string', required: true, description: 'Current 6-digit wallet PIN.' },
          { name: 'newPin', type: 'string', required: true, description: 'New 6-digit wallet PIN.' },
          { name: 'confirmPin', type: 'string', required: true, description: 'Confirm new PIN.' },
        ],
        curlExample: `curl --location --request PUT '${BASE_URL}/api/v1/wallet/change-pin' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "oldPin": "123456",
  "newPin": "654321",
  "confirmPin": "654321"
}'`,
        sampleResponse: `{
  "message": "Wallet PIN changed successfully",
  "statusCode": 200
}`,
      },
      {
        id: 'decode-qr',
        title: 'Decode QR Code',
        description: 'Decode a NattyPay QR code to extract wallet information.',
        method: 'POST',
        endpoint: '/api/v1/wallet/decode-qr',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        bodyParams: [
          { name: 'qrData', type: 'string', required: true, description: 'Base64 encoded QR code string.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/wallet/decode-qr' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "qrData": "BASE64_QR_STRING_HERE"
}'`,
        sampleResponse: `{
  "message": "QR code decoded successfully",
  "data": {
    "username": "johndoe",
    "accountNumber": "NGN-00987654",
    "currency": "NGN"
  },
  "statusCode": 200
}`,
      },
      {
        id: 'generate-qr',
        title: 'Generate QR Code',
        description: 'Generate a QR code for receiving payments.',
        method: 'POST',
        endpoint: '/api/v1/wallet/generate-qr',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        bodyParams: [
          { name: 'amount', type: 'number', required: false, description: 'Optional fixed amount in kobo.' },
          { name: 'currency', type: 'string', required: true, description: 'Currency code e.g. NGN.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/wallet/generate-qr' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "amount": 50000,
  "currency": "NGN"
}'`,
        sampleResponse: `{
  "message": "QR code generated successfully",
  "data": {
    "qrCode": "BASE64_QR_IMAGE_DATA",
    "expiresAt": "2024-01-15T21:00:00.000Z"
  },
  "statusCode": 200
}`,
      },
      {
        id: 'initiate-transfer',
        title: 'Initiate Transfer',
        description: 'Initiate a funds transfer between wallets or to a bank account.',
        method: 'POST',
        endpoint: '/api/v1/wallet/initiate-transfer',
        headers: [
          { name: 'authorization', type: 'Bearer Token', required: true, description: 'Set to Bearer <token>.' },
          { name: 'x-api-key', type: 'string', required: true, description: 'Your NattyPay API key.' },
        ],
        bodyParams: [
          { name: 'recipientUsername', type: 'string', required: true, description: 'Recipient NattyPay username.' },
          { name: 'amount', type: 'number', required: true, description: 'Amount to transfer in kobo.' },
          { name: 'currency', type: 'string', required: true, description: 'Currency code e.g. NGN.' },
          { name: 'passcode', type: 'string', required: true, description: '6-digit transaction passcode.' },
          { name: 'narration', type: 'string', required: false, description: 'Optional transfer note.' },
        ],
        curlExample: `curl --location '${BASE_URL}/api/v1/wallet/initiate-transfer' \\
--header 'authorization: Bearer YOUR_TOKEN' \\
--header 'x-api-key: YOUR_API_KEY' \\
--data-raw '{
  "recipientUsername": "janedoe",
  "amount": 500000,
  "currency": "NGN",
  "passcode": "123456",
  "narration": "Payment for services"
}'`,
        sampleResponse: `{
  "message": "Transfer initiated successfully",
  "transaction": {
    "ref": "TXN-20240115-TRF-001",
    "amount": 500000,
    "currency": "NGN",
    "recipient": "janedoe",
    "status": "success",
    "timestamp": "2024-01-15T20:30:00.000Z"
  },
  "statusCode": 200
}`,
      },
    ],
  },
];

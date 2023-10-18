const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
require('dotenv').config(); 
 const app = express();

// Import the Prisma client
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'minimal',
});

// Replace with your Monnify client secret
const DEFAULT_MERCHANT_CLIENT_SECRET = '4SY6TNL8CK3VPRSBTHTRG2N8XXEGC6NL';

// Middleware for parsing JSON
app.use(bodyParser.json());


// Verify the authenticity of the incoming webhook by comparing the computed hash with 'monnify-signature'
function verifyWebhookSignature(requestBody, signature) {
    const computedHash = crypto.createHmac('sha512', DEFAULT_MERCHANT_CLIENT_SECRET)
        .update(requestBody)
        .digest('hex');

    return computedHash === signature;
}

// Handle incoming Monnify webhook events
app.post('/webhook', async (req, res) => {
    const requestBody = JSON.stringify(req.body);
    const signature = req.header('monnify-signature');

    if (verifyWebhookSignature(requestBody, signature)) {
        // Signature is valid, process the webhook payload.
        const eventData = req.body.eventData;
        const transactionReference = eventData.transactionReference;  
        const amount = eventData.amountPaid
        
        console.log('Received webhook event:', eventData);
        // Your logic here...

        // Check to see if you've processed this webhook before using the reference to prevent double credit
	const isDuplicate = await checkDuplicateTransaction(transactionReference);
	if (isDuplicate) {
	  console.log('Duplicate transaction found');
	  return res.status(200).send('Duplicate transaction found');
	}

	createTransaction(transactionReference, amount, 'pending');

 
        giveCustomerValue(transactionReference); // Corrected function name
        

        res.status(200).send('Webhook processed successfully');
    } else {
        // Signature is not valid; do not trust the webhook.
        res.status(400).send('Invalid signature');
    }
});

function giveCustomerValue(transactionReference) {
    // Here you can give value to your customer, e.g., update balance, send SMS, update transaction table, etc.
    console.log('Provided Value to Customer for Transaction Reference:', transactionReference);
}

 



async function createTransaction(transactionReference, amount, status) {
  return prisma.transaction.create({
    data: {
      transactionReference,
      amount,
      status,
    },
  });
}

async function checkDuplicateTransaction(transactionReference) {
  const existingTransaction = await prisma.transaction.findUnique({
    where: { transactionReference },
  });
  return !!existingTransaction;
}



// Start the server
const port = 3000; // Change this to the desired port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

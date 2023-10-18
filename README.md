# Monnify Sample Webhook Node.js

This repository contains a Node.js application to handle Monnify webhook events. It is part of a larger payment processing system that includes a Monnify WebSDK UI and a PHP alternative repository.

- [SampleStore using WebSDK Monnify Repository](https://github.com/monnify/samplestore-using-websdk-monnify)
- [Monnify PHP Alternative Repository](https://github.com/monnify/monnify-php-sample-webhook-php)

## Prerequisites

Before you begin, make sure you have the following:

- Node.js installed on your system
- Your Monnify client secret key
- Knowledge of how Monnify webhooks work (refer to [Monnify Documentation](https://developers.monnify.com/api/#webhooks))

 
## Install Dependencies

Before you can run this project, you need to install its dependencies. We recommend using Node.js and npm for JavaScript projects.

### Prerequisites

Before you get started, make sure you have the following software installed on your system:

- **Node.js:** If you don't have Node.js installed, you can download it from [nodejs.org](https://nodejs.org/).

### Installing Dependencies

1. **Clone the Repository:** Start by cloning this repository to your local machine. Open your terminal or command prompt and run the following command:

```bash
git clone https://github.com/monnify/monnify-sample-webhook-nodejs.git

```

2. **Navigate to the Project Directory:** Change your working directory to the project folder:
```bash
    cd monnify-sample-webhook-nodejs
```

Configure your Monnify client secret in src/server.js:

```bash
const DEFAULT_MERCHANT_CLIENT_SECRET = 'your-client-secret';

```

3. **Install Node.js Dependencies:** To install the project's Node.js dependencies, run the following command:


```bash
npm install 
```
4. **Configure Environment Variables:** If your project uses environment variables, make sure to set them up. Refer to the project documentation for details on which environment variables you need to configure.

5. **Start the Project:** Once the dependencies are installed, run migration then you can start the project using the following command:

```bash
npm install -g prisma
npx prisma generate

npx prisma migrate dev --name initial-migration

npm start

```
## Usage
This Node.js application provides an endpoint for receiving Monnify webhook events. Webhooks are sent to `/webhook` on your server.

Make sure to link this webhook handler to your Monnify account and specify the correct webhook URL in your Monnify settings.

### Sample Webhook Structure
A typical Monnify webhook event structure:
```json
{
    "eventType": "type_of_event",
    "eventData": {
        "prop1": "value1",
        "prop2": "value2"
    }
}

```



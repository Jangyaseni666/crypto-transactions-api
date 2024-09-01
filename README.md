# [Crypto Transactions API](https://crypto-transactions-api-p0jr.onrender.com/transactions/0xce94e5621a5f7068253c42558c147480f38b5e0d)

This is a Node.js API that allows users to fetch Ethereum transactions, calculate their total expenses, and retrieve the current price of Ethereum. The project uses MongoDB for storing transaction data and Ethereum prices.

## Features

- **Fetch Transactions**: Retrieve a list of Ethereum transactions for a given address.
- **Calculate Expenses**: Calculate total expenses for an address based on gas used in transactions.
- **Fetch Ethereum Price**: Fetch the current price of Ethereum from CoinGecko API and store it in the database every 10 minutes.
- **Get Total Expenses and Ethereum Price**: Provide a `GET` API to return the total expenses for a user and the current Ethereum price.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or Cloud)
- An Etherscan API Key

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Jangyaseni666/crypto-transactions-api.git
cd crypto-transactions-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```bash
MONGODB_URI=your-mongodb-uri
ETHERSCAN_API_KEY=your-etherscan-api-key
PORT=your-desired-port
```

### 4. Start the Server

```bash
npm start
```

The server will start at `http://localhost:${PORT}`.
However, you can also use it on this website if you don't want to build the project: `https://crypto-transactions-api-p0jr.onrender.com`

## API Endpoints

### 1. Fetch Transactions

**GET /transactions/:address**

Fetch a list of Ethereum transactions for the given address and store them in the database.

- **URL**: `/transactions/:address`
- **Method**: `GET`
- **URL Params**: `:address=[string]` (Ethereum address)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: `{ status:"1", message:"OK", transactions: [...] }`
- **Error Response**:
  - **Code**: `500 INTERNAL SERVER ERROR`
  - **Content**: `{ error: "Server Error" }`

### 2. Get Total Expenses and Current Ethereum Price

**GET /expenses/:address**

Calculate the total expenses for a user and return the current Ethereum price.

- **URL**: `/expenses/:address`
- **Method**: `GET`
- **URL Params**: `:address=[string]` (Ethereum address)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: `{ totalExpenses: "0.123456", ethereumPrice: 3000 }`
- **Error Response**:
  - **Code**: `500 INTERNAL SERVER ERROR`
  - **Content**: `{ error: "Server Error" }`

## Project Structure

```bash
├── controllers
│   ├── transactionController.js
│   └── expensesController.js
├── models
│   ├── transactionModel.js
│   └── ethereumPriceModel.js
├── services
│   └── ethereumPriceService.js
├── App.js
└── .env
```

- **`controllers/transactionController.js`**: Handles requests related to fetching transactions.
- **`controllers/expensesController.js`**: Handles requests related to calculating expenses and getting the latest ethereum price.
- **`models/transactionModel.js`**: Mongoose model for storing Ethereum transactions.
- **`models/ethereumPriceModel.js`**: Mongoose model for storing Ethereum price data.
- **`services/ethereumPriceService.js`**: Service for fetching the current Ethereum price and saving it to the database.
- **`App.js`**: Main server file that sets up the API routes and starts the application.

## How It Works

- The API fetches Ethereum transactions from the Etherscan API based on the user's address.
- The transactions are stored in MongoDB under the `Transaction` model.
- Every 10 minutes, the server fetches the current Ethereum price from the CoinGecko API and stores it in MongoDB under the `EthPrice` model.
- The `/expenses/:address` endpoint calculates the total expenses for the user by summing up `gasUsed * gasPrice / 1e18` for all transactions associated with the address and returns the total along with the current Ethereum price.

## Dependencies

- **axios**: For making HTTP requests to external APIs.
- **express**: Web framework for Node.js.
- **mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment.
- **dotenv**: For loading environment variables from a `.env` file.


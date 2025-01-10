# Cryptocurrency Stats Tracker

A Node.js-based application deployed on Render that tracks the price, market capitalization, and 24-hour price change of three cryptocurrencies: Bitcoin, Matic, and Ethereum. The app features scheduled background jobs to fetch data, a MongoDB database for storage, and APIs to retrieve the latest stats and calculate price deviations.

---

  ## Deployment

  The application is live at: [https://coinx-m73z.onrender.com](https://coinx-m73z.onrender.com).

  ### For Deployment, We Used:
  - **Render**: For hosting the application.
  - **MongoDB Atlas**: For database storage.
  - **Node.js**: For backend logic.

  ---

  ## Technologies Used
  - **Node.js**: Backend framework.
  - **Express**: Web framework for building APIs.
  - **MongoDB**: Database for storing cryptocurrency data.
  - **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
  - **Axios**: HTTP client for API calls.
  - **Node-Schedule**: Library for scheduling background jobs.

## Features

1. **Background Job**: Automatically fetches cryptocurrency data every 2 hours using the CoinGecko API.
2. **/stats API**: Retrieves the latest price, market cap, and 24-hour change of a specified cryptocurrency.
3. **/deviation API**: Calculates the standard deviation of the last 100 price records for a cryptocurrency.
4. **Database**: Data is stored in MongoDB Atlas for efficient querying and analysis.

---

## Demo

[Demo Video](https://youtu.be/ysCLmK_YYpg)


---

## API Endpoints

### 1. **/stats**
Retrieve the latest data for a specific cryptocurrency.

- **URL**: `https://coinx-m73z.onrender.com/api/stats`
- **Method**: `GET`
- **Query Parameters**:
  ```json
  {
    "coin": "bitcoin" // Options: 'bitcoin', 'matic-network', 'ethereum'
  }
### Sample Response
   ```json
  {
    "price": 94870,
    "marketCap": 1869976825588,
    "24hChange": 2.35091
  }
   ```


### 2. **/deviation**
Calculate the standard deviation of the last 100 price records for a cryptocurrency.

- **URL**: `https://coinx-m73z.onrender.com/api/deviation`
- **Method**: `GET`
- **Query Parameters**:
  ```json
  {
    "coin": "bitcoin" // Options: 'bitcoin', 'matic-network', 'ethereum'
  }
### Sample Response
  ```json
  {
      "deviation": "171.98"
  }
  ```
## How to Run Locally
  1. Clone the repository:
  ```bash
  git clone https://github.com/prahul25/coinX.git
  cd coinX
  ```
  2. Install dependencies:
  ```bash
  npm install
  ```
  3. Set up environment variables in a .env file:
  ```bash
  MONGO_URI=your-mongodb-uri
  PORT=your-port
  COINGECKO_API_URL=https://api.coingecko.com/api/v3
  ```
  4. Start the server:
  ```bash
    npm run dev
  ```


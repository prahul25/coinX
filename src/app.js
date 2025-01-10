const express = require("express");
const mongoose = require("mongoose");
const schedule = require("node-schedule");
const fetchCryptoData = require("./jobs/fetchCryptoData");
const apiRoutes = require("./routes/api");
require("dotenv").config();


const app = express();

// mongodb atlas connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });


app.use(express.json());


app.use("/api", apiRoutes);

// schedule background work to run on every 2 hr
schedule.scheduleJob("0 */2 * * *", async () => {
  console.log("Running background job to fetch cryptocurrency data...");
  await fetchCryptoData();
});

// Starting server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

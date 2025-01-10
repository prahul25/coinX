const express = require("express");
const CryptoData = require("../models/CryptoData");

const router = express.Router();

router.get("/stats", async (req, res) => {
  const { coin } = req.query;

  if (!coin)
    return res.status(400).json({ error: "Coin query param is required" });

  const latestData = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });

  if (!latestData)
    return res
      .status(404)
      .json({ error: "No data found for the requested coin" });

  res.json({
    price: latestData.price,
    marketCap: latestData.marketCap,
    "24hChange": latestData.change24h,
  });
});

router.get("/deviation", async (req, res) => {
  const { coin } = req.query;

  if (!coin)
    return res.status(400).json({ error: "Coin query param is required" });

  const records = await CryptoData.find({ coin })
    .sort({ timestamp: -1 })
    .limit(100);

  if (records.length < 2)
    return res
      .status(400)
      .json({ error: "Not enough data for deviation calculation" });

  const prices = records.map((record) => record.price);
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  const deviation = Math.sqrt(
    prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) /
      prices.length
  );

  res.json({ deviation: deviation.toFixed(2) });
});

module.exports = router;

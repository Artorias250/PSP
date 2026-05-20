const express = require("express");
const router = express.Router();
const stocksController = require("../controllers/stocksController");

router.get("/", stocksController.getAllStocks);
router.get("/:id", stocksController.getStockById);
router.post("/", stocksController.createStock);
router.put("/:id", stocksController.putStock);
router.patch("/:id", stocksController.updateStock);
router.delete("/:id", stocksController.deleteStock);

module.exports = router;

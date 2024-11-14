const express = require("express");
const Purchase = require("../model/purchaseModel");
const router = express.Router();

// Route to save a new purchase
router.post("/", async (req, res) => {
  const { userId, bookId } = req.body;
  console.log(userId);
  console.log(bookId);

  try {
    let purchase = await Purchase.findOne({ userId });
    if (purchase) {
      purchase.bookIds.push(bookId);
    } else {
      purchase = new Purchase({
        userId,
        bookIds: [bookId],
      });
    }

    await purchase.save();
    res.status(200).json({ message: "Purchase saved successfully" });
  } 
  catch (error) {
    console.error("Error saving purchase:", error);
    res.status(500).json({ message: "Failed to save purchase" });
  }
});

// Route to get all purchased books for a specific user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);

  try {
    console.log("Fetching purchases for user:", userId);
    const purchase = await Purchase.findOne({ userId }).populate('bookIds');
    console.log("Purchase found:", purchase);

    if (purchase && purchase.bookIds.length > 0) {
      res.status(200).json({ purchasedBooks: purchase.bookIds });
    } else {
      res.status(404).json({ message: "No purchases found for this user." });
    }
  } catch (error) {
    console.error("Error fetching purchased books:", error);
    res.status(500).json({ message: "Failed to fetch purchased books" });
  }
});

module.exports = router;

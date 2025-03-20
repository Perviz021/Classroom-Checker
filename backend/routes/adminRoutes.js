import express from "express";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token
  if (!token)
    return res.status(401).json({ error: "Access Denied. No token provided." });

  try {
    const verified = jwt.verify(token, "your_secret_key"); // Replace with your actual secret key
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

// Protect the admin route
router.get("/users", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;

import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// MySQL Connection
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ✅ Test Route
router.get("/test", (req, res) => {
  res.send("Classroom API is working!");
});

// ✅ Get all classrooms
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM classrooms");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// ✅ Get a single classroom by ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM classrooms WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Classroom not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

// ✅ Update classroom device statuses
router.put("/:id", async (req, res) => {
  const {
    mouse,
    keyboard,
    case_status,
    projector,
    vga_cable,
    speaker,
    operating_system,
    projector_display,
  } = req.body;

  try {
    await db.execute(
      `UPDATE classrooms SET 
        mouse=?, keyboard=?, case_status=?, projector=?, vga_cable=?, 
        speaker=?, operating_system=?, projector_display=?, checked_at=NOW() 
        WHERE id=?`,
      [
        mouse,
        keyboard,
        case_status,
        projector,
        vga_cable,
        speaker,
        operating_system,
        projector_display,
        req.params.id,
      ]
    );
    res.json({ message: "Classroom updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
});

export default router;

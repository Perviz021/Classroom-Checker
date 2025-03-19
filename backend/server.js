import express from "express";
import cors from "cors";
import db from "./config/db"; // ✅ Import the database connection
import adminRoutes from "./routes/adminRoutes.js"; // ✅ Import the admin routes
import classroomRoutes from "./routes/classrooms.js";

const app = express();
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();

apiRouter.use("/admin", adminRoutes);
apiRouter.use("/classrooms", classroomRoutes);

app.use("/api", apiRouter);

app.post("/classrooms", async (req, res) => {
  const {
    name,
    capacity,
    floor,
    mouse,
    keyboard,
    case_status,
    projector,
    vga_cable,
    speaker,
    operating_system,
    projector_display,
    status,
  } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO classrooms (name, capacity, floor, mouse, keyboard, case_status, projector, vga_cable, speaker, operating_system, projector_display, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        capacity,
        floor,
        mouse,
        keyboard,
        case_status,
        projector,
        vga_cable,
        speaker,
        operating_system,
        projector_display,
        status,
      ]
    );

    res
      .status(201)
      .json({ message: "Classroom added successfully", id: result.insertId });
  } catch (error) {
    console.error("Error inserting classroom:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/classrooms", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM classrooms");
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/classrooms/:id", async (req, res) => {
  const { id } = req.params;
  const {
    name,
    capacity,
    floor,
    mouse,
    keyboard,
    case_status,
    projector,
    vga_cable,
    speaker,
    operating_system,
    projector_display,
    status,
  } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE classrooms 
           SET name = ?, capacity = ?, floor = ?, mouse = ?, keyboard = ?, case_status = ?, 
               projector = ?, vga_cable = ?, speaker = ?, operating_system = ?, projector_display = ?, status = ? 
           WHERE id = ?`,
      [
        name,
        capacity,
        floor,
        mouse,
        keyboard,
        case_status,
        projector,
        vga_cable,
        speaker,
        operating_system,
        projector_display,
        status,
        id,
      ]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Classroom updated successfully" });
    } else {
      res.status(404).json({ error: "Classroom not found" });
    }
  } catch (error) {
    console.error("Error updating classroom:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/classrooms/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute("DELETE FROM classrooms WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows > 0) {
      res.json({ message: "Classroom deleted successfully" });
    } else {
      res.status(404).json({ error: "Classroom not found" });
    }
  } catch (error) {
    console.error("Error deleting classroom:", error);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = 5000;
console.log(
  "Available routes:",
  app._router.stack.map((r) => r.route?.path).filter(Boolean)
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

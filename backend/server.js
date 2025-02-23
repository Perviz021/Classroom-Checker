import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import classroomRoutes from "./routes/classrooms.js"; // ✅ Ensure this path is correct

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Check if the classroomRoutes are loading
console.log("Registering classroom routes...");
app.use("/api/classrooms", classroomRoutes);
console.log("Classroom routes registered!");

// ✅ Log registered routes
console.log(
  "Available routes:",
  app._router.stack.map((r) => r.route?.path).filter(Boolean)
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/api/classrooms", async (req, res) => {
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
      `INSERT INTO classrooms (name, capacity, floor, mouse, keyboard, case_status, projector, vga_cable, speaker, operating_system, projector_display, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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

    res.json({ id: result.insertId, message: "Classroom added successfully!" });
  } catch (error) {
    console.error("Error inserting classroom:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/api/classrooms/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute("DELETE FROM classrooms WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows > 0) {
      res.json({ message: "Classroom deleted successfully!" });
    } else {
      res.status(404).json({ error: "Classroom not found" });
    }
  } catch (error) {
    console.error("Error deleting classroom:", error);
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/api/classrooms/:id", async (req, res) => {
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
       SET name = ?, capacity = ?, floor = ?, mouse = ?, keyboard = ?, case_status = ?, projector = ?, vga_cable = ?, speaker = ?, operating_system = ?, projector_display = ?, status = ? 
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
      res.json({ message: "Classroom updated successfully!" });
    } else {
      res.status(404).json({ error: "Classroom not found" });
    }
  } catch (error) {
    console.error("Error updating classroom:", error);
    res.status(500).json({ error: "Database error" });
  }
});

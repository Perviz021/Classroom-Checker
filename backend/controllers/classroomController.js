import db from "../config/db.js";

// ✅ Test Route Logic
export const testClassroomAPI = (req, res) => {
  res.send("Classroom API is working!");
};

// ✅ Get all classrooms
export const getClassrooms = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM classrooms");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error.message });
  }
};

// ✅ Get a single classroom by ID
export const getClassroomById = async (req, res) => {
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
};

// ✅ Update classroom device statuses
export const updateClassroom = async (req, res) => {
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
};

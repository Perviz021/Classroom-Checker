import db from "../config/db.js"; // Database connection

export const createUser = async (req, res) => {
  const { fullname, email, password, department_id, position, role } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO users (fullname, email, password, department_id, position, role) VALUES (?, ?, ?, ?, ?, ?)",
      [fullname, email, password, department_id, position, role]
    );
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { fullname, email, department_id, position, role } = req.body;
  try {
    await db.query(
      "UPDATE users SET fullname=?, email=?, department_id=?, position=?, role=? WHERE id=?",
      [fullname, email, department_id, position, role, id]
    );
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM users WHERE id=?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Database error", error });
  }
};

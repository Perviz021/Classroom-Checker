import { useState } from "react";

// const API_BASE_URL = "https://classroom-checker-backend.onrender.com/api";
const API_BASE_URL = "http://localhost:5000/api";

function AddClassroom({ onClassroomAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    floor: "",
    mouse: true,
    keyboard: true,
    case_status: true,
    projector: true,
    vga_cable: true,
    speaker: true,
    operating_system: true,
    projector_display: true,
    status: "",
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/classrooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Classroom added successfully!");
        setFormData({
          name: "",
          capacity: "",
          floor: "",
          mouse: true,
          keyboard: true,
          case_status: true,
          projector: true,
          vga_cable: true,
          speaker: true,
          operating_system: true,
          projector_display: true,
          status: "",
        });
        onClassroomAdded(); // Refresh the classroom list
      } else {
        alert("Error adding classroom.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add Classroom</h2>
      <input
        type="text"
        name="name"
        placeholder="Classroom Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={formData.capacity}
        onChange={handleChange}
        required
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        name="floor"
        placeholder="Floor"
        value={formData.floor}
        onChange={handleChange}
        required
        className="border p-2 w-full mb-2"
      />

      <div className="grid grid-cols-2 gap-2">
        {[
          "mouse",
          "keyboard",
          "case_status",
          "projector",
          "vga_cable",
          "speaker",
          "operating_system",
          "projector_display",
        ].map((device) => (
          <label key={device} className="flex items-center">
            <input
              type="checkbox"
              name={device}
              checked={formData[device]}
              onChange={handleChange}
              className="mr-2"
            />
            {device.replace("_", " ").toUpperCase()}
          </label>
        ))}
      </div>

      <textarea
        name="status"
        placeholder="Status (e.g., 'Projector broken')"
        value={formData.status}
        onChange={handleChange}
        className="border p-2 w-full mt-2"
      />

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white p-2 w-full rounded"
      >
        Add Classroom
      </button>
    </form>
  );
}

export default AddClassroom;

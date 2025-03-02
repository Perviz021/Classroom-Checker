import { useState } from "react";

const API_BASE_URL = "https://classroom-checker-backend.onrender.com/api";
// const API_BASE_URL = "http://localhost:5000/api";

function EditClassroom({ classroom, onClose, onClassroomUpdated }) {
  const [formData, setFormData] = useState({ ...classroom });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdate = async () => {
    const updatedClassroom = {
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
    };

    try {
      const response = await fetch(`${API_BASE_URL}/classrooms/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedClassroom),
      });

      if (response.ok) {
        alert("Classroom updated successfully");
        navigate("/"); // Redirect to home after update
      } else {
        alert("Failed to update classroom");
      }
    } catch (error) {
      console.error("Error updating classroom:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_BASE_URL}/classrooms/${classroom.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Classroom updated successfully!");
        onClassroomUpdated();
        onClose();
      } else {
        alert("Error updating classroom.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Classroom</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="border p-2 w-full mb-2"
          />
          <input
            type="number"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
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
            value={formData.status}
            onChange={handleChange}
            className="border p-2 w-full mt-2"
          />

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditClassroom;

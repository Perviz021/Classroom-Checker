import { useEffect, useState } from "react";
import AddClassroom from "./AddClassroom";
import EditClassroom from "./EditClassroom";

function Home() {
  const [classrooms, setClassrooms] = useState([]);
  const [editingClassroom, setEditingClassroom] = useState(null);

  const fetchClassrooms = () => {
    fetch("http://localhost:5000/api/classrooms")
      .then((response) => response.json())
      .then((data) => setClassrooms(data))
      .catch((error) => console.error("Error fetching classrooms:", error));
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this classroom?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/classrooms/${id}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        fetchClassrooms();
      } else {
        alert("Failed to delete classroom.");
      }
    } catch (error) {
      console.error("Error deleting classroom:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Classrooms</h2>

      <AddClassroom onClassroomAdded={fetchClassrooms} />

      {editingClassroom && (
        <EditClassroom
          classroom={editingClassroom}
          onClose={() => setEditingClassroom(null)}
          onClassroomUpdated={fetchClassrooms}
        />
      )}

      <ul className="mt-4">
        {classrooms.length > 0 ? (
          classrooms.map((room) => (
            <li key={room.id} className="p-4 bg-white rounded shadow mb-2">
              <p className="font-bold">
                {room.name} (Capacity: {room.capacity}, Floor: {room.floor})
              </p>
              <p>
                📅 Last Checked: {new Date(room.checked_at).toLocaleString()}
              </p>
              <p>⚠ Status: {room.status || "No Issues"}</p>

              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                onClick={() => setEditingClassroom(room)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(room.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>Loading classrooms...</p>
        )}
      </ul>
    </div>
  );
}

export default Home;

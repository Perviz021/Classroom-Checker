import { useEffect, useState } from "react";
import AddClassroom from "./AddClassroom";
import EditClassroom from "./EditClassroom";

const API_BASE_URL = "https://classroom-checker-backend.onrender.com/api";

function Home() {
  const [classrooms, setClassrooms] = useState([]);
  const [editingClassroom, setEditingClassroom] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showIssuesOnly, setShowIssuesOnly] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  const fetchClassrooms = () => {
    fetch(`${API_BASE_URL}/classrooms`)
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
        `${API_BASE_URL}/classrooms/${id}`,
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

  // **Filter & Sort Logic**
  const filteredClassrooms = classrooms
    .filter(
      (room) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!showIssuesOnly || room.status.toLowerCase() !== "ok") // Case-insensitive filtering
    )
    .sort((a, b) =>
      sortAscending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Classrooms</h2>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 border rounded w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={`p-2 rounded text-white w-full sm:w-auto ${
            showIssuesOnly ? "bg-red-500" : "bg-gray-500"
          }`}
          onClick={() => setShowIssuesOnly(!showIssuesOnly)}
        >
          {showIssuesOnly ? "Show All" : "Show Issues Only"}
        </button>
        <button
          className="p-2 bg-blue-500 text-white rounded w-full sm:w-auto"
          onClick={() => setSortAscending(!sortAscending)}
        >
          Sort: {sortAscending ? "A → Z" : "Z → A"}
        </button>
      </div>

      {/* Add Classroom */}
      <AddClassroom onClassroomAdded={fetchClassrooms} />

      {editingClassroom && (
        <EditClassroom
          classroom={editingClassroom}
          onClose={() => setEditingClassroom(null)}
          onClassroomUpdated={fetchClassrooms}
        />
      )}

      {/* Classroom List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {filteredClassrooms.length > 0 ? (
          filteredClassrooms.map((room) => (
            <div key={room.id} className="p-4 bg-white rounded shadow">
              <p className="font-bold text-lg">
                {room.name} (Capacity: {room.capacity}, Floor: {room.floor})
              </p>
              <p className="text-sm text-gray-600">
                📅 Last Checked: {new Date(room.checked_at).toLocaleString()}
              </p>
              <p className="text-sm text-red-500">
                ⚠ Status: {room.status || "No Issues"}
              </p>

              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <p>🖱 Mouse: {room.mouse ? "✅ Working" : "❌ Not Working"}</p>
                <p>
                  ⌨ Keyboard: {room.keyboard ? "✅ Working" : "❌ Not Working"}
                </p>
                <p>
                  💻 Case: {room.case_status ? "✅ Working" : "❌ Not Working"}
                </p>
                <p>
                  📽 Projector:{" "}
                  {room.projector ? "✅ Working" : "❌ Not Working"}
                </p>
                <p>
                  🔌 VGA Cable: {room.vga_cable ? "✅ Connected" : "❌ Missing"}
                </p>
                <p>
                  🔊 Speaker: {room.speaker ? "✅ Working" : "❌ Not Working"}
                </p>
                <p>
                  🖥 OS:{" "}
                  {room.operating_system ? "✅ Installed" : "❌ Not Installed"}
                </p>
                <p>
                  📺 Projector Display:{" "}
                  {room.projector_display ? "✅ Working" : "❌ Not Working"}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded w-full sm:w-auto"
                  onClick={() => setEditingClassroom(room)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded w-full sm:w-auto"
                  onClick={() => handleDelete(room.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No classrooms found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;

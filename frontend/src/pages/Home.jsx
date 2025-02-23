import { useEffect, useState } from "react";
import AddClassroom from "./AddClassroom";
import EditClassroom from "./EditClassroom";

function Home() {
  const [classrooms, setClassrooms] = useState([]);
  const [editingClassroom, setEditingClassroom] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showIssuesOnly, setShowIssuesOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

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

      <div className="flex gap-2 my-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filter Button */}
        <button
          className={`p-2 rounded ${
            showIssuesOnly ? "bg-red-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setShowIssuesOnly(!showIssuesOnly)}
        >
          {showIssuesOnly ? "Show All" : "Show Only Issues"}
        </button>

        {/* Sort Button */}
        <button
          className="p-2 rounded bg-blue-500 text-white"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort: {sortOrder === "asc" ? "A → Z" : "Z → A"}
        </button>
      </div>

      <ul className="mt-4">
        {classrooms.length > 0 ? (
          classrooms
            .filter((room) =>
              room.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter((room) => !showIssuesOnly || room.status !== "OK")
            .sort((a, b) =>
              sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
            )
            .map((room) => (
              <li key={room.id} className="p-4 bg-white rounded shadow mb-2">
                <p className="font-bold">
                  {room.name} (Capacity: {room.capacity}, Floor: {room.floor})
                </p>
                <p>
                  📅 Last Checked: {new Date(room.checked_at).toLocaleString()}
                </p>
                <p>⚠ Status: {room.status || "No Issues"}</p>

                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <p>🖱 Mouse: {room.mouse ? "✅ Working" : "❌ Not Working"}</p>
                  <p>
                    ⌨ Keyboard:{" "}
                    {room.keyboard ? "✅ Working" : "❌ Not Working"}
                  </p>
                  <p>
                    💻 Case:{" "}
                    {room.case_status ? "✅ Working" : "❌ Not Working"}
                  </p>
                  <p>
                    📽 Projector:{" "}
                    {room.projector ? "✅ Working" : "❌ Not Working"}
                  </p>
                  <p>
                    🔌 VGA Cable:{" "}
                    {room.vga_cable ? "✅ Connected" : "❌ Missing"}
                  </p>
                  <p>
                    🔊 Speaker: {room.speaker ? "✅ Working" : "❌ Not Working"}
                  </p>
                  <p>
                    🖥 OS:{" "}
                    {room.operating_system
                      ? "✅ Installed"
                      : "❌ Not Installed"}
                  </p>
                  <p>
                    📺 Projector Display:{" "}
                    {room.projector_display ? "✅ Working" : "❌ Not Working"}
                  </p>
                </div>

                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded mt-2 mr-2"
                  onClick={() => setEditingClassroom(room)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded mt-2"
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

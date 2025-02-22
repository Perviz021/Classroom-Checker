import { Link } from "react-router-dom";

const classrooms = [
  { id: 101, name: "Room 101" },
  { id: 102, name: "Room 102" },
  { id: 103, name: "Room 103" },
];

function Home() {
  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Select a Classroom</h2>
      <ul className="space-y-3">
        {classrooms.map((room) => (
          <li key={room.id}>
            <Link
              to={`/classroom/${room.id}`}
              className="block p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {room.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

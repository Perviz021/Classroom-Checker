import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const devices = [
  "Mouse",
  "Keyboard",
  "Case",
  "Projector",
  "VGA Cable",
  "Speaker",
  "Operating System",
  "Projector Display",
];

function ClassroomDetail() {
  const { id } = useParams();
  const storageKey = `classroom-${id}-status`;

  // Load status from local storage or set default
  const [status, setStatus] = useState(() => {
    const savedStatus = localStorage.getItem(storageKey);
    return savedStatus
      ? JSON.parse(savedStatus)
      : devices.reduce((acc, device) => ({ ...acc, [device]: true }), {});
  });

  // Save status to local storage
  const saveStatus = () => {
    localStorage.setItem(storageKey, JSON.stringify(status));
    alert("Status saved successfully!");
  };

  // Toggle device status
  const toggleStatus = (device) => {
    setStatus((prev) => ({ ...prev, [device]: !prev[device] }));
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Classroom {id} - Device Status</h2>
      <ul className="space-y-3">
        {devices.map((device) => (
          <li
            key={device}
            className="flex justify-between p-3 bg-gray-100 rounded-lg"
          >
            <span>{device}</span>
            <button
              onClick={() => toggleStatus(device)}
              className={`px-4 py-1 rounded-lg text-white ${
                status[device] ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {status[device] ? "Working" : "Not Working"}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={saveStatus}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
      >
        Save Status
      </button>
    </div>
  );
}

export default ClassroomDetail;

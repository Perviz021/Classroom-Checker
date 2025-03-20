import { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Retrieve the authentication token from where it is stored
    const token = localStorage.getItem("authToken"); // Or from cookies

    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: {
          // Add the Authorization header with the token
          Authorization: `Bearer ${token}`,
        },
      }) // Update API URL if needed
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <table className="w-full border mt-4">
        <thead>
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Full Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Position</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.fullname}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;

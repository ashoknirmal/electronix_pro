import React, { useEffect, useState } from "react";
import "../styles/ManageUsers.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUsers(data);
        } else {
          alert(data.message || "Failed to fetch users");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        alert("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="manage-users">
      <button className="back-button" onClick={() => window.history.back()}>
        &#8592; Back
      </button>
      <h2 className="page-title">Manage Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id} className="table-row">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

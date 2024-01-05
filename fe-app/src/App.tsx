import { useEffect, useState, useMemo } from "react";
import "./App.css";

interface User {
  ID: number;
  firstName: string;
  lastName: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8080/api/v1/users");
    const { data } = await res.json();
    setUsers(data);
    console.log(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  console.log(users);

  const filteredUsers = useMemo(() => {
    console.log("hello filter");
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  return (
    <main>
      <input
        type="text"
        placeholder="Search users by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredUsers.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.ID}>
                <td>{user.ID}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No users found</div>
      )}
    </main>
  );
}

export default App;

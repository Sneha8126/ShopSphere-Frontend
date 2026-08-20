import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { userAPI } from "../../services/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { Spinner } from "../../components/Loading.jsx";
import ErrorMessage from "../../components/ErrorMessage.jsx";

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await userAPI.getAll();
      setUsers(data.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      const { data } = await userAPI.updateRole(userId, role);
      setUsers((prev) => prev.map((u) => (u._id === userId ? data.user : u)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Delete this user? This cannot be undone.")) return;
    try {
      await userAPI.delete(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <Spinner label="Loading users..." />;

  return (
    <div>
      <h1 style={{ fontSize: "1.4rem" }} className="mb-4">Manage Users</h1>

      {error && <ErrorMessage message={error} onRetry={load} />}

      <table className="admin-table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <select
                  className="form-select"
                  value={u.role}
                  disabled={u._id === currentUser._id}
                  onChange={(e) => handleRoleChange(u._id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  disabled={u._id === currentUser._id}
                  onClick={() => handleDelete(u._id)}
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;

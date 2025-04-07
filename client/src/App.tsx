import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import UserCard from "./components/UserCard";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface FormState {
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<FormState>({ name: "", email: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const fetchUsers = async () => {
    const res = await axios.get<{ users: User[] }>(
      "http://localhost:5000/users"
    );
    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/users", form);
    setForm({ name: "", email: "" });
    fetchUsers();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchUsers();
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="p-6 flex items-center flex-col min-h-screen bg-gradient-to-r from-blue-200 to-purple-300">
      <h1 className="text-3xl font-extrabold mb-6 text-white">User CRUD App</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 mb-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border-2 border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border-2 border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Add User
        </button>
      </form>

      <ul className="w-full flex flex-wrap justify-center gap-6">
        {currentUsers.map((user) => (
          <UserCard key={user._id} {...user} handleDelete={handleDelete} />
        ))}
      </ul>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-2 rounded-full hover:bg-gray-400 disabled:opacity-50 transition"
        >
          Prev
        </button>
        <span className="self-center text-xl font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={currentPage === totalPages}
          className="bg-gray-300 px-4 py-2 rounded-full hover:bg-gray-400 disabled:opacity-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

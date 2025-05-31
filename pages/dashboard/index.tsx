import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { User } from '@/types/user';

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUsers(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch users.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filteredList = users.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.address?.city.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredList);
  }, [search]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <Link href="/dashboard/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
        </Link>
      </div>

      <input
        className="border px-2 py-1 mb-4 w-full"
        placeholder="Search by name or city"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">City</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id}>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.phone}</td>
              <td className="border px-4 py-2">{u.address?.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

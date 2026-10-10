"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    fetchApi("/users").then(setUsers).catch(() => {});
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      await fetchApi(`/users/${id}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role })
      });
      toast.success("Kullanıcı rolü değiştirildi!");
      loadUsers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Kullanıcılar & Rol Ataması</h1>

      <div className="bg-white dark:bg-stone-900 border rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-stone-100 dark:bg-stone-800 text-sm">
            <tr>
              <th className="p-4">Ad Soyad</th>
              <th className="p-4">E-Posta</th>
              <th className="p-4">Rol</th>
              <th className="p-4">Rol Değiştir</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="p-4 font-medium">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">
                  <span className="px-2.5 py-1 bg-stone-200 dark:bg-stone-800 rounded text-xs font-bold">{u.role}</span>
                </td>
                <td className="p-4">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="px-2 py-1 border rounded dark:bg-stone-800 text-sm"
                  >
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="EMPLOYEE">EMPLOYEE</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

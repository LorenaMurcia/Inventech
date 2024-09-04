import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


function UsersTable() {
  const [editingUserId, setEditingUserId] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      date: new Date().toLocaleDateString(),
      status: "active",
      name: "Hart Hagerty",
      image: "https://img.daisyui.com/images/profile/demo/2@94.webp",
      role: "tecnico",
      detail: "...",
      country: "United States"
    },
    {
      id: 2,
      date: new Date().toLocaleDateString(),
      status: "inactive",
      name: "Luna Mccall",
      image: "https://img.daisyui.com/images/profile/demo/3@94.webp",
      role: "gerente",
      detail: "...",
      country: "China"
    },
    {
      id: 3,
      date: new Date().toLocaleDateString(),
      status: "active",
      name: "Luna Mccall",
      image: "https://img.daisyui.com/images/profile/demo/4@94.webp",
      role: "gerente",
      detail: "...",
      country: "Russia"
    },
    {
      id: 4,
      date: new Date().toLocaleDateString(),
      status: "inactive",
      name: "Luna Mccall",
      image: "https://img.daisyui.com/images/profile/demo/5@94.webp",
      role: "gerente",
      detail: "...",
      country: "Brazil"
    }
  ]);

  const { t } = useTranslation();

  const handleEditClick = (id) => {
    setEditingUserId(id);
  };

  const handleSaveClick = (id) => {
    setEditingUserId(null);
  };

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, [name]: value } : user
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="table rounded-lg bg-Blue50 p-6 shadow-lg">
        <thead>
          <tr>
            <th></th>
            <th>{t('users.name')}</th>
            <th>{t('users.id')}</th>
            <th>{t('users.date')}</th>
            <th>{t('users.status')}</th>
            <th>{t('users.role')}</th>
            <th>{t('users.detail')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={(e) => handleInputChange(e, user.id)}
                    className="input input-sm input-bordered w-full max-w-xs"
                  />
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.image}
                          alt={`${user.name} Avatar`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.country}</div>
                    </div>
                  </div>
                )}
              </td>
              <td>{user.id}</td>
              <td>{user.date}</td>
              <td>
              {editingUserId === user.id ? (
                <select className="select select-bordered select-xs w-full max-w-xs">
                  <option disabled selected>Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                ) : (
                  <span className="badge badge-ghost badge-sm">{user.status}</span>
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="role"
                    value={user.role}
                    onChange={(e) => handleInputChange(e, user.id)}
                    className="input input-sm input-bordered w-full max-w-xs"
                  />
                ) : (
                  <span className="badge badge-ghost badge-sm">{user.role}</span>
                )}
              </td>
              <td>{user.detail}</td>
              <th>
                {editingUserId === user.id ? (
                  <button
                    className="btn btn-xs bg-lime-700 text-white"
                    onClick={() => handleSaveClick(user.id)}
                  >
                    {t('users.save')}
                  </button>
                ) : (
                  <button
                    className="btn btn-outline btn-xs bg-Blue400 text-white hover:bg-Blue600"
                    onClick={() => handleEditClick(user.id)}
                  >
                   {t('users.edituser')}
                  </button>
                )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;

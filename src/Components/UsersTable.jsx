import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllUsers } from '../Servicios/usuarios';


function UsersTable() {
  const [editingUserId, setEditingUserId] = useState(null);
  const [users, setUsers] = useState();

  const { t } = useTranslation();


  const dataUsers = async()=>{
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(()=>{
    dataUsers();
  },[])

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
            <th>{t('users.correo')}</th>
            <th>{t('users.role')}</th>
            <th>{t('users.detail')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                {editingUserId === user.id_usuario ? (
                  <input
                    type="text"
                    name="name"
                    value={user.nombres}
                    onChange={(e) => handleInputChange(e, user.id_usuario )}
                    className="input input-sm input-bordered w-full max-w-xs"
                  />
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.image}
                          alt={`${user.nombres} Avatar`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.nombres}</div>
                    </div>
                  </div>
                )}
              </td>
              <td>{user.id_usuario}</td>
              <td>{user.fecha_creacion}</td>
              <td>
              {editingUserId === user.id_usuario ? (
                <input
                type="text"
                name="role"
                value={user.correo}
                onChange={(e) => handleInputChange(e, user.id_usuario)}
                className="input input-sm input-bordered w-full max-w-xs"
              />
                ) : (
                  <span className="badge badge-ghost badge-sm">{user.correo}</span>
                )}
              </td>
              <td>
                {editingUserId === user.id_usuario ? (
                  <select className="select select-bordered select-xs w-full max-w-xs">
                  <option disabled selected>{user.rol.nombre}</option>
                  <option>administrados</option>
                  <option>tecnico</option>
                  <option>Cliente</option>
                </select>
                ) : (
                  <span className="badge badge-ghost badge-sm">{user.rol.nombre}</span>
                )}
              </td>
              <td>{user.detail}</td>
              <th>
                {editingUserId === user.id_usuario ? (
                  <button
                    className="btn btn-xs bg-lime-700 text-white hover:bg-lime-600"
                    onClick={() => handleSaveClick(user.id_usuario)}
                  >
                    {t('users.save')}
                  </button>
                ) : (
                  <button
                    className="btn btn-outline btn-xs bg-Blue400 text-white hover:bg-Blue600"
                    onClick={() => handleEditClick(user.id_usuario)}
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

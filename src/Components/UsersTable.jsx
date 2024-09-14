import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllUsers, updateUser, } from '../Servicios/usuarios';
import { getRoles } from '../Servicios/rol';
import Swal from 'sweetalert2';


function UsersTable() {
  const [editingUserId, setEditingUserId] = useState(null);
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [nombres, setNombres] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [roles, setRoles] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  console.log(selectedRole)
  const [isUserUpdated, setIsUserUpdated] = useState(false); 

  const { t } = useTranslation();

  const handleRoles = async ()=>{
    const dataRoles = await getRoles();
    setRoles(dataRoles);
  }

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value); // Almacena el id del rol seleccionado
  };


  const dataUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setIsLoading(false); // La carga ha finalizado
    }
  };

  const handleEditClick = (id) => {
    console.log('id', id)
    setEditingUserId(id);
  };


  const handleSaveClick = async (id) => {
    console.log('id', id)
    try {
      const update = await updateUser(id, {
        nombres: nombres,
        correo: correo,
        contraseña: contraseña,
        roles: selectedRole
      });
      if(update){
        setIsUserUpdated(true);
        setEditingUserId(null);
        Swal.fire({
          title: 'Usuario editado',
          text: 'El usuario ha sido editado exitosamente',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      }
      console.log('user', update)
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al editar el usuario',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
    setEditingUserId(null);
  };

  useEffect(()=>{
    dataUsers();
    handleRoles();
    if (isUserUpdated) {
      dataUsers(); // Vuelve a cargar los usuarios
      setIsUserUpdated(false); // Resetea el estado para no volver a hacer la llamada innecesariamente
    }
  },[isUserUpdated])


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
         {isLoading ? (
          <div className="flex min-h-screen items-center justify-center">
            <div className="spinner-border inline-block h-8 w-8 animate-spin rounded-full border-4 text-blue-600"></div>
            <span className="ml-2">{t('users.loading')}</span>
          </div>
          ) : users && (
            users.map((user) => (
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
                      value={nombres}
                      onChange={(e)=> setNombres(e.target.value)}
                      className="input input-sm input-bordered w-full max-w-xs"
                      placeholder={user.nombres}
                    />
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                        <img
                        src="https://cdn-icons-png.flaticon.com/512/3541/3541871.png"
                        alt="Avatar Tailwind CSS Component" />
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
                      value={correo}
                      onChange={(e)=> setCorreo(e.target.value)}
                      className="input input-sm input-bordered w-full max-w-xs"
                      placeholder={user.correo}
                    />
                  ) : (
                    <span className="badge badge-ghost badge-sm">{user.correo}</span>
                  )}
                </td>
                <td>
                  {editingUserId === user.id_usuario ? (
                    <select className="select select-bordered select-xs h-[40px] w-full max-w-lg" value={selectedRole} onChange={handleRoleChange}>
                    {roles?.length > 0 && roles.map((role) => (
                      <option key={role.id_rol} value={role.id_rol}>
                        {role.nombre}
                      </option>
                    ))}
                    </select> 
                    ) : (
                      <span className="badge badge-ghost badge-sm">{user.rol.nombre}</span>
                    )}
                </td>
                <td>
                {editingUserId === user.id_usuario ? (
                    <input
                      type="text"
                      name="role"
                      value={contraseña}
                      onChange={(e)=> setContraseña(e.target.value)}
                      className="input input-sm input-bordered w-full max-w-xs"
                      placeholder={user.contraseña}
                    />
                  ) : (
                    <span className="badge badge-ghost badge-sm">{user.contraseña}</span>
                  )}
                </td>
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;

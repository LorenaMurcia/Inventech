import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createusers } from '../Servicios/usuarios';
import { getRoles } from '../Servicios/rol';
import Swal from 'sweetalert2';

function Singup() {
  const { t } = useTranslation();
  const [nombres, setNombres] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [roles, setRoles] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoles = async ()=>{
    const dataRoles = await getRoles();
    setRoles(dataRoles);
  }

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value); // Almacena el id del rol seleccionado
  };


  const submit = async (e)=>{
    e.preventDefault();
    try {
      const fecha_creacion = new Date();
      const sendData = await createusers({nombres, correo, contraseña, id_rol : selectedRole, fecha_creacion});
      if(sendData){
        Swal.fire({
          title: 'Usuario creado',
          text: 'El usuario ha sido creado exitosamente',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al crear el usuario',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }

  useEffect(()=>{
    handleRoles();
  },[])

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='h-[450px] w-full max-w-md rounded-lg bg-Blue100 p-6 shadow-lg'>
        <h2 className='mb-6 text-center text-2xl font-bold text-gray-800'>{t('singup.btnlogin')}</h2>
        <form className='space-y-4' onSubmit={submit}>
          <label className='input input-bordered flex items-center gap-2'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-600">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="text" className='flex-1 border-none outline-none' placeholder={t('singup.email')} onChange={(e)=> setCorreo(e.target.value)}  value={correo}/>
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-600">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input type="text" className='flex-1 border-none outline-none' placeholder={t('singup.username')}  onChange={(e)=> setNombres(e.target.value)}  value={nombres}/>
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-600">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" className='flex-1 border-none outline-none'  placeholder={t('singup.password')} onChange={(e)=> setContraseña(e.target.value)}  value={contraseña} />
          </label>
          <select className="select select-bordered select-xs h-[40px] w-full max-w-lg" value={selectedRole} onChange={handleRoleChange}>
          {roles?.length > 0 && roles.map((role) => (
            <option key={role.id_rol} value={role.id_rol}>
              {role.nombre}
            </option>
          ))}
          </select>
          <button type='submit' className='w-full rounded-md bg-Blue900 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
          {t('singup.btnlogin')}
          </button>
        </form>
      </div>
  </div>
  )
}

export default Singup

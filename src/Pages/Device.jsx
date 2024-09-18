import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { createEquipos } from '../Servicios/equipos'
import { getAllUsers } from '../Servicios/usuarios'
import getAllMarcas from '../Servicios/marcas'
import { getAllTipos } from '../Servicios/tipo_dispositivo'
import Swal from 'sweetalert2';

function Device () {
  const { t } = useTranslation()
  const [usuarios, setUsuarios] = useState([])
  const [marcas, setMarcas] = useState([])
  const [dispositivos, setDispositivos] = useState([])
  const [selectuser, setSelectUser] = useState()
  const [selectmarca, setSelectMarca] = useState()
  const [selectdispositivo, setSelectDispositivo] = useState()
  const [serial, setSerial] = useState('')
  const [memoria_ram, setMemoria_ram] = useState('')
  const [disco_duro, setDisco_duro] = useState('')
  const [procesador, setProcesador] = useState('')

  //funcion para optener las data de los selects
  const allData = async () => {
    try {
      const dataUsers = await getAllUsers()
      const datamarca = await getAllMarcas()
      const dataTipoDispositivo = await getAllTipos()
      setUsuarios(dataUsers)
      setMarcas(datamarca)
      setDispositivos(dataTipoDispositivo)
    } catch (error) {
      console.error(error)
    }
  }

  //funcion para manejar la eleccion de la data de los selects
  const handleSeletData = (type, even) => {
    if (type === 'users') {
        setSelectUser(even.target.value)
    } else if (type === 'marcas') {
      setSelectMarca(even.target.value)
    } else {
      setSelectDispositivo(even.target.value)
    }
  }

  //funcion de submit para crear un equipo
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const fecha_registro = new Date()
      const data = {
        fecha_registro,
        id_marca: selectmarca,
        serial,
        id_tipo: selectdispositivo,
        memoria_ram,
        disco_duro,
        procesador,
        id_usuario: selectuser
      }
      const dataCreate = await createEquipos(data)
      if (dataCreate) {
        Swal.fire({
          title: 'Equipo creado',
          text: 'El equipo ha sido creado exitosamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al crear el equipo',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  useEffect(() => {
    allData()
  }, [])

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='h-[700px] w-full max-w-md rounded-lg bg-Blue100 p-6 shadow-lg'>
        <h2 className='mb-6 text-center text-2xl font-bold text-gray-800'>
          {t('form.tittleform')}
        </h2>
        <form className='space-y-4'  onSubmit={handleSubmit}>
          <label className='input input-bordered flex items-center gap-2'>
            <select
              className='flex-1 border-none bg-white outline-none'
              placeholder={t('form.equipmentType')}
              onChange={e => handleSeletData('users', e)}
              value={selectuser}
            >
              <option>  Seleccion un usuario </option>
              {usuarios?.length > 0 &&
                usuarios.map(usuario => (
                  <option key={usuario.id_usuario} value={usuario.id_usuario}>
                    {usuario.nombres}
                  </option>
                ))}
            </select>
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <select
              className='flex-1 border-none bg-white outline-none'
              placeholder={t('form.equipmentType')}
              onChange={e => handleSeletData('marcas', e)}
              value={selectmarca}
            >
              <option>  Seleccion una marca </option>
              {marcas?.length > 0 &&
                marcas.map(marca => (
                  <option key={marca.id_marca} value={marca.id_marca}>
                    {marca.marca_fabricante}
                  </option>
                ))}
            </select>
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <input
              type='text'
              className='flex-1 border-none outline-none'
              placeholder={t('form.serial')}
              required='true'
              value={serial}
              onChange={e => setSerial(e.target.value)}
            />
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <select
              className='flex-1 border-none bg-white outline-none'
              placeholder={t('form.equipmentType')}
              onChange={e => handleSeletData('tipos', e)}
              value={selectdispositivo}
            >
              <option>  Seleccion un dispositivo </option>
              {dispositivos?.length > 0 &&
                dispositivos.map(dispositivo => (
                  <option key={dispositivo.id_tipo} value={dispositivo.id_tipo}>
                    {dispositivo.descripcion}
                  </option>
                ))}
            </select>
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <input
              type='text'
              className='flex-1 border-none outline-none'
              placeholder={t('form.ramCapacity')}
              required='true'
              value={memoria_ram}
              onChange={e => setMemoria_ram(e.target.value)}
            />
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <input
              type='text'
              className='flex-1 border-none outline-none'
              placeholder={t('form.diskCapacity')}
              required='true'
              value={disco_duro}
              onChange={e => setDisco_duro(e.target.value)}
            />
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <input
              type='text'
              className='flex-1 border-none outline-none'
              placeholder={t('form.processor')}
              required='true'
              value={procesador}
              onChange={e => setProcesador(e.target.value)}
            />
          </label>
          <div className='flex w-full flex-col items-center justify-center gap-6 text-center'>
            <button className='w-full rounded-md bg-Blue900 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
              {t('form.submit')}
            </button>
            <NavLink
              to='/deviceManagment'
              className='w-full rounded-md bg-Blue900 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
              {t('back.text')}
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Device

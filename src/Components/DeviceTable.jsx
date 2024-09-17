import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { deleteEquipo, getAllEquipos, updateEquipo } from '../Servicios/equipos'
import Swal from 'sweetalert2'

function DeviceTable () {
  const [editingDeviceId, setEditingDeviceId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [devices, setDevices] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [editarDisco, setEditarDisco] = useState('')
  const [editarMemoria, setEditarMemoria] = useState('')
  const [isEquipoUpdated, setIsEquipoUpdated] = useState(false)
  const [deleteDevice, setDeleteDevice] = useState('')

  const { t } = useTranslation()

  //funcion para traer todos los equipos
  const allEquipos = async () => {
    try {
      const data = await getAllEquipos()
      setDevices(data)
    } catch (error) {
      console.error('Error trayendo los equipos' + error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditClick = id => {
    setEditingDeviceId(id)
  }

  const handleSaveClick = id => {
    try {
      const editar = updateEquipo(id, {
        memoria_ram: editarMemoria,
        disco_duro: editarDisco
      })
      if (editar) {
        setIsEquipoUpdated(true)
        setEditingDeviceId(null)
        Swal.fire({
          title: 'Equipo editado',
          text: 'El equipo ha sido editado exitosamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
    } catch (error) {
      console.error('Error updating user:', error)
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al editar el equipo',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
    setEditingDeviceId(null)
  }

  const handleDeleteEquipo = async id => {
    try {
      const eliminarEquipo = await deleteEquipo(id)
      if (eliminarEquipo) {
        setIsEquipoUpdated(true)
        Swal.fire({
          title: 'Equipo eliminado',
          text: 'El equipo ha sido eliminado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      }
    } catch (error) {
      console.error('Error eliminando equipo' + error)
      Swal.fire({
        title: 'Error',
        text: 'Error al intentar eliminar el equipo',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  }

  useEffect(() => {
    allEquipos()
    if (isEquipoUpdated) {
      allEquipos()
      setIsEquipoUpdated(false)
    }
  }, [isEquipoUpdated])
  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table rounded-lg bg-Blue50 p-6 shadow-lg'>
          <thead>
            <tr>
              <th>{t('device.id')}</th>
              <th>{t('device.brand')}</th>
              <th>{t('device.serial')}</th>
              <th>{t('device.type')}</th>
              <th>{t('device.ram')}</th>
              <th>{t('device.disk')}</th>
              <th>{t('device.processor')}</th>
              <th>{t('device.date')}</th>
              <th>{t('device.user')}</th>
              <th>{t('device.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {devices?.map(device => (
              <tr key={device.id_equipo}>
                <td>{device.id_equipo}</td>
                <td>{device.marca.marca_fabricante}</td>
                <td>{device.serial}</td>
                <td>{device.TipoDispositivo.descripcion}</td>
                <td>
                  {editingDeviceId === device.id_equipo ? (
                    <input
                      type='text'
                      name='role'
                      value={editarMemoria}
                      onChange={e => setEditarMemoria(e.target.value)}
                      className='input input-sm input-bordered w-full max-w-xs'
                      placeholder={device.memoria_ram}
                    />
                  ) : (
                    <span className='badge badge-ghost badge-sm'>
                      {' '}
                      {device.memoria_ram}
                    </span>
                  )}
                </td>
                <td>
                  {editingDeviceId === device.id_equipo ? (
                    <input
                      type='text'
                      name='role'
                      value={editarDisco}
                      onChange={e => setEditarDisco(e.target.value)}
                      className='input input-sm input-bordered w-full max-w-xs'
                      placeholder={device.disco_duro}
                    />
                  ) : (
                    <span className='badge badge-ghost badge-sm'>
                      {' '}
                      {device.disco_duro}
                    </span>
                  )}
                </td>
                <td>{device.procesador}</td>
                <td>{device.fecha_registro}</td>
                <td>{device.UsuarioResponsable.nombres}</td>
                <td>
                  {editingDeviceId === device.id_equipo ? (
                    <button
                      className='btn btn-xs bg-lime-700 text-white hover:bg-lime-600'
                      onClick={() => handleSaveClick(device.id_equipo)}
                    >
                     {t('device.btnsave')}
                    </button>
                  ) : (
                    <div className='flex gap-2'>
                      <button
                        className='btn btn-outline btn-xs bg-Blue400 text-white hover:bg-Blue600'
                        onClick={() => handleEditClick(device.id_equipo)}
                      >
                        {t('device.btnedit')}
                      </button>
                      <button
                        className='btn btn-outline btn-xs bg-Blue400 text-white hover:bg-Blue600'
                        onClick={() => handleDeleteEquipo(device.id_equipo)}
                      >
                        {t('device.btndelete')}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default DeviceTable

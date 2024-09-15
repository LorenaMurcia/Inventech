import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { createEquipos } from '../Servicios/equipos'

// Para la funcion de crear
// fecha_registro: enviar como new Date
// id_usuario: get de usuarios -> Select
// id_marca : get de las marcas -> SELECT
// serial : input
// id_tipo : tipo de dispositivo, get de dispositivos -> Select
// memoria_ram : input
// disco_duro : input
// procesador: input

function Device () {
  const { t } = useTranslation()

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='h-[700px] w-full max-w-md rounded-lg bg-Blue100 p-6 shadow-lg'>
        <h2 className='mb-6 text-center text-2xl font-bold text-gray-800'>
          {t('form.tittleform')}
        </h2>
        <form className='space-y-4'>
          <label className='input input-bordered flex items-center gap-2'>
            <select
              className='flex-1 border-none bg-white outline-none'
              placeholder={t('form.equipmentType')}
            >
              <option value=''>Usuarios</option>
              <option value='desktop'>{t('form.desktop')}</option>
              <option value='laptop'>{t('form.laptop')}</option>
            </select>
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <select
              className='flex-1 border-none bg-white outline-none'
              placeholder={t('form.equipmentType')}
            >
              <option value=''>Marca</option>
              <option value='desktop'>{t('form.desktop')}</option>
              <option value='laptop'>{t('form.laptop')}</option>
            </select>
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <input
              type='text'
              className='flex-1 border-none outline-none'
              placeholder={t('form.serial')}
              required='true'
            />
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <select
              className='flex-1 border-none bg-white outline-none'
              placeholder={t('form.equipmentType')}
            >
              <option value=''>{t('form.selectType')}</option>
              <option value='desktop'>{t('form.desktop')}</option>
              <option value='laptop'>{t('form.laptop')}</option>
            </select>
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <input
              type='text'
              className='flex-1 border-none outline-none'
              placeholder={t('form.ramCapacity')}
              required='true'
            />
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <input
              type='text'
              className='flex-1 border-none outline-none'
              placeholder={t('form.diskCapacity')}
              required='true'
            />
          </label>
          <label className='input input-bordered flex items-center gap-2'>
            <input
              type='text'
              className='flex-1 border-none outline-none'
              placeholder={t('form.processor')}
              required='true'
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

import React from 'react'
import { useTranslation } from 'react-i18next';
import DeviceTable from '../Components/DeviceTable';
import { NavLink } from 'react-router-dom';

function DeviceManagement() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-[90%] rounded-lg bg-white p-10 shadow-lg">
        <div className='flex items-center justify-between'>
          <h1 className="mb-6 text-2xl font-bold text-Blue950">{t('device.tittle')}</h1>
          <NavLink to={'/device'} className="btn btn-outline btn-sm bg-Blue600 text-white hover:bg-Blue700 m-5">{t('device.addDevice')}</NavLink>
        </div>
        <DeviceTable />
      </div>
    </div>
  )
}

export default DeviceManagement;




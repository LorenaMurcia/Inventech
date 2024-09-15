import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { createEquipos } from '../Servicios/equipos';

function Device() {
    const { t } = useTranslation();
    const crearEquipo = async (e) => {
        e.preventDefault();
        try {
            const fecha_registro = new Date();
            const sendData = await createEquipos({
                id_marca
            })
        } catch (error) {
            
        }
        createEquipos();
    }
    return (
        <div className='flex min-h-screen items-center justify-center p-4'>
            <div className='h-[600px] w-full max-w-md rounded-lg bg-Blue100 p-6 shadow-lg'>
                <h2 className='mb-6 text-center text-2xl font-bold text-gray-800'>{t('form.tittleform')}</h2>
                <form className='space-y-4'>

                    <label className='input input-bordered flex items-center gap-2'>
                        <input
                            type="text"
                            className='flex-1 border-none outline-none'
                            placeholder={t('form.user')}
                            required="true"
                        />
                    </label>

                    <label className='input input-bordered flex items-center gap-2'>
                        <input
                            type="text"
                            className='flex-1 border-none outline-none'
                            placeholder={t('form.brand')}
                            required="true"
                        />
                    </label>

                    <label className='input input-bordered flex items-center gap-2'>
                        <input
                            type="text"
                            className='flex-1 border-none outline-none'
                            placeholder={t('form.serial')}
                            required="true"
                        />
                    </label>

                    <label className='input input-bordered flex items-center gap-2'>
                        <select
                            className='flex-1 border-none outline-none bg-white'
                            placeholder={t('form.equipmentType')}
                        >
                            <option value="">{t('form.selectType')}</option>
                            <option value="desktop">{t('form.desktop')}</option>
                            <option value="laptop">{t('form.laptop')}</option>
                        </select>
                    </label>

                    <label className='input input-bordered flex items-center gap-2'>
                        <input
                            type="text"
                            className='flex-1 border-none outline-none'
                            placeholder={t('form.ramCapacity')}
                            required="true"
                        />
                    </label>

                    <label className='input input-bordered flex items-center gap-2'>
                        <input
                            type="text"
                            className='flex-1 border-none outline-none'
                            placeholder={t('form.diskCapacity')}
                            required="true"
                        />
                    </label>

                    <label className='input input-bordered flex items-center gap-2'>
                        <input
                            type="text"
                            className='flex-1 border-none outline-none'
                            placeholder={t('form.processor')}
                            required="true"
                        />
                    </label>

                    <button className='w-full rounded-md bg-Blue900 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                        {t('form.submit')}
                    </button>
                    <Link to="/deviceManagment">
                        <div>
                            <button className='w-full rounded-md bg-Blue900 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                                {t('back.text')}
                            </button>
                        </div>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Device;

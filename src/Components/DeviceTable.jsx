/*import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function DeviceTable() {
    const [editingDeviceId, setEditingDeviceId] = useState(null);
    const [devices, setDevices] = useState([
        {
            id: 1,
            date: new Date().toLocaleDateString(),
            brand: "HP",
            serial: "XLM55G",
            type: "Portátil",
            ram: "16 GB",
            disk: "500 GB",
            processor: "Intel core i5"
        },
        {
            id: 2,
            date: new Date().toLocaleDateString(),
            brand: "Dell",
            serial: "ASD12F",
            type: "Escritorio",
            ram: "8 GB",
            disk: "1 TB",
            processor: "Intel core i7"
        },
        {
            id: 3,
            date: new Date().toLocaleDateString(),
            brand: "Asus",
            serial: "AJBU15LM",
            type: "Portátil",
            ram: "16 GB",
            disk: "1 TB",
            processor: "Intel core i3"
        }
    ]);

    const { t } = useTranslation();

    const handleEditClick = (id) => {
        setEditingDeviceId(id);
    };

    const handleSaveClick = () => {
        setEditingDeviceId(null);
    };

    const handleInputChange = (e, id) => {
        const { name, value } = e.target;
        setDevices((prevDevices) =>
            prevDevices.map((device) =>
                device.id === id ? { ...device, [name]: value } : device
            )
        );
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className="table rounded-lg bg-Blue50 p-6 shadow-lg">
                    <thead>
                        <tr>
                            <th>{t('device.id')}</th>
                            <th>{t('device.date')}</th>
                            <th>{t('device.brand')}</th>
                            <th>{t('device.serial')}</th>
                            <th>{t('device.type')}</th>
                            <th>{t('device.ram')}</th>
                            <th>{t('device.disk')}</th>
                            <th>{t('device.processor')}</th>
                            <th>{t('device.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((device) => (
                            <tr key={device.id}>
                                <td>{device.id}</td>
                                <td>{device.date}</td>
                                <td>
                                    {editingDeviceId === device.id ? (
                                        <input
                                            type="text"
                                            name="brand"
                                            value={device.brand}
                                            onChange={(e) => handleInputChange(e, device.id)}
                                            className="input input-sm input-bordered w-full max-w-xs"
                                        />
                                    ) : (
                                        device.brand
                                    )}
                                </td>
                                <td>
                                    {editingDeviceId === device.id ? (
                                        <input
                                            type="text"
                                            name="serial"
                                            value={device.serial}
                                            onChange={(e) => handleInputChange(e, device.id)}
                                            className="input input-sm input-bordered w-full max-w-xs"
                                        />
                                    ) : (
                                        device.serial
                                    )}
                                </td>
                                <td>
                                    {editingDeviceId === device.id ? (
                                        <select
                                            name="type"
                                            value={device.type}
                                            onChange={(e) => handleInputChange(e, device.id)}
                                            className="select select-bordered select-xs w-full max-w-xs"
                                        >                                            
                                            <option value="Portátil">{t('device.laptop')}</option>
                                            <option value="Escritorio">{t('device.desktop')}</option>
                                        </select>
                                    ) : (
                                        device.type
                                    )}
                                </td>
                                <td>
                                    {editingDeviceId === device.id ? (
                                        <input
                                            type="text"
                                            name="ram"
                                            value={device.ram}
                                            onChange={(e) => handleInputChange(e, device.id)}
                                            className="input input-sm input-bordered w-full max-w-xs"
                                        />
                                    ) : (
                                        device.ram
                                    )}
                                </td>
                                <td>
                                    {editingDeviceId === device.id ? (
                                        <input
                                            type="text"
                                            name="disk"
                                            value={device.disk}
                                            onChange={(e) => handleInputChange(e, device.id)}
                                            className="input input-sm input-bordered w-full max-w-xs"
                                        />
                                    ) : (
                                        device.disk
                                    )}
                                </td>
                                <td>
                                    {editingDeviceId === device.id ? (
                                        <input
                                            type="text"
                                            name="processor"
                                            value={device.processor}
                                            onChange={(e) => handleInputChange(e, device.id)}
                                            className="input input-sm input-bordered w-full max-w-xs"
                                        />
                                    ) : (
                                        device.processor
                                    )}
                                </td>
                                <td>
                                    {editingDeviceId === device.id ? (
                                        <button
                                            className="btn btn-xs bg-lime-700 text-white hover:bg-lime-600"
                                            onClick={() => handleSaveClick(device.id)}
                                        >
                                            {t('device.btnsave')}
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline btn-xs bg-Blue400 text-white hover:bg-Blue600"
                                            onClick={() => handleEditClick(device.id)}
                                        >
                                            {t('device.btnedit')}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <Link to="/deviceManagment">
                <div>
                    <button className='w-full rounded-md bg-Blue900 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                        {t('back.text')}
                    </button>
                </div>
            </Link>
        </>
    );
}

export default DeviceTable;*/

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function DeviceTable() {
    const [editingDeviceId, setEditingDeviceId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [devices, setDevices] = useState([
        {
            id: 1,
            date: new Date().toLocaleDateString(),
            brand: "HP",
            serial: "XLM55G",
            type: "Portátil",
            ram: "16 GB",
            disk: "500 GB",
            processor: "Intel core i5"
        },
        {
            id: 2,
            date: new Date().toLocaleDateString(),
            brand: "Dell",
            serial: "ASD12F",
            type: "Escritorio",
            ram: "8 GB",
            disk: "1 TB",
            processor: "Intel core i7"
        },
        {
            id: 3,
            date: new Date().toLocaleDateString(),
            brand: "Asus",
            serial: "AJBU15LM",
            type: "Portátil",
            ram: "16 GB",
            disk: "1 TB",
            processor: "Intel core i3"
        }
    ]);

    const { t } = useTranslation();

    const handleEditClick = (id) => {
        setEditingDeviceId(id);
    };

    const handleSaveClick = () => {
        setEditingDeviceId(null);
    };

    const handleInputChange = (e, id) => {
        const { name, value } = e.target;
        setDevices((prevDevices) =>
            prevDevices.map((device) =>
                device.id === id ? { ...device, [name]: value } : device
            )
        );
    };

    const filteredDevices = devices.filter((device) =>
        Object.values(device).some((value) =>
            typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <>
            <div className="mb-4 ">
                <input
                    type="text"
                    placeholder={t('device.search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table rounded-lg bg-Blue50 p-6 shadow-lg">
                    <thead>
                        <tr>
                            <th>{t('device.id')}</th>
                            <th>{t('device.date')}</th>
                            <th>{t('device.brand')}</th>
                            <th>{t('device.serial')}</th>
                            <th>{t('device.type')}</th>
                            <th>{t('device.ram')}</th>
                            <th>{t('device.disk')}</th>
                            <th>{t('device.processor')}</th>
                            <th>{t('device.actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDevices.map((device) => (
                            <tr key={device.id}>
                                <td>{device.id}</td>
                                <td>{device.date}</td>
                                <td>
                                    {editingDeviceId === device.id ? (
                                        <input
                                            type="text"
                                            name="brand"
                                            value={device.brand}
                                            onChange={(e) => handleInputChange(e, device.id)}
                                            className="input input-sm input-bordered w-full max-w-xs"
                                        />
                                    ) : (
                                        device.brand
                                    )}
                                </td>
                                <td>
                                    {editingDeviceId === device.id ? (
                                        <input
                                            type="text"
                                            name="serial"
                                            value={device.serial}
                                            onChange={(e) => handleInputChange(e, device.id)}
                                            className="input input-sm input-bordered w-full max-w-xs"
                                        />
                                    ) : (
                                        device.serial
                                    )}
                                </td>
                                <td>
                                    {editingDeviceId === device.id ? (
                                        <select
                                            name="type"
                                            value={device.type}
                                            onChange={(e) => handleInputChange(e, device.id)}
                                            className="select select-bordered select-xs w-full max-w-xs"
                                        >
                                            <option value="Portátil">{t('device.laptop')}</option>
                                            <option value="Escritorio">{t('device.desktop')}</option>
                                        </select>
                                    ) : (
                                        device.type
                                    )}
                                </td>
                                <td>
                                    {editingDeviceId === device.id ? (
                                        <input
                                            type="text"
                                            name="ram"
                                            value={device.ram}
                                            onChange={(e) => handleInputChange(e, device.id)}
                                            className="input input-sm input-bordered w-full max-w-xs"
                                        />
                                    ) : (
                                        device.ram
                                    )}
                                </td>
                                <td>
                                    {editingDeviceId === device.id ? (
                                        <input
                                            type="text"
                                            name="disk"
                                            value={device.disk}
                                            onChange={(e) => handleInputChange(e, device.id)}
                                            className="input input-sm input-bordered w-full max-w-xs"
                                        />
                                    ) : (
                                        device.disk
                                    )}
                                </td>
                                <td>
                                    {editingDeviceId === device.id ? (
                                        <input
                                            type="text"
                                            name="processor"
                                            value={device.processor}
                                            onChange={(e) => handleInputChange(e, device.id)}
                                            className="input input-sm input-bordered w-full max-w-xs"
                                        />
                                    ) : (
                                        device.processor
                                    )}
                                </td>
                                <td>
                                    {editingDeviceId === device.id ? (
                                        <button
                                            className="btn btn-xs bg-lime-700 text-white hover:bg-lime-600"
                                            onClick={() => handleSaveClick(device.id)}
                                        >
                                            {t('device.btnsave')}
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline btn-xs bg-Blue400 text-white hover:bg-Blue600"
                                            onClick={() => handleEditClick(device.id)}
                                        >
                                            {t('device.btnedit')}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to="/deviceManagment">
                <button className='w-full rounded-md bg-Blue900 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                    {t('back.text')}
                </button>
            </Link>
        </>
    );
}

export default DeviceTable;

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import getAllEquipos from '../Servicios/equipos';

function DeviceTable() {
    const [editingDeviceId, setEditingDeviceId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [devices, setDevices] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [marca, setMarca] = useState ('');
    // const [serial, setSerial] = useState ('');
    //const [tipo, setTipo] = useState ('');
    // const [ram, setRam] = useState ('');
    // const [disco, setDisco] = useState ('');
    // const [procesador, setProcesador] = useState ('');
    // const [usuario, setUsuario] = useState ('');

    const { t } = useTranslation();

    const allEquipos = async() => {
        try {
            const data = await getAllEquipos();
            console.log(data)
            setDevices(data);
        } catch (error) {
            console.log("Error trayendo los equipos" + error)
        } finally    {
            setIsLoading(false);
        }  
    };

    const traerMarca = async() => {
        const getMarca = await getMarca();
        setMarca(getMarca);
    }

    const traerTipo = async() => {
        //const getTipo = await getTipo();
        setTipo(getTipo);
    }

    useEffect(() => {
        allEquipos();     
        traerMarca();         
    },[])

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

    /*const filteredDevices = devices.filter((device) =>
        Object.values(device).some((value) =>
            typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );*/

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
                        {
                            devices?.map((device,marca)=>(
                                <tr key={device.id_equipo}>
                                     <td>{device.id_equipo}</td>
                                     <td>{device.marca.marca_fabricante}</td>
                                     <td>{device.serial}</td>  
                                     <td>{device.tipo.descripcion}</td>  
                                     <td>{device.memoria_ram}</td>  
                                     <td>{device.disco_duro}</td>  
                                     <td>{device.procesador}</td>  
                                     <td>{device.fecha_registro}</td>  
                                     <td>{device.id_usuario}</td>  
                                </tr>
                            ))
                        }
                        
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

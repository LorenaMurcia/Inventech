const api = 'http://localhost:3004'

const getAllMarcas = async () => {
    const response = await fetch(`${api}/api/marca`)
    if (!response.ok) {
        throw new Error('Error en la conexion');
    }
    return response.json();
};

export default getAllMarcas
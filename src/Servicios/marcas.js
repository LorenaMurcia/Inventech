const api = 'https://inventech-back.vercel.app'

const getAllMarcas = async () => {
    const response = await fetch(`${api}/api/marca`)
    if (!response.ok) {
        throw new Error('Error en la conexion');
    }
    return response.json();
};

export default getAllMarcas
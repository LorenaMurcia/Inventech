//import env from "react-dontenv";

const api = 'http://localhost:3004'

const getAllEquipos = async () => {
    const response = await fetch(`${api}/api/equipos`)
    if(!response.ok){
        throw new Error('Error en la conexión');
    }
    return response.json();
};

export default getAllEquipos
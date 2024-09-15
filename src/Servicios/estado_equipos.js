const api = 'http://localhost:3004'

const getAllEquipos = async () =>{
  const response = await fetch(`${api}/api/estado_equipos`)
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();
}

export default getAllEquipos;
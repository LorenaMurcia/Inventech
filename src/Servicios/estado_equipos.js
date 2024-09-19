const api = 'inventech-back.vercel.app'

const getAllEstadoEquipos = async () => {
  const response = await fetch(`${api}/api/estado_equipos`)
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();
}

export { getAllEstadoEquipos };
const api = 'http://localhost:3004'

const getRoles = async ()=>{
const response = await fetch(`${api}/api/roles`)
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();
}

export {getRoles};

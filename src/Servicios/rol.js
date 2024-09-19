const api = 'inventech-back.vercel.app'

const getRoles = async ()=>{
const response = await fetch(`${api}/api/roles`)
  if (!response.ok) {
    throw new Error('Error en la conexion');
  }
  return response.json();
}

export {getRoles};

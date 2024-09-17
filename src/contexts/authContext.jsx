import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Crear el contexto de autenticación
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [usuario, setUsuario] = useState(null);  // Estado para almacenar el rol

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);

      // Decodificar el token para obtener el rol
      try {
        if (storedToken?.split('.').length !== 3) {
            throw new Error('Token format is invalid');
          }
        // Decodificar el token para obtener el rol
        const decoded = jwtDecode(storedToken);
        setRole(decoded.id_rol);  // Asignar el rol del token decodificado
        setUsuario(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
        // Opcional: manejar el error de forma apropiada, como redirigir al usuario o limpiar el almacenamiento
      }
    }
  }, []);

  const login = (newToken) => {
    setIsAuthenticated(true);
    setToken(newToken);
    localStorage.setItem('authToken', newToken);

    // Decodificar el token para obtener el rol
    try {
        if (newToken?.split('.').length !== 3) {
            throw new Error('Token format is invalid');
          }
        // Decodificar el token para obtener el rol
        const decoded = jwtDecode(newToken);
        setRole(decoded.id_rol);  // Asignar el rol del token decodificado
      } catch (error) {
        console.error('Error decoding token:', error);
        // Opcional: manejar el error de forma apropiada, como redirigir al usuario o limpiar el almacenamiento
      }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setRole(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, usuario, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContextProvider;

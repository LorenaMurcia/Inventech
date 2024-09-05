# Inventech

Este proyecto es una aplicación desarrollada con React, utilizando Vite como el framework de construcción, Tailwind CSS para el diseño de la interfaz, y DaisyUI como un complemento para componentes UI estilizados.

## Tecnologías

- **React**: Biblioteca para construir interfaces de usuario: [https://reactjs.org/](https://reactjs.org/)
- **Vite**: Herramienta rápida de desarrollo para proyectos web: [https://vitejs.dev/](https://vitejs.dev/)
- **Tailwind CSS**: Framework CSS para diseño rápido y eficiente:  [https://tailwindcss.com/](https://tailwindcss.com/)
- **DaisyUI**: Extensión de Tailwind CSS que proporciona componentes predefinidos y accesibles: [https://daisyui.com/](https://daisyui.com/components/)

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js**: [Descargar e instalar Node.js](https://nodejs.org/)
- **Git**: [Descargar e instalar Git](https://git-scm.com/)

## Instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu máquina local:

1. **Clona el repositorio**:

   ```
   git clone https://github.com/JStewardGT/Inventech.git
   ```

2. **Navega al directorio del proyecto**:

   ```
   cd Inventech
   ```

3. **Instala las dependencias**:

   ```
   npm install
   ```

4. **Inicia el servidor de desarrollo**:

   ```
   npm run dev
   ```

5. **Accede a la aplicación**:

   Abre tu navegador y ve a `http://localhost:5173` para ver la aplicación en acción.

## Estructura del Proyecto

La estructura básica del proyecto es la siguiente:

```
Inventech/
│
├── src/
│   ├── assets/          # Recursos como imágenes y estilos
│   ├── Components/      # Componentes reutilizables de React
│   ├── contexts/        # Proveedores de contexto para la aplicación
│   ├── Pages/           # Páginas principales de la aplicación
│   ├── App.jsx          # Componente principal de React
│   ├── index.css        # Estilos globales
│   ├── output.css       # Archivo CSS generado por Tailwind
│   ├── menu.jsx         # Componente de menú de la aplicación
│   └── main.jsx         # Archivo de entrada
│
├── .gitignore           # Archivos y directorios que Git debe ignorar
├── eslint.config.js     # Configuración de ESLint
├── index.html           # Documento HTML principal
├── package.json         # Dependencias y scripts del proyecto
├── postcss.config.js    # Configuración de PostCSS
├── tailwind.config.js   # Configuración de Tailwind CSS
├── vite.config.js       # Configuración de Vite
└── README.md            # Documentación del proyecto
```

## Personalización

Puedes personalizar el diseño y los componentes siguiendo estas configuraciones:

- **Tailwind CSS**: Modifica el archivo `tailwind.config.js` para personalizar los colores, fuentes, y otras utilidades.
- **DaisyUI**: DaisyUI se integra directamente con Tailwind CSS, por lo que puedes extender o personalizar sus componentes en el mismo archivo `tailwind.config.js`.

## Despliegue

Para desplegar el proyecto en un entorno de producción, sigue estos pasos:

1. **Genera la versión de producción**:

   ```
   npm run build
   ```

2. **Sirve la aplicación**:
   Puedes servir la carpeta `dist` generada con cualquier servidor web estático.

## Contribuciones

Las contribuciones son bienvenidas. Si tienes alguna mejora o corrección, por favor, realiza un **fork** del repositorio, crea una **rama** para tu funcionalidad o corrección, y luego envía un **pull request**.

Este proyecto ha sido desarrollado por:

- **Wendy Medina**
- **Sergio Lopez**
- **Lorena Murcia**
- **Johan Galeano**

## Licencia

Este proyecto está bajo la licencia MIT.

---

¡Gracias por contribuir y ser parte de **Inventech**!

import app from './app';
import { config } from 'dotenv';

// Cargar variables de entorno
config();

// Puerto de la aplicación
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Documentación API: http://localhost:${PORT}/api-docs`);
});
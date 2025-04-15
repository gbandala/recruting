import { Request, Response, NextFunction } from 'express';

/**
 * Lista de orígenes permitidos para CORS
 */
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'https://app.tudominio.com'
];

/**
 * Middleware para establecer los encabezados de acceso a credenciales
 * Esto es importante cuando se trabaja con cookies y autenticación
 */
export const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  
  // Verifica si el origen de la solicitud está en la lista de permitidos
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  }
  
  next();
};
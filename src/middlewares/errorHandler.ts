import { Request, Response, NextFunction } from 'express';

/**
 * Interfaz para errores con código HTTP
 */
interface IHttpError extends Error {
  statusCode?: number;
}

/**
 * Middleware para manejo global de errores
 */
export const errorHandler = (
  err: IHttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(statusCode).json({
    error: {
      message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  });
};

/**
 * Middleware para manejar rutas no encontradas
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    error: {
      message: `No se encontró la ruta: ${req.method} ${req.originalUrl}`
    }
  });
};
import { createLogger, format, transports } from 'winston';
import { EnvironmentEnum } from '../enums';

// Cargar el entorno de la app
const environment = process.env.NODE_ENV || EnvironmentEnum.DEVELOPMENT;

/**
 * Configuración del logger para la aplicación
 */
const Logger = createLogger({
  level: environment === EnvironmentEnum.DEVELOPMENT ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'api-reclutamiento' },
  transports: [
    // Escribir todos los logs con nivel info y más graves a la consola
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      )
    })
  ]
});

// Si estamos en producción, también escribimos a un archivo
if (environment === EnvironmentEnum.PRODUCTION) {
  Logger.add(
    new transports.File({ filename: 'logs/error.log', level: 'error' })
  );
  Logger.add(
    new transports.File({ filename: 'logs/combined.log' })
  );
}

/**
 * Función para registrar errores
 * @param error Error a registrar
 * @param contexto Información adicional de contexto
 */
export const logError = (error: Error, contexto?: any) => {
  Logger.error({
    message: error.message,
    stack: error.stack,
    context: contexto || {}
  });
};

/**
 * Función para registrar información
 * @param mensaje Mensaje a registrar
 * @param datos Datos adicionales
 */
export const logInfo = (mensaje: string, datos?: any) => {
  Logger.info({
    message: mensaje,
    data: datos || {}
  });
};

/**
 * Función para registrar advertencias
 * @param mensaje Mensaje de advertencia
 * @param datos Datos adicionales
 */
export const logWarning = (mensaje: string, datos?: any) => {
  Logger.warn({
    message: mensaje,
    data: datos || {}
  });
};

/**
 * Función para registrar mensajes de depuración
 * @param mensaje Mensaje de depuración
 * @param datos Datos adicionales
 */
export const logDebug = (mensaje: string, datos?: any) => {
  if (environment === EnvironmentEnum.DEVELOPMENT) {
    Logger.debug({
      message: mensaje,
      data: datos || {}
    });
  }
};
const Log = (operation:string,error:any)=>{
  return {
      operation:operation,
      error:error,
      // ip:request.ip,
      // url:request.originalUrl,
      // params:request.params,
      // body:maskAttributeValue(request.body,attributesToMask),
      // query:request.query,
      // headers:maskAttributeValue(request.headers,attributesToMask)
  };
};

export {Log,Logger};
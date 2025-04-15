import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

/**
 * Middleware para validar los datos de entrada según un esquema Joi
 * @param schema Esquema Joi para validar
 */
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessages = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        mensaje: 'Datos de entrada inválidos',
        errores: errorMessages
      });
    }

    next();
  };
};
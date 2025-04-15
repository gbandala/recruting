import Joi from 'joi';

/**
 * Esquema de validación para la creación de una llamada
 */
export const llamadaSchema = Joi.object({
  nombre: Joi.string().required().messages({
    'string.empty': 'El nombre es requerido',
    'any.required': 'El nombre es requerido'
  }),
  entrevistador: Joi.string().required().messages({
    'string.empty': 'El entrevistador es requerido',
    'any.required': 'El entrevistador es requerido'
  }),
  nivel: Joi.string().required().messages({
    'string.empty': 'El nivel es requerido',
    'any.required': 'El nivel es requerido'
  }),
  promocion: Joi.boolean().default(false),
  resumen: Joi.string().allow('', null),
  conocimiento: Joi.string().allow('', null),
  telefono: Joi.string()
    .required()
    .messages({
      'any.required': 'El teléfono es requerido',
      'telefono.incompleto': 'El número telefónico debe tener al menos 10 dígitos',
      'telefono.invalido': 'El teléfono debe ser un número o una cadena con formato de teléfono'
    }),
  personalidad: Joi.string().allow('', null),
  transcripcion: Joi.string().allow('', null),
  termino: Joi.boolean().default(false)
});

/**
 * Esquema de validación para la actualización de una llamada
 */
export const actualizarLlamadaSchema = Joi.object({
  nombre: Joi.string().messages({
    'string.empty': 'El nombre no puede estar vacío'
  }),
  entrevistador: Joi.string().messages({
    'string.empty': 'El entrevistador no puede estar vacío'
  }),
  nivel: Joi.string().messages({
    'string.empty': 'El nivel no puede estar vacío'
  }),
  promocion: Joi.boolean(),
  resumen: Joi.string().allow('', null),
  conocimiento: Joi.string().allow('', null),
  telefono: Joi.number().messages({
    'number.base': 'El teléfono debe ser un número'
  }),
  personalidad: Joi.string().allow('', null),
  transcripcion: Joi.string().allow('', null),
  termino: Joi.boolean()
}).min(1).messages({
  'object.min': 'Debe proporcionar al menos un campo para actualizar'
});
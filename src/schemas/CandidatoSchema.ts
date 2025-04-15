import Joi from 'joi';
import { EstadoCandidatoEnum } from '../enums';

/**
 * Esquema de validación para la creación de un candidato
 */
export const candidatoSchema = Joi.object({
  nombre: Joi.string().required().messages({
    'string.empty': 'El nombre es requerido',
    'any.required': 'El nombre es requerido'
  }),
  segundo_nombre: Joi.string().allow('', null),
  apellido_paterno: Joi.string().required().messages({
    'string.empty': 'El apellido paterno es requerido',
    'any.required': 'El apellido paterno es requerido'
  }),
  apellido_materno: Joi.string().allow('', null),
  email: Joi.string().email().required().messages({
    'string.empty': 'El email es requerido',
    'any.required': 'El email es requerido',
    'string.email': 'El email no tiene un formato válido'
  }),
  telefono: Joi.string()
    .required()
    .messages({
      'any.required': 'El teléfono es requerido',
      'telefono.incompleto': 'El número telefónico debe tener al menos 10 dígitos',
      'telefono.invalido': 'El teléfono debe ser un número o una cadena con formato de teléfono'
    }),
  estado: Joi.string().valid(
    EstadoCandidatoEnum.APROBADO,
    EstadoCandidatoEnum.ENROLAMIENTO,
    EstadoCandidatoEnum.ENTREVISTA,
    EstadoCandidatoEnum.LLAMADA,
    EstadoCandidatoEnum.PAUSADO,
    EstadoCandidatoEnum.RECHAZADO
  ).default(EstadoCandidatoEnum.LLAMADA),
  fecha: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).allow('', null).messages({
    'string.pattern.base': 'La fecha debe tener el formato YYYY-MM-DD'
  }),
  hora: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).allow('', null).messages({
    'string.pattern.base': 'La hora debe tener el formato HH:MM o HH:MM:SS'
  }),
  llamar_ahora: Joi.boolean().default(false)
});

/**
 * Esquema de validación para la actualización de un candidato
 */
export const actualizarCandidatoSchema = Joi.object({
  email: Joi.string().email().messages({
    'string.email': 'El email no tiene un formato válido',
    'string.empty': 'El email no puede estar vacío'
  }),
  telefono: Joi.any()
    .messages({
      'telefono.incompleto': 'El número telefónico debe tener al menos 10 dígitos',
      'telefono.invalido': 'El teléfono debe ser un número o una cadena con formato de teléfono'
    }),
  fecha: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).allow('', null).messages({
    'string.pattern.base': 'La fecha debe tener el formato YYYY-MM-DD'
  }),
  hora: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).allow('', null).messages({
    'string.pattern.base': 'La hora debe tener el formato HH:MM o HH:MM:SS'
  }),
  llamar_ahora: Joi.boolean()
}).min(1).messages({
  'object.min': 'Debe proporcionar al menos un campo para actualizar'
});
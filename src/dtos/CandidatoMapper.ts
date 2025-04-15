import { Candidato } from '../models/Candidato';
import { CandidatoResponseDTO, CrearCandidatoDTO, ActualizarCandidatoDTO } from './CandidatoDTO';
import { Request } from 'express';
import { EstadoCandidatoEnum } from '../enums';

/**
 * Clase para mappear entre modelos y DTOs de Candidato
 */
export class CandidatoMapper {
  /**
   * Crea un DTO a partir de un request
   */
/**
 * Crea un DTO a partir de un request
 */
static fromRequest(req: Request): CrearCandidatoDTO {
  const dto = new CrearCandidatoDTO();
  const body = req.body;
  
  dto.nombre = body.nombre;
  dto.segundo_nombre = body.segundo_nombre;
  dto.apellido_paterno = body.apellido_paterno;
  dto.apellido_materno = body.apellido_materno;
  dto.email = body.email;
  
  // Procesar el teléfono - extraer solo números si es una cadena
  if (typeof body.telefono === 'string') {
    const soloNumeros = body.telefono.replace(/[^\d]/g, '');
    dto.telefono = parseInt(soloNumeros, 10);
  } else {
    dto.telefono = body.telefono;
  }
  
  if(body.estado === undefined) {
    dto.estado = EstadoCandidatoEnum.ENROLAMIENTO; // Valor por defecto
    } else {
    dto.estado = body.estado as EstadoCandidatoEnum;
    }

  // dto.estado = body.estado as EstadoCandidatoEnum;
  
  // Manejar fecha - si no viene o es null/indefinido, dejar undefined
  dto.fecha = body.fecha || null;
  
  // Manejar hora - si no viene o es null/indefinido, dejar undefined
  dto.hora = body.hora || null;
  
  // Validar que llamar_ahora sea un booleano, o usar false por defecto
  if (body.llamar_ahora === undefined) {
    dto.llamar_ahora = false;
  } else {
    // Convertir explícitamente a booleano
    dto.llamar_ahora = body.llamar_ahora === true || body.llamar_ahora === 'true';
  }
  
  return dto;
}
  
  /**
   * Crea un DTO de actualización a partir de un request
   */
  static fromRequestForUpdate(req: Request): ActualizarCandidatoDTO {
    const dto = new ActualizarCandidatoDTO();
    const body = req.body;
    
    if (body.nombre !== undefined) dto.nombre = body.nombre;
    if (body.segundo_nombre !== undefined) dto.segundo_nombre = body.segundo_nombre;
    if (body.apellido_paterno !== undefined) dto.apellido_paterno = body.apellido_paterno;
    if (body.apellido_materno !== undefined) dto.apellido_materno = body.apellido_materno;
    if (body.email !== undefined) dto.email = body.email;
      // Procesar el teléfono - extraer solo números si es una cadena
  if (typeof body.telefono === 'string') {
    const soloNumeros = body.telefono.replace(/[^\d]/g, '');
    dto.telefono = parseInt(soloNumeros, 10);
  } else {
    dto.telefono = body.telefono;
  }
    // if (body.telefono !== undefined) dto.telefono = body.telefono;
    if (body.estado !== undefined) dto.estado = body.estado as EstadoCandidatoEnum;
    
    // Manejar fecha - explícitamente asignar undefined si es null o cadena vacía
    if (body.fecha !== undefined) {
      dto.fecha = body.fecha === null || body.fecha === '' ? null : body.fecha;
    }
    
    // Manejar hora - explícitamente asignar undefined si es null o cadena vacía
    if (body.hora !== undefined) {
      dto.hora = body.hora === null || body.hora === '' ? null : body.hora;
    }
    
    // Si llamar_ahora está definido en el body, lo procesamos
    if (body.llamar_ahora !== undefined) {
      // Convertir explícitamente a booleano
      dto.llamar_ahora = body.llamar_ahora === true || body.llamar_ahora === 'true';
    }
    
    return dto;
  }

  /**
   * Convierte un DTO de creación a un modelo
   */
  static toCandidato(dto: CrearCandidatoDTO): Candidato {
    const candidato = new Candidato();
    candidato.nombre = dto.nombre;
    candidato.segundo_nombre = dto.segundo_nombre;
    candidato.apellido_paterno = dto.apellido_paterno;
    candidato.apellido_materno = dto.apellido_materno? dto.apellido_materno: null;
    candidato.email = dto.email;
    candidato.telefono = dto.telefono;
    candidato.estado = dto.estado;
    candidato.fecha = dto.fecha ? new Date(dto.fecha) : null;
    candidato.hora = dto.hora? dto.hora : null;
    candidato.llamar_ahora = dto.llamar_ahora || false;
    
    return candidato;
  }

  /**
   * Aplica actualizaciones de un DTO a un modelo existente
   */
  static applyUpdates(candidato: Candidato, dto: ActualizarCandidatoDTO): Candidato {
    if (dto.nombre !== undefined) candidato.nombre = dto.nombre;
    if (dto.segundo_nombre !== undefined) candidato.segundo_nombre = dto.segundo_nombre;
    if (dto.apellido_paterno !== undefined) candidato.apellido_paterno = dto.apellido_paterno;
    if (dto.apellido_materno !== undefined) candidato.apellido_materno = dto.apellido_materno;
    if (dto.email !== undefined) candidato.email = dto.email;
    if (dto.telefono !== undefined) candidato.telefono = dto.telefono;
    if (dto.estado !== undefined) candidato.estado = dto.estado;
    if (dto.fecha !== undefined) candidato.fecha = dto.fecha ? new Date(dto.fecha) : null;
    if (dto.hora !== undefined) candidato.hora = dto.hora;
    if (dto.llamar_ahora !== undefined) candidato.llamar_ahora = dto.llamar_ahora;
    
    return candidato;
  }

  /**
   * Convierte un modelo a un DTO de respuesta
   */
  static toResponseDTO(candidato: Candidato): CandidatoResponseDTO {
    const response = new CandidatoResponseDTO();
    
    response.id = candidato.id;
    response.created_at = candidato.created_at.toISOString();
    response.nombre = candidato.nombre;
    response.segundo_nombre = candidato.segundo_nombre;
    response.apellido_paterno = candidato.apellido_paterno;
    response.apellido_materno = candidato.apellido_materno;
    response.email = candidato.email;
    response.telefono = candidato.telefono;
    response.estado = candidato.estado;
    response.fecha = candidato.fecha ? candidato.fecha : null;
    response.hora = candidato.hora;
    response.llamar_ahora = candidato.llamar_ahora;
    
    // Crear nombre completo
    let nombreCompleto = candidato.nombre;
    if (candidato.segundo_nombre) nombreCompleto += ` ${candidato.segundo_nombre}`;
    nombreCompleto += ` ${candidato.apellido_paterno}`;
    if (candidato.apellido_materno) nombreCompleto += ` ${candidato.apellido_materno}`;
    response.nombre_completo = nombreCompleto;
    
    return response;
  }

  /**
   * Convierte una lista de modelos a una lista de DTOs de respuesta
   */
  static toResponseDTOList(candidatos: Candidato[]): CandidatoResponseDTO[] {
    return candidatos.map(this.toResponseDTO);
  }
}
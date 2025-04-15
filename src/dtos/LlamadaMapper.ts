import { Llamada } from '../models/Llamada';
import { LlamadaResponseDTO, CrearLlamadaDTO, ActualizarLlamadaDTO } from './LlamadaDTO';
import { Request } from 'express';

/**
 * Clase para mappear entre modelos y DTOs de Llamada
 */
export class LlamadaMapper {
  /**
   * Crea un DTO a partir de un request
   */
  static fromRequest(req: Request): CrearLlamadaDTO {
    const dto = new CrearLlamadaDTO();
    const body = req.body;
    
    // Campos de texto obligatorios
    dto.nombre = body.nombre;
    dto.entrevistador = body.entrevistador;
    dto.nivel = body.nivel;
    
    // Campos de texto opcionales
    dto.resumen = body.resumen || '';
    dto.conocimiento = body.conocimiento || '';
    dto.personalidad = body.personalidad || '';
    dto.transcripcion = body.transcripcion || '';
    
    // Procesar el teléfono - extraer solo números si es una cadena
    if (typeof body.telefono === 'string') {
      const soloNumeros = body.telefono.replace(/[^\d]/g, '');
      dto.telefono = parseInt(soloNumeros, 10);
    } else {
      dto.telefono = body.telefono;
    }
    
    // Campos booleanos con valores por defecto
    if (body.promocion === undefined) {
      dto.promocion = false;
    } else {
      // Convertir explícitamente a booleano
      dto.promocion = body.promocion === true || body.promocion === 'true';
    }
    
    if (body.termino === undefined) {
      dto.termino = false;
    } else {
      // Convertir explícitamente a booleano
      dto.termino = body.termino === true || body.termino === 'true';
    }
    
    return dto;
  }
  
  /**
   * Crea un DTO de actualización a partir de un request
   */
  static fromRequestForUpdate(req: Request): ActualizarLlamadaDTO {
    const dto = new ActualizarLlamadaDTO();
    const body = req.body;
    
    // Campos de texto
    if (body.nombre !== undefined) dto.nombre = body.nombre;
    if (body.entrevistador !== undefined) dto.entrevistador = body.entrevistador;
    if (body.nivel !== undefined) dto.nivel = body.nivel;
    if (body.resumen !== undefined) dto.resumen = body.resumen;
    if (body.conocimiento !== undefined) dto.conocimiento = body.conocimiento;
    if (body.personalidad !== undefined) dto.personalidad = body.personalidad;
    if (body.transcripcion !== undefined) dto.transcripcion = body.transcripcion;
    
    // Procesar el teléfono - extraer solo números si es una cadena
    if (body.telefono !== undefined) {
      if (typeof body.telefono === 'string') {
        const soloNumeros = body.telefono.replace(/[^\d]/g, '');
        dto.telefono = parseInt(soloNumeros, 10);
      } else {
        dto.telefono = body.telefono;
      }
    }
    
    // Campos booleanos
    if (body.promocion !== undefined) {
      dto.promocion = body.promocion === true || body.promocion === 'true';
    }
    
    if (body.termino !== undefined) {
      dto.termino = body.termino === true || body.termino === 'true';
    }
    
    return dto;
  }

  /**
   * Convierte un DTO de creación a un modelo
   */
  static toLlamada(dto: CrearLlamadaDTO): Llamada {
    const llamada = new Llamada();
    llamada.nombre = dto.nombre;
    llamada.entrevistador = dto.entrevistador;
    llamada.nivel = dto.nivel;
    llamada.promocion = dto.promocion ?? false;
    llamada.resumen = dto.resumen || '';
    llamada.conocimiento = dto.conocimiento || '';
    llamada.telefono = dto.telefono;
    llamada.personalidad = dto.personalidad || '';
    llamada.transcripcion = dto.transcripcion || '';
    llamada.termino = dto.termino ?? false;
    
    return llamada;
  }

  /**
   * Aplica actualizaciones de un DTO a un modelo existente
   */
  static applyUpdates(llamada: Llamada, dto: ActualizarLlamadaDTO): Llamada {
    if (dto.nombre !== undefined) llamada.nombre = dto.nombre;
    if (dto.entrevistador !== undefined) llamada.entrevistador = dto.entrevistador;
    if (dto.nivel !== undefined) llamada.nivel = dto.nivel;
    if (dto.promocion !== undefined) llamada.promocion = dto.promocion;
    if (dto.resumen !== undefined) llamada.resumen = dto.resumen;
    if (dto.conocimiento !== undefined) llamada.conocimiento = dto.conocimiento;
    if (dto.telefono !== undefined) llamada.telefono = dto.telefono;
    if (dto.personalidad !== undefined) llamada.personalidad = dto.personalidad;
    if (dto.transcripcion !== undefined) llamada.transcripcion = dto.transcripcion;
    if (dto.termino !== undefined) llamada.termino = dto.termino;
    
    return llamada;
  }

  /**
   * Convierte un modelo a un DTO de respuesta
   */
  static toResponseDTO(llamada: Llamada): LlamadaResponseDTO {
    const response = new LlamadaResponseDTO();
    
    response.id = llamada.id;
    response.created_at = llamada.created_at.toISOString();
    response.nombre = llamada.nombre;
    response.entrevistador = llamada.entrevistador;
    response.nivel = llamada.nivel;
    response.promocion = llamada.promocion;
    response.resumen = llamada.resumen;
    response.conocimiento = llamada.conocimiento;
    response.telefono = llamada.telefono;
    response.personalidad = llamada.personalidad;
    response.transcripcion = llamada.transcripcion;
    response.termino = llamada.termino;
    
    return response;
  }

  /**
   * Convierte una lista de modelos a una lista de DTOs de respuesta
   */
  static toResponseDTOList(llamadas: Llamada[]): LlamadaResponseDTO[] {
    return llamadas.map(llamada => this.toResponseDTO(llamada));
  }
}
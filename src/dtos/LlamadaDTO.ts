/**
 * DTO para creación de una llamada
 */
export class CrearLlamadaDTO {
  nombre: string;
  entrevistador: string;
  nivel: string;
  promocion?: boolean;
  resumen?: string;
  conocimiento?: string;
  telefono: number;
  personalidad?: string;
  transcripcion?: string;
  termino?: boolean;
}

/**
 * DTO para actualización de una llamada
 */
export class ActualizarLlamadaDTO {
  nombre?: string;
  entrevistador?: string;
  nivel?: string;
  promocion?: boolean;
  resumen?: string;
  conocimiento?: string;
  telefono?: number;
  personalidad?: string;
  transcripcion?: string;
  termino?: boolean;
}

/**
 * DTO para respuesta de una llamada
 */
export class LlamadaResponseDTO {
  id: number;
  created_at: string;
  nombre: string;
  entrevistador: string;
  nivel: string;
  promocion: boolean;
  resumen: string;
  conocimiento: string;
  telefono: number;
  personalidad: string;
  transcripcion: string;
  termino: boolean;
}
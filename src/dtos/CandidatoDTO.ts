import { EstadoCandidatoEnum } from '../enums';

/**
 * DTO para creación de un candidato
 */
export class CandidatoDTO {
  id: number;
  created_at: Date;
  updated_at: Date;
  nombre: string;
  segundo_nombre?: string;
  apellido_paterno: string;
  apellido_materno?: string;
  email: string;
  telefono: number;
  estado: EstadoCandidatoEnum;
  fecha?: Date;
  hora?: string;
  llamar_ahora?: boolean;
}

export class CrearCandidatoDTO {
  // constructor(body: any) {
  //   this.nombre = body.nombre;
  //   this.segundo_nombre = body.segundo_nombre;
  //   this.apellido_paterno = body.apellido_paterno;
  //   this.apellido_materno = body.apellido_materno;
  //   this.email = body.email;
  //   this.telefono = body.telefono;
  //   this.estado = body.estado;
  //   this.fecha = body.fecha;
  //   this.hora = body.hora;
  //   this.llamar_ahora = body.llamar_ahora;
  // }
  nombre: string;
  segundo_nombre?: string;
  apellido_paterno: string;
  apellido_materno?: string;
  email: string;
  telefono: number;
  estado: EstadoCandidatoEnum;
  fecha?: Date;
  hora?: string;
  llamar_ahora?: boolean;
}

/**
 * DTO para actualización de un candidato
 */
export class ActualizarCandidatoDTO {
  nombre?: string;
  segundo_nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  email?: string;
  telefono?: number;
  estado?: EstadoCandidatoEnum;
  fecha?: Date;
  hora?: string;
  llamar_ahora?: boolean;
}

/**
 * DTO para respuesta de un candidato
 */
export class CandidatoResponseDTO {
  id: number;
  created_at: string;
  nombre: string;
  segundo_nombre?: string;
  apellido_paterno: string;
  apellido_materno?: string;
  email: string;
  telefono: number;
  estado: EstadoCandidatoEnum;
  fecha?: Date;
  hora?: string;
  llamar_ahora: boolean;
  nombre_completo: string;
}
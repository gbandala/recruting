/**
 * Clase de utilidades para funciones comunes
 */
export class Helpers {
    /**
     * Formatea un número como un string de teléfono
     * @param telefono Número telefónico a formatear
     * @returns String formateado
     */
    static formatearTelefono(telefono: number): string {
      // Convierte a string para asegurar el formato
      const telefonoStr = telefono.toString();
      
      // Si es un número de 10 dígitos (formato mexicano)
      if (telefonoStr.length === 10) {
        return `(${telefonoStr.substring(0, 3)}) ${telefonoStr.substring(3, 6)}-${telefonoStr.substring(6)}`;
      }
      
      // Si no tiene un formato específico, devuelve como está
      return telefonoStr;
    }
  
    /**
     * Genera un nombre completo a partir de componentes
     * @param nombre Nombre principal
     * @param segundoNombre Segundo nombre (opcional)
     * @param apellidoPaterno Apellido paterno
     * @param apellidoMaterno Apellido materno (opcional)
     * @returns Nombre completo formateado
     */
    static generarNombreCompleto(
      nombre: string,
      segundoNombre?: string,
      apellidoPaterno?: string,
      apellidoMaterno?: string
    ): string {
      let nombreCompleto = nombre;
      
      if (segundoNombre) {
        nombreCompleto += ` ${segundoNombre}`;
      }
      
      if (apellidoPaterno) {
        nombreCompleto += ` ${apellidoPaterno}`;
      }
      
      if (apellidoMaterno) {
        nombreCompleto += ` ${apellidoMaterno}`;
      }
      
      return nombreCompleto;
    }
  
    /**
     * Verifica si una fecha es en el pasado
     * @param fecha Fecha a verificar
     * @returns true si la fecha es en el pasado
     */
    static esFechaEnPasado(fecha: Date): boolean {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      
      const fechaComparar = new Date(fecha);
      fechaComparar.setHours(0, 0, 0, 0);
      
      return fechaComparar < hoy;
    }
  
    /**
     * Extrae la fecha en formato YYYY-MM-DD
     * @param fecha Fecha a formatear
     * @returns String con fecha formateada
     */
    static formatearFecha(fecha: Date): string {
      return fecha.toISOString().split('T')[0];
    }
  
    /**
     * Convierte un string de hora (HH:MM:SS) a un objeto con horas y minutos
     * @param hora String de hora (HH:MM:SS o HH:MM)
     * @returns Objeto con horas y minutos
     */
    static parseHora(hora: string): { horas: number; minutos: number } {
      const [horasStr, minutosStr] = hora.split(':');
      return {
        horas: parseInt(horasStr, 10),
        minutos: parseInt(minutosStr, 10)
      };
    }
  }
  // libs/helpers.ts

export const responseData = (status: number, message: string, data: any) => {
  return {
    status,
    message,
    data
  };
};

export const responseError = (status: number, message: string, error: any) => {
  return {
    status,
    message,
    error
  };
};

// Otras funciones de ayuda según sea necesario
export const makeid = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../package.json';

/**
 * Opciones para la configuración de Swagger
 */
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Reclutamiento - Gestión de Candidatos y Llamadas',
      version,
      description: 'API REST para la gestión de candidatos y llamadas de reclutamiento',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Soporte',
        url: 'https://empresa.com',
        email: 'soporte@empresa.com',
      },
    },
    servers: [
      {
        url: '',
        description: 'API Server',
      },
    ],
    components: {
      schemas: {
        EstadoCandidato: {
          type: 'string',
          enum: ['aprobado', 'enrolamiento', 'entrevista', 'llamada', 'pausado', 'rechazado'],
          description: 'Estados posibles para un candidato',
        },
        CrearCandidatoDTO: {
          type: 'object',
          required: ['nombre', 'apellido_paterno', 'email', 'telefono'],
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre del candidato',
              example: 'Juan',
            },
            segundo_nombre: {
              type: 'string',
              description: 'Segundo nombre del candidato (opcional)',
              example: 'Carlos',
              nullable: true,
            },
            apellido_paterno: {
              type: 'string',
              description: 'Apellido paterno del candidato',
              example: 'Pérez',
            },
            apellido_materno: {
              type: 'string',
              description: 'Apellido materno del candidato (opcional)',
              example: 'Gómez',
              nullable: true,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del candidato',
              example: 'juan.perez@ejemplo.com',
            },
            telefono: {
              type: 'number',
              description: 'Número telefónico del candidato',
              example: 5555555555,
            },
            estado: {
              $ref: '#/components/schemas/EstadoCandidato',
              description: 'Estado actual del candidato (predeterminado: llamada)',
            },
            fecha: {
              type: 'string',
              format: 'date',
              description: 'Fecha programada para la próxima interacción',
              example: '2023-10-15',
              nullable: true,
            },
            hora: {
              type: 'string',
              format: 'time',
              description: 'Hora programada para la próxima interacción',
              example: '14:30',
              nullable: true,
            },
            llamar_ahora: {
              type: 'boolean',
              description: 'Indica si el candidato debe ser llamado lo antes posible',
              default: false,
            },
          },
        },
        ActualizarCandidatoDTO: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre del candidato',
              example: 'Juan',
            },
            segundo_nombre: {
              type: 'string',
              description: 'Segundo nombre del candidato',
              example: 'Carlos',
              nullable: true,
            },
            apellido_paterno: {
              type: 'string',
              description: 'Apellido paterno del candidato',
              example: 'Pérez',
            },
            apellido_materno: {
              type: 'string',
              description: 'Apellido materno del candidato',
              example: 'Gómez',
              nullable: true,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del candidato',
              example: 'juan.perez@ejemplo.com',
            },
            telefono: {
              type: 'number',
              description: 'Número telefónico del candidato',
              example: 5555555555,
            },
            estado: {
              $ref: '#/components/schemas/EstadoCandidato',
              description: 'Estado actual del candidato',
            },
            fecha: {
              type: 'string',
              format: 'date',
              description: 'Fecha programada para la próxima interacción',
              example: '2023-10-15',
              nullable: true,
            },
            hora: {
              type: 'string',
              format: 'time',
              description: 'Hora programada para la próxima interacción',
              example: '14:30',
              nullable: true,
            },
            llamar_ahora: {
              type: 'boolean',
              description: 'Indica si el candidato debe ser llamado lo antes posible',
            },
          },
        },
        CrearLlamadaDTO: {
          type: 'object',
          required: ['nombre', 'entrevistador', 'nivel', 'telefono'],
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre completo del entrevistado',
              example: 'Juan García Pérez',
            },
            entrevistador: {
              type: 'string',
              description: 'Nombre del entrevistador',
              example: 'Ana Reclutadora',
            },
            nivel: {
              type: 'string',
              description: 'Nivel técnico del candidato',
              example: 'Senior',
            },
            promocion: {
              type: 'boolean',
              description: 'Indica si el candidato es para promoción interna',
              default: false,
            },
            resumen: {
              type: 'string',
              description: 'Resumen de la llamada',
              example: 'Buena experiencia técnica',
              nullable: true,
            },
            conocimiento: {
              type: 'string',
              description: 'Conocimientos técnicos del candidato',
              example: 'Javascript, React, Node.js',
              nullable: true,
            },
            telefono: {
              type: 'number',
              description: 'Número telefónico de contacto',
              example: 5555555555,
            },
            personalidad: {
              type: 'string',
              description: 'Notas sobre la personalidad del candidato',
              example: 'Comunicativo',
              nullable: true,
            },
            transcripcion: {
              type: 'string',
              description: 'Transcripción de la llamada',
              example: 'Transcripción de la llamada...',
              nullable: true,
            },
            termino: {
              type: 'boolean',
              description: 'Indica si la llamada ha terminado',
              default: false,
            },
          },
        },
        ActualizarLlamadaDTO: {
          type: 'object',
          properties: {
            nombre: {
              type: 'string',
              description: 'Nombre completo del entrevistado',
              example: 'Juan García Pérez',
            },
            entrevistador: {
              type: 'string',
              description: 'Nombre del entrevistador',
              example: 'Ana Reclutadora',
            },
            nivel: {
              type: 'string',
              description: 'Nivel técnico del candidato',
              example: 'Senior',
            },
            promocion: {
              type: 'boolean',
              description: 'Indica si el candidato es para promoción interna',
            },
            resumen: {
              type: 'string',
              description: 'Resumen de la llamada',
              example: 'Buena experiencia técnica',
              nullable: true,
            },
            conocimiento: {
              type: 'string',
              description: 'Conocimientos técnicos del candidato',
              example: 'Javascript, React, Node.js',
              nullable: true,
            },
            telefono: {
              type: 'number',
              description: 'Número telefónico de contacto',
              example: 5555555555,
            },
            personalidad: {
              type: 'string',
              description: 'Notas sobre la personalidad del candidato',
              example: 'Comunicativo',
              nullable: true,
            },
            transcripcion: {
              type: 'string',
              description: 'Transcripción de la llamada',
              example: 'Transcripción de la llamada...',
              nullable: true,
            },
            termino: {
              type: 'boolean',
              description: 'Indica si la llamada ha terminado',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: 'Candidatos',
        description: 'Operaciones relacionadas con candidatos',
      },
      {
        name: 'Llamadas',
        description: 'Operaciones relacionadas con llamadas y entrevistas',
      },
    ],
  },
  apis: ['./src/routers/*.ts', './src/models/*.ts'],
};

/**
 * Especificación Swagger generada
 */
export const swaggerSpec = swaggerJSDoc(options);
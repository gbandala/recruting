import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import Database from "./libs/database";
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import candidatoRouter from './routers/CandidatoRouter';
import llamadaRouter from './routers/LlamadaRouter';
import { swaggerSpec } from './swagger';

// Cargar variables de entorno
config();

/**
 * Clase principal de la aplicación Express
 */
class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configureMiddlewares();
    this.configureRoutes();
    this.databaseSync();
    // this.configureErrorHandling();
  }

  /**
   * Configura los middlewares de la aplicación
   */
  private configureMiddlewares(): void {
    // Habilitar CORS
    this.app.use(cors());    
    // Mejorar seguridad HTTP
    this.app.use(helmet());    
    // Parsear JSON en las solicitudes
    this.app.use(express.json());    
    // Parsear datos codificados en URL
    this.app.use(express.urlencoded({ extended: true }));    
    // Logging de solicitudes HTTP
    this.app.use(morgan('dev'));
  }

  protected databaseSync(): void {
    const db = new Database();
    db.sequelize?.authenticate();
  };

  /**
   * Configura las rutas de la API
   */
  private configureRoutes(): void {
    // Ruta base de la API
    this.app.use('/api/candidatos', candidatoRouter);
    this.app.use('/api/llamadas', llamadaRouter);    
    // Ruta para la documentación Swagger
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));    
    // Ruta principal
    this.app.get('/', (req, res) => {
      res.json({
        message: 'API de Reclutamiento - Gestión de Candidatos',
        docs: '/api-docs'
      });
    });
  }

  /**
   * Configura el manejo de errores
   */
  // private configureErrorHandling(): void {
  //   // Manejador de rutas no encontradas
  //   this.app.use(notFoundHandler);    
  //   // Manejador global de errores
  //   this.app.use(errorHandler);
  // }
}

export default new App().app;
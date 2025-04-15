import { Router } from 'express';
import IRouter from './RouterInterface';

/**
 * Clase base para todos los routers
 */
abstract class BaseRouter implements IRouter {
  /**
   * Router de Express
   */
  public router: Router;

  /**
   * Constructor
   */
  constructor() {
    this.router = Router();
    this.routes();
  }

  /**
   * Método a implementar por las clases hijas para configurar rutas
   */
  abstract routes(): void;
}

export default BaseRouter;
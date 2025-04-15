/**
 * Interfaz base para todos los routers
 */
interface IRouter {
    /**
     * Configura las rutas para este router
     */
    routes(): void;
  }
  
  export default IRouter;
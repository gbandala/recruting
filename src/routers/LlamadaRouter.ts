import BaseRouter from './base/BaseRouter';
import { LlamadaController } from '../controllers/LlamadaController';
import { validate } from '../middlewares/validate';
import { llamadaSchema, actualizarLlamadaSchema } from '../schemas/LlamadaSchema';

/**
 * Router para gestionar las rutas de llamadas
 */
class LlamadaRouter extends BaseRouter {
  /**
   * Configura las rutas para llamadas
   */
  public routes(): void {
    /**
     * @swagger
     * /api/llamadas:
     *   get:
     *     summary: Obtener todas las llamadas
     *     tags: [Llamadas]
     *     responses:
     *       200:
     *         description: Lista de llamadas
     */
    this.router.get('/', LlamadaController.obtenerTodas);

    /**
     * @swagger
     * /api/llamadas/terminadas:
     *   get:
     *     summary: Obtener todas las llamadas terminadas
     *     tags: [Llamadas]
     *     responses:
     *       200:
     *         description: Lista de llamadas terminadas
     */
    this.router.get('/terminadas', LlamadaController.obtenerTerminadas);

    this.router.get('/promociones', LlamadaController.obtenerPromociones);

    this.router.get('/rechazos', LlamadaController.obtenerRechazos);

    /**
     * @swagger
     * /api/llamadas/pendientes:
     *   get:
     *     summary: Obtener todas las llamadas pendientes
     *     tags: [Llamadas]
     *     responses:
     *       200:
     *         description: Lista de llamadas pendientes
     */
    this.router.get('/pendientes', LlamadaController.obtenerPendientes);

    /**
     * @swagger
     * /api/llamadas/nivel/{nivel}:
     *   get:
     *     summary: Obtener llamadas por nivel
     *     tags: [Llamadas]
     *     parameters:
     *       - in: path
     *         name: nivel
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Lista de llamadas por nivel
     */
    this.router.get('/nivel/:nivel', LlamadaController.obtenerPorNivel);

    /**
     * @swagger
     * /api/llamadas/entrevistador/{entrevistador}:
     *   get:
     *     summary: Obtener llamadas por entrevistador
     *     tags: [Llamadas]
     *     parameters:
     *       - in: path
     *         name: entrevistador
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Lista de llamadas por entrevistador
     */
    this.router.get('/entrevistador/:entrevistador', LlamadaController.obtenerPorEntrevistador);

    /**
     * @swagger
     * /api/llamadas/{id}:
     *   get:
     *     summary: Obtener una llamada por ID
     *     tags: [Llamadas]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Detalles de la llamada
     *       404:
     *         description: Llamada no encontrada
     */
    this.router.get('/:id', LlamadaController.obtenerPorId);

    /**
     * @swagger
     * /api/llamadas:
     *   post:
     *     summary: Crear una nueva llamada
     *     tags: [Llamadas]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CrearLlamadaDTO'
     *     responses:
     *       201:
     *         description: Llamada creada exitosamente
     *       400:
     *         description: Datos de entrada inválidos
     */
    this.router.post('/', validate(llamadaSchema), LlamadaController.crear);

    /**
     * @swagger
     * /api/llamadas/{id}:
     *   put:
     *     summary: Actualizar una llamada existente
     *     tags: [Llamadas]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ActualizarLlamadaDTO'
     *     responses:
     *       200:
     *         description: Llamada actualizada exitosamente
     *       400:
     *         description: Datos de entrada inválidos
     *       404:
     *         description: Llamada no encontrada
     */
    this.router.put('/:id', validate(actualizarLlamadaSchema), LlamadaController.actualizar);

    /**
     * @swagger
     * /api/llamadas/{id}:
     *   delete:
     *     summary: Eliminar una llamada
     *     tags: [Llamadas]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Llamada eliminada exitosamente
     *       404:
     *         description: Llamada no encontrada
     */
    this.router.delete('/:id', LlamadaController.eliminar);

    /**
     * @swagger
     * /api/llamadas/{id}/terminar:
     *   patch:
     *     summary: Marcar una llamada como terminada
     *     tags: [Llamadas]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               termino:
     *                 type: boolean
     *     responses:
     *       200:
     *         description: Llamada marcada como terminada
     *       404:
     *         description: Llamada no encontrada
     */
    this.router.patch('/:id/terminar', LlamadaController.terminarLlamada);
  }
}

export default new LlamadaRouter().router;
import BaseRouter from './base/BaseRouter';
import { CandidatoController } from '../controllers/CandidatoController';
import { validate } from '../middlewares/validate';
import { candidatoSchema, actualizarCandidatoSchema } from '../schemas/CandidatoSchema';

/**
 * Router para gestionar las rutas de candidatos
 */
class CandidatoRouter extends BaseRouter {
  /**
   * Configura las rutas para candidatos
   */
  public routes(): void {
    /**
     * @swagger
     * /api/candidatos:
     *   get:
     *     summary: Obtener todos los candidatos
     *     tags: [Candidatos]
     *     responses:
     *       200:
     *         description: Lista de candidatos
     */
    this.router.get('/', CandidatoController.obtenerTodos);

    /**
     * @swagger
     * /api/candidatos/estado/{estado}:
     *   get:
     *     summary: Obtener candidatos por estado
     *     tags: [Candidatos]
     *     parameters:
     *       - in: path
     *         name: estado
     *         required: true
     *         schema:
     *           type: string
     *           enum: [aprobado, enrolamiento, entrevista, llamada, pausado, rechazado]
     *     responses:
     *       200:
     *         description: Lista de candidatos por estado
     */
    this.router.get('/estado/:estado', CandidatoController.obtenerPorEstado);

    /**
     * @swagger
     * /api/candidatos/pendientes-llamar:
     *   get:
     *     summary: Obtener candidatos pendientes para llamar hoy
     *     tags: [Candidatos]
     *     responses:
     *       200:
     *         description: Lista de candidatos pendientes para llamar
     */
    this.router.get('/pendientes-llamar', CandidatoController.obtenerPendientesLlamarAhora);

    /**
     * @swagger
     * /api/candidatos/{id}:
     *   get:
     *     summary: Obtener un candidato por ID
     *     tags: [Candidatos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Detalles del candidato
     *       404:
     *         description: Candidato no encontrado
     */
    this.router.get('/:id', CandidatoController.obtenerPorId);

    /**
     * @swagger
     * /api/candidatos:
     *   post:
     *     summary: Crear un nuevo candidato
     *     tags: [Candidatos]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/CrearCandidatoDTO'
     *     responses:
     *       201:
     *         description: Candidato creado exitosamente
     *       400:
     *         description: Datos de entrada inválidos
     */
    this.router.post('/', validate(candidatoSchema), CandidatoController.crear);

    /**
     * @swagger
     * /api/candidatos/{id}:
     *   put:
     *     summary: Actualizar un candidato existente
     *     tags: [Candidatos]
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
     *             $ref: '#/components/schemas/ActualizarCandidatoDTO'
     *     responses:
     *       200:
     *         description: Candidato actualizado exitosamente
     *       400:
     *         description: Datos de entrada inválidos
     *       404:
     *         description: Candidato no encontrado
     */
    this.router.put('/:id', validate(actualizarCandidatoSchema), CandidatoController.actualizar);

    /**
     * @swagger
     * /api/candidatos/{id}:
     *   delete:
     *     summary: Eliminar un candidato
     *     tags: [Candidatos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Candidato eliminado exitosamente
     *       404:
     *         description: Candidato no encontrado
     */
    this.router.delete('/:id', CandidatoController.eliminar);

    /**
     * @swagger
     * /api/candidatos/{id}/estado:
     *   patch:
     *     summary: Actualizar el estado de un candidato
     *     tags: [Candidatos]
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
     *             type: object
     *             properties:
     *               estado:
     *                 type: string
     *                 enum: [aprobado, enrolamiento, entrevista, llamada, pausado, rechazado]
     *     responses:
     *       200:
     *         description: Estado de candidato actualizado exitosamente
     *       400:
     *         description: Datos de entrada inválidos
     *       404:
     *         description: Candidato no encontrado
     */
    this.router.patch('/:id/estado', CandidatoController.actualizarEstado);
  }
}

export default new CandidatoRouter().router;
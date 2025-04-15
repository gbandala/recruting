import { Request, Response } from 'express';
import LlamadaService from '../services/LlamadaService';

/**
 * Controlador para gestionar operaciones relacionadas con llamadas
 */
export class LlamadaController {
  /**
   * Obtiene todas las llamadas
   */
  public static async obtenerTodas(req: Request, res: Response): Promise<void> {
    const response = await LlamadaService.obtenerTodas();
    res.status(response.status).json(response);
  }

  /**
   * Obtiene las llamadas terminadas
   */
  public static async obtenerTerminadas(req: Request, res: Response): Promise<void> {
    const response = await LlamadaService.obtenerPorTermino(true);
    res.status(response.status).json(response);
  }

  public static async obtenerPromociones(req: Request, res: Response): Promise<void> {
    const response = await LlamadaService.obtenerPorPromocion(true);
    res.status(response.status).json(response);
  }

  public static async obtenerRechazos(req: Request, res: Response): Promise<void> {
    const response = await LlamadaService.obtenerPorPromocion(false);
    res.status(response.status).json(response);
  }
  /**
   * Obtiene las llamadas pendientes (no terminadas)
   */
  public static async obtenerPendientes(req: Request, res: Response): Promise<void> {
    const response = await LlamadaService.obtenerPorTermino(false);
    res.status(response.status).json(response);
  }

  /**
   * Obtiene las llamadas por nivel
   */
  public static async obtenerPorNivel(req: Request, res: Response): Promise<void> {
    const response = await LlamadaService.obtenerPorNivel(req);
    res.status(response.status).json(response);
  }

  /**
   * Obtiene las llamadas por entrevistador
   */
  public static async obtenerPorEntrevistador(req: Request, res: Response): Promise<void> {
    const response = await LlamadaService.obtenerPorEntrevistador(req);
    res.status(response.status).json(response);
  }

  /**
   * Obtiene una llamada por su ID
   */
  public static async obtenerPorId(req: Request, res: Response): Promise<void> {
    const response = await LlamadaService.obtenerPorId(req);
    res.status(response.status).json(response);
  }

  /**
   * Crea una nueva llamada
   */
  public static async crear(req: Request, res: Response): Promise<void> {
    const response = await LlamadaService.crear(req);
    res.status(response.status).json(response);
  }

  /**
   * Actualiza una llamada existente
   */
  public static async actualizar(req: Request, res: Response): Promise<void> {
    const response = await LlamadaService.actualizar(req);
    res.status(response.status).json(response);
  }

  /**
   * Elimina una llamada
   */
  public static async eliminar(req: Request, res: Response): Promise<void> {
    const response = await LlamadaService.eliminar(req);
    res.status(response.status).json(response);
  }

  /**
   * Marca una llamada como terminada
   */
  public static async terminarLlamada(req: Request, res: Response): Promise<void> {
    const response = await LlamadaService.marcarTerminada(req);
    res.status(response.status).json(response);
  }
}
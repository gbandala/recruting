import { Request, Response } from 'express';
import CandidatoService from '../services/CandidatoService';

/**
 * Controlador para gestionar operaciones relacionadas con candidatos
 */
export class CandidatoController {
  /**
   * Obtiene todos los candidatos
   */
  public static async obtenerTodos(req: Request, res: Response): Promise<void> {
    const response = await CandidatoService.obtenerTodos();
    res.status(response.status).json(response);
  }

  /**
   * Obtiene candidatos por estado
   */
  public static async obtenerPorEstado(req: Request, res: Response): Promise<void> {
    const response = await CandidatoService.obtenerPorEstado(req);
    res.status(response.status).json(response);
  }

  /**
   * Obtiene candidatos pendientes para llamar hoy
   */
  public static async obtenerPendientesLlamarAhora(req: Request, res: Response): Promise<void> {
    const response = await CandidatoService.obtenerPendientesLlamarAhora();
    res.status(response.status).json(response);
  }

  /**
   * Obtiene un candidato por su ID
   */
  public static async obtenerPorId(req: Request, res: Response): Promise<void> {
    const response = await CandidatoService.obtenerPorId(req);
    res.status(response.status).json(response);
  }

  /**
   * Crea un nuevo candidato
   */
  public static async crear(req: Request, res: Response): Promise<void> {
    const response = await CandidatoService.crear(req);
    res.status(response.status).json(response);
  }

  /**
   * Actualiza un candidato existente
   */
  public static async actualizar(req: Request, res: Response): Promise<void> {
    const response = await CandidatoService.actualizar(req);
    res.status(response.status).json(response);
  }

  /**
   * Elimina un candidato
   */
  public static async eliminar(req: Request, res: Response): Promise<void> {
    const response = await CandidatoService.eliminar(req);
    res.status(response.status).json(response);
  }

  /**
   * Actualiza el estado de un candidato
   */
  public static async actualizarEstado(req: Request, res: Response): Promise<void> {
    const response = await CandidatoService.actualizarEstado(req);
    res.status(response.status).json(response);
  }
}
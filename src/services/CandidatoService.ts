import { Logger, Log } from "../libs/loggers";
import { Op } from 'sequelize';
import { Candidato } from '../models/Candidato';
import { EstadoCandidatoEnum } from '../enums';
import { CandidatoMapper } from '../dtos/CandidatoMapper';
import { responseData, responseError } from '../libs/helpers';
import { Request } from 'express';

class CandidatoService {
  /**
   * Obtiene todos los candidatos ok validado
   */
  async obtenerTodos() {
    try {
      const candidatos = await Candidato.findAll({
        order: [['created_at', 'DESC']]
      });

      return responseData(200, 'Candidatos obtenidos con éxito',
        CandidatoMapper.toResponseDTOList(candidatos));
    } catch (error) {
      Logger.error(error.message, Log('CandidatoService.obtenerTodos', error));
      return responseError(500, 'Error al obtener candidatos', error.message);
    }
  }

  /**
   * Obtiene candidatos por estado ok validado: 
   * estado: aprobado, enrolamiento, entrevista, llamada, pausado, rechazado
   */
  async obtenerPorEstado(req: Request) {
    try {
      const estado = req.params.estado as EstadoCandidatoEnum;

      // Validar que el estado sea válido
      if (!Object.values(EstadoCandidatoEnum).includes(estado)) {
        return responseError(400, 'Estado inválido', null);
      }

      const candidatos = await Candidato.findAll({
        where: { estado },
        order: [['created_at', 'DESC']]
      });

      return responseData(200, `Candidatos con estado ${estado} obtenidos con éxito`,
        CandidatoMapper.toResponseDTOList(candidatos));
    } catch (error) {
      Logger.error(error.message, Log('CandidatoService.obtenerPorEstado', error));
      return responseError(500, 'Error al obtener candidatos por estado', error.message);
    }
  }

  /**
   * Obtiene los candidatos que están pendientes para llamar ahora ok validado
   * (estado: LLAMADA y llamar_ahora: true)
   */
  async obtenerPendientesLlamarAhora() {
    try {
      const candidatos = await Candidato.findAll({
        where: { estado: EstadoCandidatoEnum.LLAMADA, llamar_ahora: true },
      },
      );

      return responseData(200, 'Candidatos pendientes para llamar hoy obtenidos con éxito',
        CandidatoMapper.toResponseDTOList(candidatos));
    } catch (error) {
      Logger.error(error.message, Log('CandidatoService.obtenerPendientesLlamarHoy', error));
      return responseError(500, 'Error al obtener candidatos pendientes', error.message);
    }
  }

  /**
   * Obtiene un candidato por su ID ok validado
   */
  async obtenerPorId(req: Request) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return responseError(400, 'ID inválido', null);
      }

      const candidato = await Candidato.findByPk(id);

      if (!candidato) {
        return responseError(404, 'Candidato no encontrado', null);
      }

      return responseData(200, 'Candidato obtenido con éxito',
        CandidatoMapper.toResponseDTO(candidato));
    } catch (error) {
      Logger.error(error.message, Log('CandidatoService.obtenerPorId', error));
      return responseError(500, 'Error al obtener candidato', error.message);
    }
  }

  /**
   * Crea un nuevo candidato ok validado
   */
  async crear(req: Request) {
    try {
      // console.log('CandidatoService.crear - Datos recibidos:', req.body);

      // Usar el nuevo método para crear un DTO directamente del request
      const candidatoDto = CandidatoMapper.fromRequest(req);
      // console.log('CandidatoService.crear - DTO creado:', candidatoDto);

      // Convertir el DTO a un modelo de Candidato
      const candidatoModel = new Candidato().set(candidatoDto);
      // console.log('CandidatoService.crear - Modelo creado:', candidatoModel);

      // Guardar el candidato en la base de datos
      const candidatoCreado = await candidatoModel.save();
      // console.log('CandidatoService.crear - Candidato guardado:', candidatoCreado);

      // Convertir el modelo guardado a un DTO de respuesta
      return responseData(201, 'Candidato creado con éxito',
        CandidatoMapper.toResponseDTO(candidatoCreado));
    } catch (error) {
      Logger.error(error.message, Log('CandidatoService.crear', error));
      return responseError(500, 'Error al crear candidato', error.message);
    }
  }

  /**
   * Actualiza un candidato existente ok validado
   *  solo se puede actualizar el email, telefono, fecha, hora y llamar_ahora
   */
  async actualizar(req: Request) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return responseError(400, 'ID inválido', null);
      }

      // Buscar el candidato existente
      const candidatoExistente = await Candidato.findByPk(id);

      if (!candidatoExistente) {
        return responseError(404, 'Candidato no encontrado', null);
      }

      // console.log('CandidatoService.actualizar - Datos recibidos:', req.body);

      // Usar el nuevo método para crear un DTO de actualización directamente del request
      const candidatoDto = CandidatoMapper.fromRequestForUpdate(req);
      // console.log('CandidatoService.actualizar - DTO creado:', candidatoDto);

      // Aplicar las actualizaciones al modelo existente
      const candidatoActualizado = CandidatoMapper.applyUpdates(candidatoExistente, candidatoDto);
      // console.log('CandidatoService.actualizar - Modelo actualizado:', candidatoActualizado);

      // Guardar los cambios
      await candidatoActualizado.save();

      // Convertir el modelo actualizado a un DTO de respuesta
      return responseData(200, 'Candidato actualizado con éxito',
        CandidatoMapper.toResponseDTO(candidatoActualizado));
    } catch (error) {
      Logger.error(error.message, Log('CandidatoService.actualizar', error));
      return responseError(500, 'Error al actualizar candidato', error.message);
    }
  }

  /**
   * Elimina un candidato por su ID ok validado
   */
  async eliminar(req: Request) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return responseError(400, 'ID inválido', null);
      }

      const candidato = await Candidato.findByPk(id);

      if (!candidato) {
        return responseError(404, 'Candidato no encontrado', null);
      }

      await candidato.destroy();

      return responseData(200, 'Candidato eliminado con éxito', null);
    } catch (error) {
      Logger.error(error.message, Log('CandidatoService.eliminar', error));
      return responseError(500, 'Error al eliminar candidato', error.message);
    }
  }

  /**
   * Actualiza el estado de un candidato ok validado
   * (estado: Aprobado, Enrolamiento, Entrevista, Llamada, Pausado, Rechazado)
   */
  async actualizarEstado(req: Request) {
    try {
      const id = parseInt(req.params.id);
      const estado = req.body.estado as EstadoCandidatoEnum;

      if (isNaN(id)) {
        return responseError(400, 'ID inválido', null);
      }

      if (!estado || !Object.values(EstadoCandidatoEnum).includes(estado)) {
        return responseError(400, 'Estado inválido', null);
      }

      const candidato = await Candidato.findByPk(id);

      if (!candidato) {
        return responseError(404, 'Candidato no encontrado', null);
      }

      candidato.estado = estado;
      await candidato.save();

      return responseData(200, 'Estado del candidato actualizado con éxito',
        CandidatoMapper.toResponseDTO(candidato));
    } catch (error) {
      Logger.error(error.message, Log('CandidatoService.actualizarEstado', error));
      return responseError(500, 'Error al actualizar estado del candidato', error.message);
    }
  }
}

export default new CandidatoService();
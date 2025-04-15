import { Logger, Log } from "../libs/loggers";
import { Op } from 'sequelize';
import { Llamada } from '../models/Llamada';
import { LlamadaMapper } from '../dtos/LlamadaMapper';
import { responseData, responseError } from '../libs/helpers';
import { Request } from 'express';

class LlamadaService {
  /**
   * Obtiene todas las llamadas ok validado
   */
  async obtenerTodas() {
    try {
      const llamadas = await Llamada.findAll({
        order: [['created_at', 'DESC']]
      });

      return responseData(200, 'Llamadas obtenidas con éxito',
        LlamadaMapper.toResponseDTOList(llamadas));
    } catch (error) {
      Logger.error(error.message, Log('LlamadaService.obtenerTodas', error));
      return responseError(500, 'Error al obtener llamadas', error.message);
    }
  }

  /**
   * Obtiene las llamadas filtradas por término ok validado
   * Se espera que el término pendientes/terminadas venga en los parámetros de la URL
   * @param termino booleano que indica si la llamada está terminada o no
   */
  async obtenerPorTermino(termino: boolean) {
    try {
      const llamadas = await Llamada.findAll({
        where: { termino },
        order: [['created_at', 'DESC']]
      });

      return responseData(200, `Llamadas ${termino ? 'terminadas' : 'pendientes'} obtenidas con éxito`,
        LlamadaMapper.toResponseDTOList(llamadas));
    } catch (error) {
      Logger.error(error.message, Log('LlamadaService.obtenerPorTermino', error));
      return responseError(500, 'Error al obtener llamadas por término', error.message);
    }
  }

  /**
   * Obtiene las llamadas filtradas por promoción ok validado
   * @param promocion - booleano que indica si la llamada está promovida o no
   * @returns respuesta con el estado y un mensaje de éxito o error
   */

  async obtenerPorPromocion(promocion: boolean) {
    try {
      const llamadas = await Llamada.findAll({
        where: { promocion },
        order: [['created_at', 'DESC']]
      });

      return responseData(200, `Llamadas ${promocion ? 'promovidas' : 'no promovidas'} obtenidas con éxito`,
        LlamadaMapper.toResponseDTOList(llamadas));
    } catch (error) {
      Logger.error(error.message, Log('LlamadaService.obtenerPorPromocion', error));
      return responseError(500, 'Error al obtener llamadas por promocion', error.message);
    }
  }

  /**
   * Obtiene las llamadas filtradas por nivel ok validado
   * Se espera que el nivel venga en los parámetros de la URL
   */
  async obtenerPorNivel(req: Request) {
    try {
      const nivel = req.params.nivel;

      if (!nivel) {
        return responseError(400, 'Nivel requerido', null);
      }

      const llamadas = await Llamada.findAll({
        where: { nivel },
        order: [['created_at', 'DESC']]
      });

      return responseData(200, `Llamadas de nivel ${nivel} obtenidas con éxito`,
        LlamadaMapper.toResponseDTOList(llamadas));
    } catch (error) {
      Logger.error(error.message, Log('LlamadaService.obtenerPorNivel', error));
      return responseError(500, 'Error al obtener llamadas por nivel', error.message);
    }
  }

  /**
   * Obtiene las llamadas filtradas por entrevistador ok validado
   * Se espera que el entrevistador venga en los parámetros de la URL
   */
  async obtenerPorEntrevistador(req: Request) {
    try {
      const entrevistador = req.params.entrevistador;

      if (!entrevistador) {
        return responseError(400, 'Entrevistador requerido', null);
      }

      const llamadas = await Llamada.findAll({
        where: { entrevistador },
        order: [['created_at', 'DESC']]
      });

      return responseData(200, `Llamadas del entrevistador ${entrevistador} obtenidas con éxito`,
        LlamadaMapper.toResponseDTOList(llamadas));
    } catch (error) {
      Logger.error(error.message, Log('LlamadaService.obtenerPorEntrevistador', error));
      return responseError(500, 'Error al obtener llamadas por entrevistador', error.message);
    }
  }

  /**
   * Obtiene una llamada por su ID ok validado
   * Se espera que el ID venga en los parámetros de la URL
   */
  async obtenerPorId(req: Request) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return responseError(400, 'ID inválido', null);
      }

      const llamada = await Llamada.findByPk(id);

      if (!llamada) {
        return responseError(404, 'Llamada no encontrada', null);
      }

      return responseData(200, 'Llamada obtenida con éxito',
        LlamadaMapper.toResponseDTO(llamada));
    } catch (error) {
      Logger.error(error.message, Log('LlamadaService.obtenerPorId', error));
      return responseError(500, 'Error al obtener llamada', error.message);
    }
  }

  /**
   * Crea una nueva llamada ok validado
   * Se espera que el DTO venga en el body de la petición
   */
  async crear(req: Request) {
    try {
      // Usar el nuevo método para crear un DTO directamente del request
      const llamadaDto = LlamadaMapper.fromRequest(req);
      // console.log('CandidatoService.crear - DTO creado:', llamadaDto);
      const nuevaLlamada = new Llamada().set(llamadaDto);
      // console.log('CandidatoService.crear - Modelo creado:', nuevaLlamada);
      const llamadaCreada = await nuevaLlamada.save();
      return responseData(201, 'Llamada creada con éxito',
        LlamadaMapper.toResponseDTO(llamadaCreada));
    } catch (error) {
      Logger.error(error.message, Log('LlamadaService.crear', error));
      return responseError(500, 'Error al crear llamada', error.message);
    }
  }

  /**
   * Actualiza una llamada existente
   */
  async actualizar(req: Request) {
    try {
      const id = parseInt(req.params.id);
      const llamadaDto = req.body;

      if (isNaN(id)) {
        return responseError(400, 'ID inválido', null);
      }

      const llamadaExistente = await Llamada.findByPk(id);

      if (!llamadaExistente) {
        return responseError(404, 'Llamada no encontrada', null);
      }

      const llamadaActualizada = LlamadaMapper.applyUpdates(llamadaExistente, llamadaDto);
      await llamadaActualizada.save();

      return responseData(200, 'Llamada actualizada con éxito',
        LlamadaMapper.toResponseDTO(llamadaActualizada));
    } catch (error) {
      Logger.error(error.message, Log('LlamadaService.actualizar', error));
      return responseError(500, 'Error al actualizar llamada', error.message);
    }
  }

  /**
   * Elimina una llamada por su ID
   */
  async eliminar(req: Request) {
    try {
      const id = parseInt(req.params.id);

      if (isNaN(id)) {
        return responseError(400, 'ID inválido', null);
      }

      const llamada = await Llamada.findByPk(id);

      if (!llamada) {
        return responseError(404, 'Llamada no encontrada', null);
      }

      await llamada.destroy();

      return responseData(200, 'Llamada eliminada con éxito', null);
    } catch (error) {
      Logger.error(error.message, Log('LlamadaService.eliminar', error));
      return responseError(500, 'Error al eliminar llamada', error.message);
    }
  }

  /**
   * Marca una llamada como terminada
   */
  async marcarTerminada(req: Request) {
    try {
      const id = parseInt(req.params.id);
      const termino = req.body.termino !== undefined ? req.body.termino : true;

      if (isNaN(id)) {
        return responseError(400, 'ID inválido', null);
      }

      const llamada = await Llamada.findByPk(id);

      if (!llamada) {
        return responseError(404, 'Llamada no encontrada', null);
      }

      llamada.termino = termino;
      await llamada.save();

      return responseData(200, `Llamada marcada como ${termino ? 'terminada' : 'no terminada'} con éxito`,
        LlamadaMapper.toResponseDTO(llamada));
    } catch (error) {
      Logger.error(error.message, Log('LlamadaService.marcarTerminada', error));
      return responseError(500, 'Error al marcar llamada como terminada', error.message);
    }
  }
}

export default new LlamadaService();
import { Transacciones } from '../models/transacciones.model';
import { Sucursales } from '../models/sucursales.model';
import { Vendedores } from '../models/vendedores.model';
import { Request, Response } from 'express';
import { fn } from 'sequelize';
import { Connection } from 'oracledb';
import { PoolConnections } from '../connections/oracle';

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const reports = await Transacciones.findAll({
      attributes: ['IDTRANSACCION', 'FECHACREATE', 'FECHAUPDATE', 'CONCEPTO', 'ESTADO', 'VALOR'],
      where: {
        FECHA: fn('CURDATE')
      },
      order: [
        ['IDTRANSACCION', 'DESC']
      ]
    });

    const formattedResultsTime = reports.map((result) => ({
      ...result.dataValues,
      FECHACREATE: result.dataValues.FECHACREATE?.toLocaleDateString() + ' ' + result.dataValues.FECHACREATE?.toLocaleTimeString(),
      FECHAUPDATE: result.dataValues.FECHAUPDATE?.toLocaleDateString() + ' ' + result.dataValues.FECHAUPDATE?.toLocaleTimeString()
    }))

    res.json(formattedResultsTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los reportes' });
  }
}

export const getReportById = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!id) {
    res.status(400).json({ error: 'Faltan datos para obtener el reporte' });
    return;
  }

  try {
    const report = await Transacciones.findOne({
      where: { IDTRANSACCION: id },
      include: [
        {
          attributes: ['ZONA', 'NOMBRE', 'DIRECCION'],
          model: Sucursales
        },
        {
          attributes: ['NOMBRES', 'DOCUMENTO', 'NOMBRECARGO'],
          model: Vendedores
        }
      ],
    });

    if (!report || !report.dataValues) {
      res.status(404).json({ error: 'Reporte no encontrado' });
      return;
    }

    const formattedResultTime = {
      ...report.dataValues,
      FECHACREATE: report.dataValues.FECHACREATE?.toLocaleDateString() + ' ' + report.dataValues.FECHACREATE?.toLocaleTimeString(),
      FECHAUPDATE: report.dataValues.FECHAUPDATE?.toLocaleDateString() + ' ' + report.dataValues.FECHAUPDATE?.toLocaleTimeString()
    }


    res.status(200).json(formattedResultTime);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el reporte' });
  }
}

export const updateDeniedReport = async (req: Request, res: Response) => {
  const { id, nota, auth } = req.body

  if (!id || !nota || !auth) {
    res.status(400).json({ error: 'Faltan datos para rechazar el reporte' });
    return;
  }

  try {
    const report = await Transacciones.update({
      ESTADO: 'RECHAZADO',
      LOGINAUTORIZA: auth,
      NOTA: nota
    }, {
      where: {
        IDTRANSACCION: id
      }
    })

    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el reporte' });
  }
}

export const updateApprovedReport = async (req: Request, res: Response) => {
  const { id, nota, auth } = req.body

  if (!id || !nota || !auth) {
    res.status(400).json({ error: 'Faltan datos para aprobar el reporte' });
    return;
  }

  let connection: Connection | null = null

  try {
    const report = await Transacciones.findOne({
      where: { IDTRANSACCION: id },
      include: [{
        attributes: ['ZONA'],
        model: Sucursales
      }]
    })

    if (!report) {
      res.status(404).json({ error: 'Reporte no encontrado' });
      return;
    }

    connection = await PoolConnections()

    if (!connection) {
      res.status(500).json({ error: 'Error al conectar a la base de datos de oracle' });
      return;
    }

    const { SUCURSAL, LOGINSOLICITUD, VALOR, TERCERO, Sucursale } = report.dataValues
    const zona = Sucursale?.ZONA

    const sql = `INSERT INTO AUTORIZACIONESPDV (FECHA, TERCERO, VALOR, ID, LOGINUSR, LOGINAUTH, FECHASYS, SUCURSAL, ZONA)
    VALUES (TRUNC(SYSDATE), :tercero, :valor, :id, :loginusr, :loginauth, SYSDATE, :sucursal, :zona)`

    const result = await connection.execute(sql, {
      tercero: TERCERO,
      valor: VALOR,
      id: id,
      loginusr: LOGINSOLICITUD,
      loginauth: auth,
      sucursal: SUCURSAL,
      zona: zona
    })

    await connection.commit();

    if (result.rowsAffected !== 1) {
      res.status(500).json({ error: 'Error al insertar la transacciónn en oracle DB' });
      await connection.rollback();
      return
    }

    await Transacciones.update(
      { ESTADO: 'APROBADO', LOGINAUTORIZA: auth, NOTA: nota },
      { where: { IDTRANSACCION: id } })

    res.status(200).json({ message: 'Transacción Aprobada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el reporte, validar log de transacciones' });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
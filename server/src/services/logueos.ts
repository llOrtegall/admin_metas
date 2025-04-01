import { Logueados_Hist } from '../models/logueados.model';
import { QueryTypes } from 'sequelize';

export async function getAllLogueos(fecha: string, empresa: string): Promise<Logueados_Hist[]> {
  try {
    const company = empresa === 'Multired' ? "39629, 39630, 39631" : "39632";

    const strQuery = `
      SELECT DISTINCT
          V.DOCUMENTO, 
          V.NOMBRES, 
          V.NOMBRECARGO, 
          HL.SUCURSAL, 
          HL.FECHA_LOGIN, 
          HL.FECHACREATE, 
          HL.FECHAUPDATE
      FROM 
          HIST_USUARIOS_LOGUEADOS AS HL
      JOIN 
          VENDEDORES V 
      ON 
          SUBSTR(HL.USERNAME, 3) = V.DOCUMENTO
      WHERE 
          HL.FECHA_LOGIN = COALESCE(?, CURDATE()) 
      AND 
          V.CCOSTO IN (${company});
    `;

    // Validar el valor de "fecha"
    const rf = fecha && fecha.trim() ? [fecha] : [null];

    const results = await Logueados_Hist.sequelize?.query(strQuery, {
      replacements: rf,
      type: QueryTypes.SELECT,
      raw: true,
    }) as Logueados_Hist[];

    return results
  } catch (error) {
    console.error('Error fetching logueos:', error);
    throw new Error('Error fetching logueos');
  }
}
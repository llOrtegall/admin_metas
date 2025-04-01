import { Logueados_Hist } from '../models/logueados.model';

export async function getAllLogueos(fecha: string, empresa: string): Promise<Logueados_Hist[]> {
  try {
    const company = empresa === 'Multired' ? "39629, 39630, 39631" : "39632";

    const query = `
    SELECT 
      HL.SUCURSAL, V.DOCUMENTO, V.NOMBRES, V.NOMBRECARGO, HL.FECHA_LOGIN, HL.FECHACREATE, HL.FECHAUPDATE
    FROM 
      HIST_USUARIOS_LOGUEADOS AS HL
    JOIN VENDEDORES V ON SUBSTR(HL.USERNAME, 3) = V.DOCUMENTO
    WHERE 
      HL.FECHA_LOGIN = COALESCE(?, CURDATE()) 
    AND 
      V.CCOSTO IN (${company});
  `;

    // Validar el valor de "fecha"
    const rf = fecha && fecha.trim() ? [fecha] : [null];

    const logueos = await Logueados_Hist.sequelize?.query(query, {
      replacements: rf
    });

    return logueos as Logueados_Hist[];
  } catch (error) {
    console.error('Error fetching logueos:', error);
    throw new Error('Error fetching logueos');
  }
}
import { Sugeridos } from '../models/sugeridos.model';
import { QueryTypes } from 'sequelize';

export const getSugeridosQuery = async (fecha: string, empresa: string): Promise<Sugeridos[]> => {
  try {
     const company = empresa === 'Multired' ? 39627 : 39628;

    const strQuery = `
      SELECT
        SV.ID, 
        V.DOCUMENTO,
        SV.FECHA,
        V.NOMBRES,
        V.NOMBRECARGO,
        SV.SUCURSAL,
        S.NOMBRE AS NOMBRE_SUCURSAL,
        S.TIPO AS TIPO,
        SV.CATEGORIA, 
        SV.PRODUCTO, 
        SV.VTA_SUGERIDO AS VALOR_SUGERIDO, 
        SV.META_VALOR AS VALOR_META,
        SV.ESTADO
      FROM SUGERIDOSVENDEDOR AS SV
      JOIN VENDEDORES AS V
        ON SUBSTRING(SV.LOGIN, 3) = V.DOCUMENTO
      JOIN SUCURSALES AS S
        ON SV.SUCURSAL = S.CODIGO
      WHERE SV.FECHA = COALESCE(:fecha, CURDATE()) 
      AND SV.ZONA = :zona
      ORDER BY SV.VTA_SUGERIDO DESC, SV.SUCURSAL ASC

    `

    // Validar el valor de "fecha"
    const date = fecha && fecha.trim() ? [fecha] : [null];

    const results = await Sugeridos.sequelize?.query(strQuery, {
      replacements: {
        fecha: date,
        zona: company
      },
      type: QueryTypes.SELECT,
      raw: true,
    }) as Sugeridos[];

    return results;
  } catch (error) {
    console.error('Error fetching sugeridos:', error);
    throw new Error('Error fetching sugeridos');
  }
}
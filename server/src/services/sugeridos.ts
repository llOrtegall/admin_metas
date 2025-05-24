import { Sugeridos } from '../models/sugeridos.model';
import { QueryTypes } from 'sequelize';

const datesInsert = (fecha1: string, fecha2: string): string => {
  if (fecha1 && fecha2 && fecha1 !== '' && fecha2 !== '') {
    return `SV.FECHA BETWEEN '${fecha1}' AND '${fecha2}'`;
  } else if (fecha1 && fecha1 !== '') {
    return `SV.FECHA = '${fecha1}'`;
  }
  return `SV.FECHA = CURDATE()`;
}

export const getSugeridosQuery = async (fecha1: string, fecha2: string, empresa: string): Promise<Sugeridos[]> => {
 console.log("Fecha en el servicio: ", fecha1,  + " | " + fecha2,  + " | " + empresa);
 

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
      WHERE ${datesInsert(fecha1, fecha2)}
      AND SV.ZONA = :zona
      ORDER BY SV.VTA_SUGERIDO DESC, SV.SUCURSAL ASC

    `
    const results = await Sugeridos.sequelize?.query(strQuery, {
      replacements: {
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
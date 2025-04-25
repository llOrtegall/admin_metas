import { SelectCanal, SelectCelula, SelectSubzona, SelectSupervisor } from '@/components/select-datail-sucursal';
import { SucursalInfo } from '@/types/Sucursales';
import { URL_API_DATA } from '@/utils/constants';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

export default function InfoSucursal() {
  const param = useParams();
  const [data, setData] = useState<SucursalInfo>()

  useEffect(() => {
    axios.get<SucursalInfo>(`${URL_API_DATA}/sucursal/${param.id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching sucursal data:', error);
      })
  }, [param.id]);

  return (
    <Card className='px-2'>
      <h1 className="text-xl font-bold px-6 py-2 text-center uppercase">Información Detallada Sucursal - N° {data?.CODIGO}</h1>

      <section className="px-6 grid grid-cols-3 gap-2">
        <p>
          <strong>Nombre:</strong> {data?.NOMBRE}
        </p>
        <p>
          <strong>C. Costo:</strong> {data?.CCOSTO}
        </p>
        <p>
          <strong>Dirección:</strong> {data?.DIRECCION}
        </p>
        <p>
          <strong>Tipo:</strong> {data?.TIPO}
        </p>
        <p>
          <strong>Supervisor:</strong> {data?.SUPERVISOR}
        </p>
        <p>
          <strong>Célula:</strong> {data?.CELULA}
        </p>
        <p>
          <strong>Subzona:</strong> {data?.SUBZONA}
        </p>
        <p>
          <strong>Canal:</strong> {data?.CANAL}
        </p>
        <p>
          <strong>Estado:</strong> {data?.ESTADO === 'A' ? 'Activo' : 'Inactivo'}
        </p>
      </section>

      <section className='px-6'>
        {
          data && (
            <form className="grid grid-cols-4 gap-4">
              <SelectSubzona
                key='SUBZONA_01'
                seleccionado={data.SUBZONA}
              />

              <SelectCelula
                key='CELULA_01'
                seleccionado={data.CELULA}
              />

              <SelectSupervisor
                key='SUPERVISOR_01'
                seleccionado={data.SUPERVISOR}
              />

              <SelectCanal
                key='CANAL_01'
                seleccionado={data.CANAL}
              />
              <Label>Hora Apertura Día Hábil</Label>
              <Input type="time" name="HORA_ENTRADA" defaultValue={data.HORA_ENTRADA} />
              <Label>Hora Cierre Día Hábil</Label>
              <Input type="time" name="HORA_SALIDA" defaultValue={data.HORA_SALIDA} />
              <Label>Hora Apertura Fin De Semana</Label>
              <Input type="time" name="HORA_ENTRADA_FES" defaultValue={data.HORA_ENTRADA_FES} />
              <Label>Hora Cierre Fin De Semana</Label>
              <Input type="time" name="HORA_SALIDA_FES" defaultValue={data.HORA_SALIDA_FES} />
            </form>
          )
        }
      </section>

    </Card>
  );
}
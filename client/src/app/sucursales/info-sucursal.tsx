import { SucursalInfo } from '@/types/Sucursales';
import { URL_API_DATA } from '@/utils/constants';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

export default function InfoSucursal() {
  const param = useParams();
  const [data, setData] = useState<SucursalInfo>()

  useEffect(() => {
    axios.get(`${URL_API_DATA}/sucursal/${param.id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching sucursal data:', error);
      })
  }, [param.id]);


  return (
    <Card className='px-2'>
      <h1 className="text-xl font-bold px-6 py-2 text-center">Información Detallada Sucursal - N° {data?.CODIGO}</h1>

      <section className="px-6 flex justify-around ">

        <article className='flex flex-col space-y-2'>
          <p>
            <strong>C. Costo:</strong> {data?.CCOSTO}
          </p>
          <p>
            <strong>Nombre:</strong> {data?.NOMBRE}
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
        </article>

        <article className='flex flex-col space-y-2'>
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
        </article>

      </section>


    </Card>
  );
}
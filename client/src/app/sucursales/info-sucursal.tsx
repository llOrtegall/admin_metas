import { Dialog, DialogTrigger } from "@/components/ui/dialog"

import { SucursalInfo } from '@/types/Sucursales';
import { URL_API_DATA } from '@/utils/constants';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import EditSucursal from "./editsucursal";

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
        <Dialog>
          <DialogTrigger className="mx-32 cursor-pointer border rounded-md py-1.5 hover:bg-gray-100">Actualizar Información</DialogTrigger>
          <EditSucursal />
        </Dialog>
      </section>


    </Card>
  );
}
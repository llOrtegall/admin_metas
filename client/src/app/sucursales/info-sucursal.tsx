import { SelectCanal, SelectCelula, SelectSubzona, SelectSupervisor, SelectEstado } from '@/components/select-datail-sucursal';
import { SucursalInfo } from '@/types/Sucursales';
import { URL_API_DATA } from '@/utils/constants';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

export default function InfoSucursal() {
  const param = useParams();
  const [data, setData] = useState<SucursalInfo>();
  const [form, setForm] = useState<Partial<SucursalInfo>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<SucursalInfo>(`${URL_API_DATA}/sucursal/${param.id}`)
      .then((res) => {
        setData(res.data);
        setForm(res.data); // Inicializa el formulario con los datos actuales
      })
      .catch((error) => {
        console.error('Error fetching sucursal data:', error);
      });
  }, [param.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Para selects personalizados, asume que devuelven el valor seleccionado
  const handleSelect = (name: keyof SucursalInfo, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      await axios.patch(`${URL_API_DATA}/sucursal/${param.id}`, form);
      setSuccess('Sucursal actualizada correctamente');
      setData({ ...data, ...form } as SucursalInfo); // Actualiza la vista
    } catch (err) {
      setError('Error al actualizar la sucursal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className='px-2'>
      <h1 className="text-xl font-bold px-6 py-2 text-center uppercase">Información Detallada Sucursal - N° {data?.CODIGO}</h1>
      <Card className="grid grid-cols-2 gap-2 px-6">
        <p><strong>Nombre:</strong> {data?.NOMBRE}</p>
        <p><strong>C. Costo:</strong> {data?.CCOSTO}</p>
        <p><strong>Dirección:</strong> {data?.DIRECCION}</p>
        <p><strong>Tipo:</strong> {data?.TIPO}</p>
        <p><strong>Supervisor:</strong> {data?.SUPERVISOR}</p>
        <p><strong>Célula:</strong> {data?.CELULA}</p>
        <p><strong>Subzona:</strong> {data?.SUBZONA}</p>
        <p><strong>Canal:</strong> {data?.CANAL}</p>
      </Card>
      <Card className='px-6'>
        {form && (
          <form onSubmit={handleSubmit} className='space-y-2'>
            <div className='grid grid-cols-4 gap-2'>
              <Label>Hora Apertura Día Hábil</Label>
              <Input type="time" name="HORA_ENTRADA" value={form.HORA_ENTRADA || ''} onChange={handleChange} />
              <Label>Hora Cierre Día Hábil</Label>
              <Input type="time" name="HORA_SALIDA" value={form.HORA_SALIDA || ''} onChange={handleChange} />
              <Label>Hora Apertura Fin De Semana</Label>
              <Input type="time" name="HORA_ENTRADA_FES" value={form.HORA_ENTRADA_FES || ''} onChange={handleChange} />
              <Label>Hora Cierre Fin De Semana</Label>
              <Input type="time" name="HORA_SALIDA_FES" value={form.HORA_SALIDA_FES || ''} onChange={handleChange} />
              <Label>Hora Ordinaria</Label>
              <Input type="number" name="HORAS_ORDINARIAS" value={form.HORAS_ORDINARIAS || ''} onChange={handleChange} />
              <Label>Horas Festivas</Label>
              <Input type="number" name="HORAS_FESTIVAS" value={form.HORAS_FESTIVAS || ''} onChange={handleChange} />
            </div>

            <div className='flex justify-around border rounded-md pb-2'>
              <SelectSubzona
                key='SUBZONA_01'
                seleccionado={form.SUBZONA || ''}
                funSelect={val => handleSelect('SUBZONA', val)}
              />
              <SelectCelula
                key='CELULA_01'
                seleccionado={form.CELULA || ''}
                funSelect={val => handleSelect('CELULA', val)}
              />
              <SelectSupervisor
                key='SUPERVISOR_01'
                seleccionado={form.SUPERVISOR || ''}
                funSelect={val => handleSelect('SUPERVISOR', val)}
              />
              <SelectCanal
                key='CANAL_01'
                seleccionado={form.CANAL || ''}
                funSelect={val => handleSelect('CANAL', val)}
              />
              <SelectEstado
                key='ESTADO_01'
                seleccionado={form.ESTADO || ''}
                funSelect={val => handleSelect('ESTADO', val)}
              />
            </div>

            <Button
              type="submit"
              variant={'success'}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </form>
        )}
      </Card>

      {success && <p className="col-span-4 text-green-600">{success}</p>}
      {error && <p className="col-span-4 text-red-600">{error}</p>}
    </Card>
  );
}
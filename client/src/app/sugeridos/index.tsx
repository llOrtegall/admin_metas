import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ButtonExportSugeridos } from '@/components/exports/ExportSugeridos';
import { useSugeridos } from '@/hooks/useSugeridos';
import { Spinner } from '@/components/ui/spinner';
import { formatPriceCo } from '@/utils/funtions';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';

export default function SugeridosPage() {
  const {
    filteredData,
    date,
    setDate,
    filter,
    setFilter,
    setCategory,
    loading,
    error
  } = useSugeridos();

  return (
    <section>
      <Card className='px-4'>
        <h1 className='text-lg font-bold uppercase'>Sugeridos Vendedores</h1>

        <article className='flex items-center gap-4'>
          <Label className='text-sm font-bold'>Fecha</Label>
          <Input
            type='date'
            className='w-[150px]'
            placeholder='Fecha'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Label className='text-sm font-bold flex items-center gap-2' title='Se puede buscar por N° Sucursal, Documento o Nombres colocador'>
            Filtros
            <Info className='inline-block mr-1' size={16} />
          </Label>
          <Input
            type='text'
            className='w-[350px]'
            placeholder='39825  -  1118*****  -  Andre Carr*** **** '
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />

          <Label className='text-sm font-bold'>Categoría</Label>

          <Select onValueChange={(val) => setCategory(val)} defaultValue='TODAS'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Categoría' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='TODAS'>Todas</SelectItem>
              <SelectItem value='DIAMANTE1A'>Diamante 1A</SelectItem>
              <SelectItem value='DIAMANTE2A'>Diamante 2A</SelectItem>
              <SelectItem value='DIAMANTE3A'>Diamante 3A</SelectItem>
              <SelectItem value='DIAMANTE4A'>Diamante 4A</SelectItem>
              <SelectItem value='DIAMANTE5A'>Diamante 5A</SelectItem>
              <SelectItem value='ZAFIRO'>Zafiro</SelectItem>
              <SelectItem value='ORO'>Oro</SelectItem>
              <SelectItem value='PLATA'>Plata</SelectItem>
              <SelectItem value='BRONCE'>Bronce</SelectItem>
            </SelectContent>
          </Select>

          <ButtonExportSugeridos datos={filteredData} />
        </article>

        <section>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='text-xs'>ID</TableHead>
                <TableHead className='text-xs'>Fecha</TableHead>
                <TableHead className='text-xs'>Documento</TableHead>
                <TableHead className='text-xs'>Nombres</TableHead>
                <TableHead className='text-xs'>Sucursal</TableHead>
                <TableHead className='text-xs'>Nombre Sucursal</TableHead>
                <TableHead className='text-xs'>Categoría</TableHead>
                <TableHead className='text-xs'>Producto</TableHead>
                <TableHead className='text-xs'>Valor Sugerido</TableHead>
                <TableHead className='text-xs'>Valor Meta</TableHead>
                <TableHead className='text-xs'>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!loading && !error && filteredData && filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TableRow key={index + 1}>
                    <TableCell className='text-xs'>{item.ID}</TableCell>
                    <TableCell className='text-xs'>{item.FECHA}</TableCell>
                    <TableCell className='text-xs'>{item.DOCUMENTO}</TableCell>
                    <TableCell
                      className='text-xs truncate max-w-[150px] overflow-hidden'
                      title={item.NOMBRES}
                    >
                      {item.NOMBRES}
                    </TableCell>
                    <TableCell className='text-xs'>{item.SUCURSAL}</TableCell>
                    <TableCell
                      className='text-xs truncate max-w-[100px] overflow-hidden'
                      title={item.NOMBRE_SUCURSAL}
                    >
                      {item.NOMBRE_SUCURSAL}
                    </TableCell>
                    <TableCell className='text-xs'>{item.CATEGORIA}</TableCell>
                    <TableCell className='text-xs'>{item.PRODUCTO}</TableCell>
                    <TableCell className='text-xs'>{formatPriceCo(item.VALOR_SUGERIDO)}</TableCell>
                    <TableCell className='text-xs'>{formatPriceCo(item.VALOR_META)}</TableCell>
                    <TableCell className='text-xs'>{item.ESTADO}</TableCell>
                  </TableRow>
                ))
              ) : (
                loading ? null : (
                  <TableRow>
                    <TableCell colSpan={12} className='text-xs'>
                      No hay datos disponibles
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </section>

        {loading && (
          <div className="flex items-center justify-center mt-4">
            <Spinner className="text-blue-400">
              <span className="text-blue-400">Cargando Sugeridos ...</span>
            </Spinner>
          </div>
        )} {/* Mostrar spinner mientras se cargan los datos */}
        {error && <p className='text-blue-500'>{error}</p>} {/* Mostrar mensaje de error */}
      </Card>
    </section>
  )
}
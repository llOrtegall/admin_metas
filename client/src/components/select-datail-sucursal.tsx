import { dataSelect, dataSelectCanal, dataSelectCelula, dataSelectSubzona, dataSelectEstado } from '../utils/constants'
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem,  } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const selectDataMap = {
  SUPERVISOR: dataSelect,
  CANAL: dataSelectCanal,
  CELULA: dataSelectCelula,
  SUBZONA: dataSelectSubzona,
  ESTADO: dataSelectEstado,
}

interface SelectComponentProps {
  name: keyof typeof selectDataMap;
  seleccionado?: string;
  funSelect?: (e: string) => void;
  label: string;
}

const GenericSelect = ({ name, seleccionado, funSelect, label }: SelectComponentProps) => {
  const data = selectDataMap[name];

  return (
    <div className='flex items-center gap-2'>
      <Label htmlFor={name} className='pt-1.5'>{label}</Label>
      <Select name={name} value={seleccionado} onValueChange={funSelect} >
        <SelectTrigger className='mt-2'>
          <SelectValue placeholder={'Seleccionar'} />
        </SelectTrigger>
        <SelectContent>
          {data.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export const SelectSupervisor = (props: Omit<SelectComponentProps, 'name' | 'label'>) => (
  <GenericSelect name='SUPERVISOR' label='Supervisor' {...props} />
);

export const SelectCanal = (props: Omit<SelectComponentProps, 'name' | 'label'>) => (
  <GenericSelect name='CANAL' label='Canal' {...props} />
);

export const SelectCelula = (props: Omit<SelectComponentProps, 'name' | 'label'>) => (
  <GenericSelect name='CELULA' label='Célula' {...props} />
);

export const SelectSubzona = (props: Omit<SelectComponentProps, 'name' | 'label'>) => (
  <GenericSelect name='SUBZONA' label='Subzona' {...props} />
);

export const SelectEstado = (props: Omit<SelectComponentProps, 'name' | 'label'>) => (
  <GenericSelect name='ESTADO' label='Estado' {...props} />
);
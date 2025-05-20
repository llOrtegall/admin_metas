import { Transacciones } from '@/types/Interfaces';
import { URL_API_DATA } from '../utils/constants';
import axios from "axios";

export const getReports = async ({ signal }: { signal: AbortSignal }): Promise<Transacciones[]> => {
  try {
    const reponse = await axios.get<Transacciones[]>(`${URL_API_DATA}/reportes`, { signal })

    if(reponse.status !== 200 || !reponse.data){
      throw new Error('Error al obtener los reportes de transacciones en la API')
    }

    return reponse.data
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener los reportes de transacciones en la API')
  }
}
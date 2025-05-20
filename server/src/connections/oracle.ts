import { DB_ORACLE_USER, DB_ORACLE_PASS, DB_ORACLE_HOST, DB_ORACLE_PORT, DB_ORACLE_DATABASE, DB_ORACLE_LIB_DIR } from '../config/envOracle'
import { type Connection, createPool, initOracleClient } from 'oracledb'

initOracleClient({
  libDir: DB_ORACLE_LIB_DIR
})

export async function PoolConnections() {
  let connecion: Connection | null = null
  try {
    const pool = await createPool({
      user: DB_ORACLE_USER,
      password: DB_ORACLE_PASS,
      connectString: `${DB_ORACLE_HOST}:${DB_ORACLE_PORT}/${DB_ORACLE_DATABASE}`,
    })

    connecion = await pool.getConnection()

    if (!connecion) {
      throw new Error('No se pudo obtener la conexión')
    }

    return connecion
  } catch (error) {
    console.error('Error al obtener la conexión:', error)
    throw error
  }
}

import { routerSucursales } from './routes/sucursales';
import { TranssRouter } from './routes/transacciones';
import { sugeridosRouter } from './routes/sugeridos';
import { ULR_CLIENT_CORS } from './config/envSchema';
import { logueosRouter } from './routes/logueos';
import express from 'express';
import morgan from 'morgan'
import cors from 'cors';

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.use(morgan('dev'))
app.use(cors({
  origin: ULR_CLIENT_CORS,
  credentials: true,
}))

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from the server!'
  })
});

app.use('/api', logueosRouter);
app.use('/api', sugeridosRouter);
app.use('/api', routerSucursales);
app.use('/api', TranssRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

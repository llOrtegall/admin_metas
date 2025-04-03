import { routerSucursales } from './routes/sucursales';
import { sugeridosRouter } from './routes/sugeridos';
import { logueosRouter } from './routes/logueos';
import express from 'express';
import morgan from 'morgan'
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'))
app.use(cors({
  origin: 'http://localhost:5173',
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
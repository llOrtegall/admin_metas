import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from the server!'
  })
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
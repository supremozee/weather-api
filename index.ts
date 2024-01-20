// /server.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes/auth';
import cors from 'cors'
const app = express();
const PORT = 3006;

app.use(bodyParser.json());
app.use('/api/auth', router);
app.use(cors())
mongoose.connect('mongodb+srv://azizariyibi:Olabisi14@generalcluster.rvxsveo.mongodb.net/')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

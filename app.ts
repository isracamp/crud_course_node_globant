import express from 'express';
import connectDB from './src/db/conection/database';
import blogRoutes from './src/modules/blog/infrastructure/http/routes/blogRoutes';
import userRoutes from './src/modules/user/infraestructure/http/routes/UserRoutes';

import cors from 'cors';
import { API_VERSION_PREFIX, API_PREFIX_BlOGS, API_PREFIX_USERS } from './src/constants/Prefixes';
import dotenv from 'dotenv';
dotenv.config();
const defaultPort = 4000;
const app = express();
const bootstrap = () => {
  connectDB()
    .then(() => {
      console.log('Connected to the database');
    })
    .catch((error) => {
      console.log('Database connection error:', error);
      process.exit(1);
    });
  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  //  middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  // routes
  app.use(`${API_VERSION_PREFIX}${API_PREFIX_BlOGS}`, blogRoutes);
  app.use(`${API_VERSION_PREFIX}${API_PREFIX_USERS}`, userRoutes);

  // server
  const port = process.env.PORT || defaultPort;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

bootstrap();

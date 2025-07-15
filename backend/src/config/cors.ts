import { CorsOptions } from 'cors';

const corsConfig: CorsOptions = {
  origin: ['http://localhost:5173', 'https://gowandarstaging.netlify.app','https://www.gowandar.com', 'https://gowandar.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsConfig;

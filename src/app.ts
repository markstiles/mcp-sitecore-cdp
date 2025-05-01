import express from 'express';
import { json } from 'body-parser';
import { setRoutes } from './routes/api';
import { errorHandler } from './utils/errorHandler';
import { config } from './config/config';

const app = express();
const PORT = config.port || 3000;

app.use(json());

setRoutes(app);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import express, { Router, Request, Response } from 'express';
import CdpController from '../controllers/cdpController';
import { CdpService } from '../services/cdpService';

const cdpService = new CdpService();
const cdpController = new CdpController(cdpService);
const router = Router();

export const setRoutes = (app: express.Application) => {
    router.get('/guests/:id', (req, res) => cdpController.getGuest(req, res));
    router.post('/guests', cdpController.createGuest.bind(cdpController));
    
    return router;
};
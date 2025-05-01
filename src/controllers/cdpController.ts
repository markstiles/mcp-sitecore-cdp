import { Request, Response } from 'express';
import { CdpService } from '../services/cdpService'; // Adjust the path as needed
import { errorHandler } from '../utils/errorHandler';

class CdpController {
    constructor(private cdpService: CdpService) {}

    async getGuest(req: Request, res: Response): Promise<void> {
        try {
            const guestId = req.params.id;
            const guestData = await this.cdpService.fetchGuestData(guestId);
            res.status(200).json(guestData);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {});
        }
    }

    async createGuest(req: Request, res: Response): Promise<void> {
        try {
            const guestInfo = req.body;
            const newGuest = await this.cdpService.sendGuestData(guestInfo);
            res.status(201).json(newGuest);
        } catch (error) {
            errorHandler(error as Error, req, res, () => {});
        }
    }
}

export default CdpController;
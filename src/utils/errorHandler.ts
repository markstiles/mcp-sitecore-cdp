import { Request, Response, NextFunction } from 'express';

interface ErrorHandlerError {
    statusCode?: number;
    message?: string;
}

export const errorHandler = (err: ErrorHandlerError, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
};
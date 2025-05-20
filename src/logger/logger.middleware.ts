import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { winstonLogger } from './logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime();

    res.on('finish', () => {
      const elapsed = process.hrtime(start);
      const elapsedMs = elapsed[0] * 1000 + elapsed[1] / 1e6;

      winstonLogger.info({
        message: 'HTTP Request',
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        userAgent: req.headers['user-agent'],
        ip: req.ip,
        responseTimeMs: elapsedMs.toFixed(3),
      });
    });

    next();
  }
}

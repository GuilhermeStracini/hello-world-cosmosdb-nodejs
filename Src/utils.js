import 'dotenv/config';
import winston from 'winston';
import { SeqTransport } from '@datalust/winston-seq';

export function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json(),
    ),
    defaultMeta: { application: 'seed-cosmos-db-nodejs' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new SeqTransport({
            serverUrl: process.env.SEQ_URL,
            onError: (e => { console.error(e) }),
            handleExceptions: true,
            handleRejections: true,
        })
    ]
});
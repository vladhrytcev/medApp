import * as crypto from 'crypto';

export const getGeneratedHash = (title: string, data: string): any => crypto.createHash('sha1').update(title + data).digest('hex')
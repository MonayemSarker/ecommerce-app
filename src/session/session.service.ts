import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { randomBytes } from 'crypto';

export interface SessionData {
  userId: string;
  email: string;
  createdAt: number;
  [key: string]: any;
}

@Injectable()
export class SessionService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  generateSessionId(): string {
    return randomBytes(32).toString('hex');
  }

  async createSession(
    userData: Omit<SessionData, 'createdAt'>,
  ): Promise<string> {
    const sessionId = this.generateSessionId();

    const sessionData = {
      ...userData,
      createdAt: Date.now(),
    };

    await this.cache.set(sessionId, sessionData, 86400); // Pass TTL as number directly

    return sessionId;
  }

  async getSession(sessionId: string): Promise<SessionData | null> {
    // console.log('session id', sessionId);
    return await this.cache.get<SessionData>(sessionId);
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.cache.del(sessionId);
  }

  async isValidSession(sessionId: string): Promise<boolean> {
    const session = await this.getSession(sessionId);
    return !!session;
  }
}

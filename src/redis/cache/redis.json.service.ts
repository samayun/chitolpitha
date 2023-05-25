/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Redis from 'ioredis';
import { redisEnabled } from '@config/redis';
import { Global, Inject, Injectable, CACHE_MANAGER } from '@nestjs/common';

@Global()
@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) public redis: Redis) {}

  async onApplicationBootstrap() {
    if (redisEnabled) {
      try {
        const key = `octopus:stack:1`;
        const data = {
          lang: 'NodeJS',
          framework: 'Nest',
          cache: 'REDIS_STACK',
        };

        const cacheUpdater = await this.cacheUpdater(key, data);
        const cacheChecker = await this.cacheChecker(key);

        console.log({ stack: 'stack', cacheChecker, cacheUpdater });
      } catch (error) {
        console.log({ error });
      }
    }
  }

  async cacheChecker(key: string, path?: string | string[]) {
    if (!redisEnabled) return null;

    try {
      const data = await this.jsonGet(key, path);
      return data;
    } catch (error) {
      return null;
    }
  }

  async cacheUpdater(key: string, data: any, path = '$') {
    if (!redisEnabled) return null;

    try {
      const Ndata = await this.jsonSet(key, path, data);
      return JSON.parse(Ndata);
    } catch (error) {
      return null;
    }
  }

  async cacheRemover(key: string) {
    if (!redisEnabled) return null;

    try {
      const data = await this.redis.del(key);
      return data;

      // const data = await this.jsonDel(key);
      // return data;
    } catch (error) {
      return null;
    }
  }

  async cacheIncrement(key: string, feild: string, how: number) {
    if (!redisEnabled) return null;

    try {
      const data = await this.redis.hincrby(key, feild, how);
      return data;
    } catch (error) {
      return null;
    }
  }

  async reset() {
    if (!redisEnabled) return null;

    try {
      const data = await this.redis.reset();
      return data;
    } catch (error) {
      return null;
    }
  }

  async onModuleDestroy() {
    await this.redis.disconnect();
    console.log(`Redis disconnected`);
  }

  async otpCacheUpdate(phone: string, data: any, minute: number) {
    if (!redisEnabled) return null;
    try {
      const result = await this.redis.set(
        phone,
        JSON.stringify(data),
        'EX',
        minute * 60,
      );
      return result;
    } catch (error) {
      return null;
    }
  }

  async otpCacheCheck(phone: string) {
    if (!redisEnabled) return null;
    return this.cacheChecker(phone);
  }

  async otpCacheRemove(phone: string) {
    if (!redisEnabled) return null;
    return this.cacheRemover(phone);
  }

  private async jsonSet(
    key: string,
    path: string,
    data: any,
    exists?: 'NX' | 'XX',
  ) {
    let res;
    exists === undefined
      ? (res = await this.redis.call('JSON.SET', [
          key,
          path,
          JSON.stringify(data),
        ]))
      : (res = await this.redis.call('JSON.SET', [
          key,
          path,
          JSON.stringify(data),
          exists,
        ]));

    return res;
  }

  private async jsonGet(key: string, path?: string | string[]) {
    let res;
    if (path) {
      Array.isArray(path)
        ? (res = await this.redis.call('JSON.GET', [key, ...path]))
        : (res = await this.redis.call('JSON.GET', [key, path]));
    } else {
      res = await this.redis.call('JSON.GET', key);
    }
    if (res) {
      return JSON.parse(res);
    }

    return null;
  }

  private async jsonDel(key: string, path?: string) {
    let res;
    path === undefined
      ? (res = await this.redis.call('JSON.DEL', key))
      : (res = await this.redis.call('JSON.DEL', [key, path]));

    return res as any;
  }

  private async jsonForget(key: string, path?: string) {
    let res;
    path === undefined
      ? (res = await this.redis.call('JSON.DEL', key))
      : (res = await this.redis.call('JSON.DEL', [key, path]));

    return res as any;
  }

  private async jsonMget(key: string | string[], path: string) {
    let res: any;

    Array.isArray(key)
      ? (res = await this.redis.call('JSON.MGET', [...key, path]))
      : (res = await this.redis.call('JSON.MGET', [key, path]));

    if (res) {
      const parsed = res.map((item: string) => JSON.parse(item));
      return parsed;
    }
    return null;
  }

  private async jsonType(key: string, path?: string): Promise<string | null> {
    let res;
    path === undefined
      ? (res = await this.redis.call('JSON.TYPE', key))
      : (res = await this.redis.call('JSON.TYPE', [key, path]));

    return res;
  }

  private async jsonNumincrby(
    key: string,
    path: string,
    number: number,
  ): Promise<number | string> {
    try {
      const res = (await this.redis.call('JSON.NUMINCRBY', [
        key,
        path,
        number,
      ])) as string;
      return parseFloat(res!);
    } catch (error) {
      const { message } = error as Error;
      return message;
    }
  }

  private async json_nummultby(key: string, path: string, number: number) {
    try {
      const res = (await this.redis.call('JSON.NUMMULTBY', [
        key,
        path,
        number,
      ])) as string;
      return parseFloat(res!);
    } catch (error) {
      const { message } = error as Error;
      return message;
    }
  }

  private async jsonStrAppend(
    key: string,
    path: string,
    data: string,
  ): Promise<number | string> {
    try {
      const res = (await this.redis.call('JSON.STRAPPEND', [
        key,
        path,
        JSON.stringify(data),
      ])) as string;
      return parseInt(res!);
    } catch (error) {
      const { message } = error as Error;
      return message;
    }
  }

  private async jsonStrLen(
    key: string,
    path?: string,
  ): Promise<number | string | null> {
    let res;

    try {
      path === undefined
        ? (res = await this.redis.call('JSON.STRLEN', key))
        : (res = await this.redis.call('JSON.STRLEN', [key, path]));

      if (!res) return null;
      return parseInt(res!);
    } catch (error) {
      const { message } = error as Error;
      return message;
    }
  }

  private async jsonArrAppend(
    key: string,
    path: string,
    data: any,
  ): Promise<number | string> {
    try {
      if (Array.isArray(data)) {
        const array = data.map((item) => JSON.stringify(item));

        const res = (await this.redis.call('JSON.ARRAPPEND', [
          key,
          path,
          ...array,
        ])) as string;

        return res!;
      }

      const res = (await this.redis.call('JSON.ARRAPPEND', [
        key,
        path,
        JSON.stringify(data),
      ])) as string;

      return res!;
    } catch (error) {
      const { message } = error as Error;
      return message;
    }
  }

  private async jsonArrIndex(
    key: string,
    path: string,
    data: string,
    start?: number,
    stop?: number,
  ): Promise<number | string> {
    let res;

    try {
      if (start !== undefined && stop === undefined) {
        res = await this.redis.call('JSON.ARRINDEX', [
          key,
          path,
          JSON.stringify(data),
          start,
        ]);

        return res!;
      }

      if (start !== undefined && stop !== undefined) {
        res = await this.redis.call('JSON.ARRINDEX', [
          key,
          path,
          JSON.stringify(data),
          start,
          stop,
        ]);

        return res!;
      }

      res = await this.redis.call('JSON.ARRINDEX', [
        key,
        path,
        JSON.stringify(data),
      ]);

      return res!;
    } catch (error) {
      const { message } = error as Error;
      return message;
    }
  }

  private async jsonArrInsert(
    key: string,
    path: string,
    index: number,
    data: any,
  ) {
    try {
      if (Array.isArray(data)) {
        const array = data.map((item) => JSON.stringify(item));

        const res = await this.redis.call('JSON.ARRINSERT', [
          key,
          path,
          index,
          ...array,
        ]);

        return res!;
      }

      const res = await this.redis.call('JSON.ARRINSERT', [
        key,
        path,
        index,
        JSON.stringify(data),
      ]);

      return res!;
    } catch (error) {
      const { message } = error as Error;
      return message;
    }
  }

  private async jsonArrLen(key: string, path?: string) {
    try {
      let res;
      path === undefined
        ? (res = await this.redis.call('JSON.ARRLEN', key))
        : (res = await this.redis.call('JSON.ARRLEN', [key, path]));

      return res!;
    } catch (error) {
      const { message } = error as Error;
      return message;
    }
  }

  private async jsonArrPop(key: string, path?: string, index?: number) {
    try {
      let res;
      if (path !== undefined && index === undefined) {
        res = await this.redis.call('JSON.ARRPOP', [key, path]);
        return res!;
      }
      if (path !== undefined && index !== undefined) {
        res = await this.redis.call('JSON.ARRPOP', [key, path, index]);
        return res!;
      }

      res = await this.redis.call('JSON.ARRPOP', key);
      return res!;
    } catch (error: any) {
      return error.message;
    }
  }

  private async jsonArrTrim(
    key: string,
    path: string,
    start: number,
    stop: number,
  ): Promise<number | string> {
    try {
      const res = (await this.redis.call('JSON.ARRTRIM', [
        key,
        path,
        start,
        stop,
      ])) as string;
      return res!;
    } catch (error) {
      const { message } = error as Error;
      return message;
    }
  }

  private async jsonObjKeys(
    key: string,
    path?: string,
  ): Promise<string[] | null> {
    let res;

    path === undefined
      ? (res = await this.redis.call('JSON.OBJKEYS', key))
      : (res = await this.redis.call('JSON.OBJKEYS', [key, path]));

    return res;
  }

  private async jsonObjLen(key: string, path?: string): Promise<number | null> {
    let res;

    path === undefined
      ? (res = await this.redis.call('JSON.OBJLEN', key))
      : (res = await this.redis.call('JSON.OBJLEN', [key, path]));

    return res;
  }

  private async jsonResp(key: string, path?: string) {
    let res;
    path === undefined
      ? (res = await this.redis.call('JSON.RESP', key))
      : (res = await this.redis.call('JSON.RESP', [key, path]));

    return res;
  }
}

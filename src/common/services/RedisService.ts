export class RedisService {
    constructor(public redis: any) {
        this.redis = redis
    }

    get(key: string) {
        return this.redis.get(key);
    }
}


// export const redisService = new RedisService()
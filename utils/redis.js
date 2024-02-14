const redis = require('redis');

class RedisClient {
    constructor() {
        this.client = redis.createClient();

        // Display any error from the redis client
        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });
    }

    async isAlive() {
        return new Promise((resolve) => {
            this.client.ping((err, result) => {
                if (err) {
                    resolve(false);
                } else {
                    resolve(result === 'PONG');
                }
            });
        });
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    }

    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, duration, value, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply === 1); // Returns true if key was deleted, false otherwise
                }
            });
        });
    }
}

const redisClient = new RedisClient();

module.exports = redisClient;

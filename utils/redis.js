const redis = require('redis');

class RedisClient {
    constructor() {
        this.client = redis.createClient();

        //Display error message
        this.client.on('error', (err) => {
            console.error('Error: ', err);
    });

}

async isAlive() {
    return new Promise((resolve) => {
        this.client.on('connect', () => {
            resolve(true);
        });
        this.client.on('error', () => {
            resolve(false);
        });
    });

}

async get(key) {
    return new Promise((resolve, reject) => {
        this.client.get(key, (err, reply) => {
            if (err) {
                reject(err);
            }
            resolve(reply);
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
            }
            resolve(reply === 1);

        });
    });
}
}

const redisClient = new RedisClient();

module.exports = redisClient;
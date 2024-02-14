import { createClient } from "redis";
import { promisify } from "util";

//class to define methods for commonly used redis commands
class RedisClient {
    constructor() {
        this.client = redis.createClient();

        //Display error message
        this.client.on('error', (err) => {
            console.log(`Redis client not connected to server: ${err}`);
    });

}

//check connection status and report
isAlive() {
    if (this.client.connected) {
        return true;
    }
    return false;
}



//get value for given key from redis server
async get(key) {
    const redisGet = promisify(this.client.get).bind(this.client);
    const value = await redisGet(key);
    return value;
}

async set(key, value, duration) {
    const redisSet = promisify(this.client.set).bind(this.client);
}

async del(key) {
    const redisDel = promisify(this.client.del).bind(this.client);
    await redisDel(key);

}

}

const redisClient = new RedisClient();

module.exports = redisClient;
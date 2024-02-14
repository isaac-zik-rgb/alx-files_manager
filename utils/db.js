class DBClient {
  constructor() {
    this.client = new Client({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
    });
    this.client.connect();

}
    isAlive() {
        return this.client._ending === false;
    }
    async nbUsers() {
        const res = await this.client.query('SELECT COUNT(*) FROM users');
        return res.rows[0].count;
    }
    async nbFiles() {
        const res = await this.client.query('SELECT COUNT(*) FROM files');
        return res.rows[0].count;
    }
}

const dbClient = new DBClient();
export default dbClient;
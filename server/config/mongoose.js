import mongoose from 'mongoose';
import debug from 'debug';
import 'dotenv/config';

const dbDebugger = debug('basic-blog:db');

mongoose.set('strictQuery', false);

const dev_db_url = 'mongodb://127.0.0.1:27017/basic-blog';

const mongoDB = process.env.MONGODB_URI || dev_db_url;

async function main() {
  await mongoose.connect(mongoDB);
  dbDebugger('DB connected');
}

main().catch((err) => dbDebugger(err));

const db = mongoose.connection;
db.on('error', () => dbDebugger('Mongo connection error'));

export default db;

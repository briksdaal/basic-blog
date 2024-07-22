import mongoose from 'mongoose';
import debug from 'debug';
import 'dotenv/config';

const dbDebugger = debug('basic-blog:db');

mongoose.set('strictQuery', false);

const dev_db_url = 'mongodb://127.0.0.1:27017/basic-blog';

const mongoDB =
  process.env.NODE_ENV === 'dev' ? dev_db_url : process.env.MONGODB_URI;

let conn;

async function main() {
  conn = await mongoose.connect(mongoDB);
  dbDebugger('DB connected');
}

main().catch((err) => dbDebugger(err));

const db = mongoose.connection;

db.on('error', () => dbDebugger('Mongo connection error'));

export const ObjectIdIsValid = mongoose.Types.ObjectId.isValid;

export const bucket = new mongoose.mongo.GridFSBucket(
  mongoose.connection.client.db('basic-blog')
);

export default db;

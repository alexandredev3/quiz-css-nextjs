import { MongoClient } from 'mongodb';

export async function MongoConnection() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGO URI WAS NOT PROVIDED');
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('quizes');

  return db;
}

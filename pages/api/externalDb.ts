import { MongoClient } from 'mongodb';

import { NowRequest, NowResponse } from '@vercel/node';

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

export default async function externalDb(
  _request: NowRequest,
  response: NowResponse
) {
  const db = await MongoConnection();

  const collection = db.collection('quizes');
  const cursor = collection.find();
  const data: string[] = [];

  await cursor.forEach((doc) => data.push(doc));

  response.setHeader('Cache-Control', 's-maxage=1000, stale-while-revalidate');

  return response.status(200).json({
    data,
  });
}

import { NowRequest, NowResponse } from '@vercel/node';

import { MongoConnection } from './_lib/MongoConnection';

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

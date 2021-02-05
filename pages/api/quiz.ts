import { ObjectId } from 'mongodb';

import { NowRequest, NowResponse } from '@vercel/node';

import { MongoConnection } from './_lib/MongoConnection';

export default async function quiz(request: NowRequest, response: NowResponse) {
  const { id } = request.query;

  if (!id) {
    return response.status(400).json({
      message: 'ID was not provided in query param.',
    });
  }

  const query = { _id: new ObjectId(id as string) };

  const db = await MongoConnection();

  const collection = db.collection('quizes');

  const data = await collection.findOne(query);

  response.setHeader('Cache-Control', 's-maxage=1000, stale-while-revalidate');

  return response.status(200).json(data);
}

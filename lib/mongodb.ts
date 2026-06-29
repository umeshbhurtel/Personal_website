import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI ?? '';

let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise() {
  if (!uri) {
    return Promise.reject(new Error('MONGODB_URI environment variable is not set'));
  }
  const client = new MongoClient(uri);
  return client.connect();
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClientPromise();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = createClientPromise();
}

export default clientPromise;

export async function getDb() {
  const c = await clientPromise;
  return c.db('portfolio');
}

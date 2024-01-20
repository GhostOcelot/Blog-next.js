const { MongoClient } = require('mongodb');

const handler = async (req, res) => {
  if (req.method === 'POST') {
    let client;
    let db;
    const { email, name, content } = JSON.parse(req.body);

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !content ||
      content.trim() === ''
    ) {
      res.status(422).send({ error: 'incorrect data' });
      return;
    }

    const MONGOBD_URL = `mongodb+srv://${process.env.NEXT_PUBLIC_MONGODB_USERNAME}:${process.env.NEXT_PUBLIC_MONGODB_PASSWORD}@${process.env.NEXT_PUBLIC_MONGODB_CLUSTER}.rjv3f8p.mongodb.net?retryWrites=true&w=majority`;

    try {
      client = new MongoClient(MONGOBD_URL);
      await client.connect();
      db = client.db(process.env.NEXT_PUBLIC_MONGODB_DATABASE);
      const collection = db.collection('contact-messages');
      await collection.insertOne({ email, name, content });

      res.status(200).send({ email, name, content });
    } catch (error) {
      res.status(400).send({ error: 'Database error' });
      return;
    }

    client.close();
  }
};

export default handler;

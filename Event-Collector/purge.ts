import { mongoConnect } from './lib/mongoConnect';

async function dump () {
    const { db, client } = await mongoConnect();
    const collection = db.collection('events');
    await collection.deleteMany({});
    await client.close();
    console.log('Dumped');
}

dump();

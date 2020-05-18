import { Application } from 'https://deno.land/x/oak/mod.ts';
import 'https://deno.land/x/denv/mod.ts';
import { init, MongoClient } from 'https://deno.land/x/mongo@v0.6.0/mod.ts';

const app = new Application();

const client = new MongoClient();
client.connectWithUri('mongodb://localhost:27017');

const db = client.database('test');
const users = db.collection('users');

// insert
const insertId = await users.insertOne({
  username: 'user1',
  password: 'pass1',
});

app.use((ctx) => {
  console.log('re-running!');
  ctx.response.body = 'Hello world!';
});

await app.listen('127.0.0.1:8000');

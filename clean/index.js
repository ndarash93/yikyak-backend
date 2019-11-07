import express from 'express';
import bodyParser from 'body-parser';
import makeCallback from './express';
import {post} from './controller';

const app = express()
app.use(bodyParser.json())

app.get('/post', makeCallback(postPost))

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
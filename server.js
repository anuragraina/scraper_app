import express from 'express';

import { connectDB } from './app/db/config.js';

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.get('/api/events', (req, res) => {
	res.send('Hello');
});

app.listen(port, () => console.log(`App listening at port ${port}`));

import express from 'express';

import { connectDB } from './app/db/config.js';
import { getEvents } from './app/db/get-events.js';

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.get('/api/events', async (req, res) => {
	const events = await getEvents(req.query);
	res.json(events);
});

app.listen(port, () => console.log(`App listening at port ${port}`));

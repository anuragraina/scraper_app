import express from 'express';

import { connectDB } from './app/db/config.js';
import { getEvents } from './app/db/get-events.js';
import { scrapeConfigs } from './app/utils/scrapeConfig.js';
import { addEvents } from './app/db/add-events.js';

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.get('/api/events', async (req, res) => {
	const events = await getEvents(req.query);
	res.json(events);
});

app.post('/api/events', async (_, res) => {
	const responses = await Promise.allSettled(
		scrapeConfigs.map(scrapeConfig => addEvents(scrapeConfig))
	);
	console.log(responses);
	res.json(responses);
});

app.listen(port, () => console.log(`App listening at port ${port}`));

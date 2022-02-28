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
	try {
		await Promise.allSettled(scrapeConfigs.map(scrapeConfig => addEvents(scrapeConfig)));

		res.json(scrapeConfigs.map(scrapeConfig => scrapeConfig.url));
	} catch (e) {
		console.error(e);
		res.json({ error: e.message });
	}
});

app.listen(port, () => console.log(`App listening at port ${port}`));

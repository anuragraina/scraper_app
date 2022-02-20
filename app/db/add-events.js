import mongoose from 'mongoose';

import { scrapeWebsite } from '../services/scraper-service.js';
import { sanitizeEventsData } from '../utils/helpers.js';
import Event from '../models/event.js';
import { scrapeConfig } from '../utils/scrapeConfig.js';

const addEvents = async () => {
	try {
		await mongoose.connect('mongodb://localhost:27017/test');

		const eventsList = await scrapeWebsite(scrapeConfig[0]);

		if (eventsList.length > 0) {
			Event.insertMany(sanitizeEventsData(eventsList), function (err, docs) {
				if (err) {
					console.log('Encountered error while inserting events to db!');
					console.error(err);
				} else {
					console.log(`${docs.length} events inserted to db successfully.`);
				}
			});
		} else {
			console.log('No data received!!!');
		}
	} catch (e) {
		console.error(e);
	}
};

addEvents();

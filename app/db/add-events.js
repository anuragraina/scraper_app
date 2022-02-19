import mongoose from 'mongoose';

import { scrapeWebsite } from '../services/scraper-service.js';
import { sanitizeEventsData } from '../utils/helpers.js';
import Event from '../models/event.js';

const addEvents = async () => {
	try {
		await mongoose.connect('mongodb://localhost:27017/test');

		const eventsList = await scrapeWebsite(
			'https://www.computerworld.com/article/3313417/tech-event-calendar-shows-conferences-and-it-expos-updated.html'
		);

		Event.insertMany(sanitizeEventsData(eventsList), function (err, docs) {
			if (err) {
				console.log('Encountered error while inserting events to db!');
				console.error(err);
			} else {
				console.log('Events inserted to db successfully.');
				console.log(docs);
			}
		});
	} catch (e) {
		console.error(e);
	}
};

addEvents();

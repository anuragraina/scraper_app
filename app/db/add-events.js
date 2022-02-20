import { scrapeWebsite } from '../services/scraper-service.js';
import { sanitizeEventsData } from '../utils/helpers.js';
import Event from '../models/event.js';
import { scrapeConfig } from '../utils/scrapeConfig.js';
import { connectDB } from './config.js';

const addEvents = async () => {
	try {
		await connectDB();
		const eventsList = await scrapeWebsite(scrapeConfig[0]);

		if (eventsList.length > 0) {
			Event.insertMany(
				sanitizeEventsData(eventsList),
				{ ordered: false },
				function (err, docs) {
					if (err) {
						console.log('Encountered error while inserting events to db!');
						console.error(err);
					} else {
						console.log(`${docs.length} events inserted to db successfully.`);
					}
				}
			);
		} else {
			console.log('No data received!!!');
		}
	} catch (e) {
		console.error(e);
	}
};

addEvents();

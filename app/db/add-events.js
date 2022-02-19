import { scrapeWebsite } from '../services/scraper-service.js';

const addEvents = async () => {
	const data = await scrapeWebsite(
		'https://www.computerworld.com/article/3313417/tech-event-calendar-shows-conferences-and-it-expos-updated.html'
	);
	console.log(data);
};

addEvents();

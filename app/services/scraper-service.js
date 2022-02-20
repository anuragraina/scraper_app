import puppeteer from 'puppeteer';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

export async function scrapeWebsite(scrapeConfig) {
	const { website, eventsContainerSelectors, extractEvent } = scrapeConfig;

	console.log('Launching browser...');
	const browser = await puppeteer.launch();
	try {
		const eventsList = [];

		console.log('Opening new page...');
		const page = await browser.newPage();

		console.log(`Visiting ${website}`);
		console.log('Waiting for website to fully load... This might take a while.');
		await page.goto(website);

		console.log('Fetching data from browser...');
		const eventsDomOuterHtml = await page.evaluate(() => {
			return document.body.outerHTML;
		});

		console.log('eventsDomOuterHtml received from browser!');

		const eventsDom = new JSDOM(eventsDomOuterHtml);
		const eventsNodeList = eventsDom.window.document.querySelectorAll(eventsContainerSelectors);

		console.log('eventsNodeList extracted from eventsDom!');

		eventsNodeList.forEach(eventNode => {
			eventsList.push(extractEvent(eventNode, website));
		});

		await browser.close();

		console.log(`Events List ready containing ${eventsList.length} events`);

		return eventsList;
	} catch (e) {
		console.log(e);
		await browser.close();
		return [];
	}
}

// scrapeWebsite({
// 	website:
// 		'https://www.computerworld.com/article/3313417/tech-event-calendar-shows-conferences-and-it-expos-updated.html',
// 	eventsContainerSelectors: 'tr.odd, tr.even',
// 	extractEvent: (eventNode, website) => {
// 		const eventName = eventNode.children.item(0).textContent;
// 		const startDate = eventNode.children.item(2).textContent;
// 		const endDate = eventNode.children.item(3).textContent;
// 		const location = eventNode.children.item(4).textContent;

// 		return {
// 			website,
// 			eventName,
// 			startDate,
// 			endDate,
// 			location,
// 		};
// 	},
// });

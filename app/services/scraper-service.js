import puppeteer from 'puppeteer';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

export async function scrapeWebsite(scrapeConfig) {
	const { website, eventsContainerSelectors, extractEvent } = scrapeConfig;

	const browser = await puppeteer.launch();
	try {
		const eventsList = [];
		const page = await browser.newPage();
		await page.goto(website);

		const eventsDomOuterHtml = await page.evaluate(() => {
			return document.body.outerHTML;
		});

		const eventsDom = new JSDOM(eventsDomOuterHtml);

		const eventsNodeList = eventsDom.window.document.querySelectorAll(eventsContainerSelectors);

		eventsNodeList.forEach(eventNode => {
			eventsList.push(extractEvent(eventNode, website));
		});

		await browser.close();

		console.log(eventsList);
	} catch (e) {
		console.log(e);
		await browser.close();
		return [];
	}
}

scrapeWebsite({
	website:
		'https://www.computerworld.com/article/3313417/tech-event-calendar-shows-conferences-and-it-expos-updated.html',
	eventsContainerSelectors: 'tr.odd, tr.even',
	extractEvent: (eventNode, website) => {
		const eventName = eventNode.children.item(0).textContent;
		const startDate = eventNode.children.item(2).textContent;
		const endDate = eventNode.children.item(3).textContent;
		const location = eventNode.children.item(4).textContent;

		return {
			website,
			eventName,
			startDate,
			endDate,
			location,
		};
	},
});

import puppeteer from 'puppeteer';

export async function scrapeWebsite(website) {
	const browser = await puppeteer.launch({ devtools: true });
	try {
		const page = await browser.newPage();
		await page.goto(website);

		const eventsList = await page.evaluate(() => {
			const eventsData = [];

			const eventsNodeList = document.querySelectorAll('tr.odd, tr.even');

			eventsNodeList.forEach(eventNode => {
				const eventName = eventNode.children.item(0).textContent;
				const startDate = eventNode.children.item(2).textContent;
				const endDate = eventNode.children.item(3).textContent;
				const location = eventNode.children.item(4).textContent;

				eventsData.push({
					eventName,
					startDate,
					endDate,
					location,
				});
				console.log(eventNode.children.item(3).textContent);
			});

			return eventsData;
		});

		await browser.close();

		//return events list after adding website to each event
		return eventsList.map(event => ({
			website,
			...event,
		}));
	} catch (e) {
		console.log(e);
		await browser.close();
		return null;
	}
}

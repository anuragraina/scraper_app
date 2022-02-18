const puppeteer = require('puppeteer');

async function start() {
	const browser = await puppeteer.launch({ devtools: true });
	const page = await browser.newPage();
	await page.goto(
		'https://www.computerworld.com/article/3313417/tech-event-calendar-shows-conferences-and-it-expos-updated.html'
	);

	const data = await page.evaluate(() => {
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

	console.log(data);

	await browser.close();
}

start();

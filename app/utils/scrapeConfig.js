export const scrapeConfig = [
	{
		website:
			'https://www.computerworld.com/article/3313417/tech-event-calendar-shows-conferences-and-it-expos-updated.html',
		eventsContainerSelectors: 'tr.odd, tr.even',
		extractEvent: (eventNode, website) => {
			const eventName = eventNode.children.item(0).textContent;
			const date = eventNode.children.item(2).textContent;
			const location = eventNode.children.item(4).textContent;

			return {
				website,
				eventName,
				date,
				location,
			};
		},
	},
	{
		website: 'https://www.techmeme.com/events',
		eventsContainerSelectors: 'div.rhov > a',
	},
];

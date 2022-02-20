//function to ensure data is formatted correctly before inserting into db
export const sanitizeEventsData = eventsList => {
	return eventsList.map(event => {
		return {
			...event,
			date: new Date(event.date),
		};
	});
};

//function to ensure data is formatted correctly before inserting into db
export const sanitizeEventsData = eventsList => {
	return eventsList.map(event => {
		if (event.endDate) {
			return {
				...event,
				startDate: new Date(event.startDate),
				endDate: new Date(event.endDate),
			};
		}

		return {
			...event,
			startDate: new Date(event.startDate),
		};
	});
};

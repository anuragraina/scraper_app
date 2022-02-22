import Event from '../models/event.js';

//function to ensure data is formatted correctly before inserting into db
export const sanitizeEventsData = eventsList => {
	return eventsList.map(event => {
		return {
			...event,
			date: new Date(event.date),
		};
	});
};

export const queryDb = async queryParams => {
	const { locationType } = queryParams;

	const queryObject = {};

	if (locationType === 'Virtual') {
		queryObject.location = '';
	} else if (locationType === 'Offline') {
		queryObject.location = { $ne: '' };
	}

	console.log(queryObject);

	return Event.find(queryObject);
};

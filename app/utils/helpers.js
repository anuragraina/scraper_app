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

	if (locationType === 'Virtual') {
		return Event.where('location').equals('');
	} else if (locationType === 'Offline') {
		return Event.where('location').ne('');
	} else {
		return Event.find({});
	}
};

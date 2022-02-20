import Event from '../models/event.js';

export const getEvents = async () => {
	try {
		const events = await Event.find({});

		return events.map(event => ({
			websiteName: event.websiteName,
			eventName: event.eventName,
			date: event.date,
			location: event.location,
		}));
	} catch (e) {
		console.error(e);
		return {
			error: e.message,
		};
	}
};

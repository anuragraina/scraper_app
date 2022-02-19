import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
	website: {
		type: String,
		required: 'Website is required',
	},
	eventName: {
		type: String,
		required: 'Event name is required',
		unique: true,
	},
	startDate: {
		type: Date,
		required: 'Start Date is required',
	},
	endDate: Date,
	location: String,
});

const Event = mongoose.model('Event', eventSchema);

export default Event;

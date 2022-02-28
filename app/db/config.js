import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		await mongoose.connect('mongodb://localhost:27017/test');
		console.log('MongoDB is connected!!!');
	} catch (err) {
		console.error(err.message);
	}
};

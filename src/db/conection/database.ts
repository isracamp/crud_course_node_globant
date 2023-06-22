import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`);
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;

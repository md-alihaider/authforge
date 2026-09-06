import mongoose from 'mongoose'


export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log("Error in connecting to MongoDB",error.message)
    process.exit(1) //1 is failure, 0 is success
  }
}
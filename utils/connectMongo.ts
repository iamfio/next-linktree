import mongoose from 'mongoose'

export const connectMongo = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('MongoDB already connected')
    return
  }
  
  mongoose.set('strictQuery', false)
  return mongoose.connect(process.env.MONGODB_URI!)
}

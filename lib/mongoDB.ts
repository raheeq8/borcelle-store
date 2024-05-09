import mongoose from "mongoose";

let isConnected: boolean = false

export const connectToDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true);
    if(isConnected){
        console.log('Mongodb already connected');
        return
    }
    try {
        await mongoose.connect(process.env.MONGO_URI || "", {
            dbName: "Borcelle_Store"
        })
        isConnected = true
        console.log('Database connected successfully')
    } catch (error) {
        console.log(`Error !! mongodb connection failed ${error}`)
    }
}
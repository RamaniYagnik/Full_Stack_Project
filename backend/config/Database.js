import mongoose from "mongoose";

const url = "mongodb+srv://ramaniyagnik06:GC5nS2uZbIV446tz@cluster0.ddqxc.mongodb.net/FullStack-Project-Backend?retryWrites=true&w=majority&appName=Cluster0"

mongoose.set('strictQuery',false)

export default mongoose.connect(url)
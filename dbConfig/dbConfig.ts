import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected',()=>{
            console.log('MongoDbB Connected Succesfully');
        });


        connection.on('error',(err)=>{
            console.log('MongoDbB Connection  Error' +err);
            process.exit();
        });


    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
    }
}
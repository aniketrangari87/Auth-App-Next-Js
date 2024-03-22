import mongoose, { connection, mongo } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected ", () => {
      console.log("mongoDb connected Sucessfully!!");
    });

    connection.on("error", (err) => {
      console.log(
        "mongoDb Connection error , Please make sure mongodb is runnig " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong ");
    console.log(error);
  }
}

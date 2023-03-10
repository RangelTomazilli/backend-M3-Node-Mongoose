import { connection, connections, connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongo = process.env.MONGO as string;

export function mongoConnect() {
  connection
    .on("error", (error) => {
      console.log("ERROR: Connection to MongoDB failed", error);
    })

    .on("close", () => {
      console.log("Connection to MongoDB ended");
      process.exit(1);
    })

    .once("open", () => {
      const infos = connections;

      infos.map((info) =>
        console.log(
          `Connected to ${info.host}:${info.port}/${info.name} mongo Database`
        )
      );
    });

  connect(mongo);
}

export function mongoDisconnect() {
  connection.close();
}

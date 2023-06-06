import mongoose from "mongoose";
import { config } from "../Config/config.js";


mongoose.set("strictQuery", false);

const database = mongoose.connect(
    config.DB_URL,
  { useNewUrlParser: true, 
    useUnifiedTopology: true  
  },
  (error) => {
    if (!error) {
      console.log("connected to the mongoDB");
    } else {
      console.log("connection to mongoDB failed \n" + error);
    }
  }
);

export{database};

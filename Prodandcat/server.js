import  express  from "express";
const app = express()
app.use(express.json());
const port = 5001
import cors from 'cors'  
app.use(cors())

app.get('/',(req,res) =>{
    res.send('app is working')
})

import {database} from "./Database/mongo.js"
import { Categoryroutes } from "./Routes/Categoryroutes.js";
app.use('/cat',Categoryroutes);
import { Brandroutes } from "./Routes/Brandroutes.js";
app.use('/brand',Brandroutes);



app.listen(port,() =>{
    console.log(`app is listening on  ${port}` );
})
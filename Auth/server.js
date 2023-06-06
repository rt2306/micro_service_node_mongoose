import  express from 'express'
import  cors from 'cors'
const app = express()
const port = 5000 

app.use(cors());

app.use(express.json())
import {Authroutes} from "./Routes/Authroutes.js"
app.use('/user',Authroutes)

import {Addressroute} from "./Routes/Addressroute.js"
app.use('/address',Addressroute)




console.log('listen on port 5000');
app.listen(port,() =>{
    console.log(`app is listening on  ${port}` );
})
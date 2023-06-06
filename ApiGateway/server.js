import  express  from "express";
// import { createProxyMiddleware } from "http-proxy-middleware";
import gateway from 'fast-gateway'
const app = express();

//defin routes and their ports
// const routes ={
//     '/user': 'http://localhost:8000',
//     '/cat' : 'http://localhost:5000',
//     '/brand' : 'http://localhost:5000'
// }

//create a proxy for each route
// for(const route in routes){
//     const target = routes[route];
//     app.use(route,createProxyMiddleware({target}))
// }



// const checkAuth = (req,res,next)=>{
//     if(req.headers.token && req.headers.token != ''){
//         next()
//     }else{
//         res.setHeader('Content-type','aoolication/json');
//         res.statusCode = 401;
//         res.end(JSON.stringify({status:401,message:'Authentication failes'}))
//     }
// }
const server = gateway({
    routes:[
        {
            prefix:'/users',
            target:'http://localhost:5000',
            hooks:{

            }
        },
        {
            prefix:'/category',
            target:'http://localhost:5001',
            hooks:{
                
            }
        },
        {
            prefix:'/brands',
            target:'http://localhost:5001',
            hooks:{
                
            }
        },

        // create apis and get api's using auth 
        // {
        //     prefix:'/brands',
        //     target:'http://localhost:5001',
        //     middlewares:[checkAuth],
        // methods: ['POST','GET'],
        //     hooks:{
                
        //     }
        // }
    ]
})
const PORT = 5200;
// app.listen(PORT, () => console.log("APIGATEWAY STARTED"))

server.start(PORT).then(server=>{
    console.log(`api gateway is running on ${PORT}`)
})

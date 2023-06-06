import express  from "express";
import AddressController from "../Controllers/AddressController.js";
import Authenticate from "../Middleware/Authenticate.js";

const router = express.Router()
 
router.post("/user_address" ,Authenticate, AddressController.user_address); 
router.get("/get_address" ,Authenticate, AddressController.get_address); 
router.delete("/delete_address/:id" ,Authenticate, AddressController.delete_address); 
router.put("/update_address/:id" ,Authenticate, AddressController.update_address); 










export const Addressroute = router
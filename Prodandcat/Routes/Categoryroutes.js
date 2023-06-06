import Category from "../Controllers/Category.js";
import express from 'express'
import ImageController from "../MiddlewareImage/ImageController.js"
const router = express.Router();


router.post('/Category_Add', ImageController.upload.single('Category_image'), Category.addCategory)
router.put('/Category_update/:id',Category.updateCategory)
router.get('/Category_get',Category.getCategory)
router.delete('/Category_delete/:id',Category.deleteCategory)





export const Categoryroutes = router
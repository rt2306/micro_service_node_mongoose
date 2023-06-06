import Brand from "../Controllers/BrandController.js";
import express from 'express'
import ImageController from "../MiddlewareImage/ImageController.js"
const router = express.Router();


router.post('/Brand_Add', ImageController.upload_brand.single('Brand_image'), Brand.addBrand)
router.put('/Brand_update/:id',Brand.updateBrand)
router.get('/Brand_get',Brand.getBrand)
router.delete('/Brand_delete/:id',Brand.deleteBrand)





export const Brandroutes = router
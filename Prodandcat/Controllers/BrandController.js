import reply from "../Common/reply.js"
import idValidate from "../Common/idValidate.js" 
import CValidator from "../Validator/CustomValidation.js" 
import { Brands } from "../Models/Brands.js"
 



const addBrand = async (req, res) => {
    let request = req.body
    if(req.file){
        request.Brand_image = req.file.filename 
    }
    let { status, message } = await CValidator(request, {
        'Brand_name': 'required|min:4|max:10',
        'Brand_image': 'required',
    })
 
   
    if (!status) {
        return res.send(reply.failed(message))
    }
    let find_category = await Brands.findOne({ "Brand_name": request.Brand_name }); 

    if (find_category) {
        return res.send("Brand Already Added")
    }

    const adding = new Brands({
        'Brand_name': request.Brand_name,
        'Brand_image': request.Brand_image
    })

   

    await adding.save()
    return res.send(reply.success("Brand Added Sucessfully"));
}

 
const getBrand = async (req, res) => {   
    try {
       const pageNumber = req.query.pageNumber || 1; // Get the current page number from the request query parameters
       const pageSize = req.query.pageSize || 2;  //how much data want to show  
       let updating =  Brands.find().skip((pageNumber - 1) * pageSize).limit(pageSize).exec((err, documents) => {
         if (err) {
           return res.json(reply.failed('An error occurred.')); 
         } else {
            Brands.countDocuments().exec((countErr, totalCount) => {
             if (countErr) {
               return res.json(reply.failed('An error occurred.'));  
             } else {
               const totalPages = Math.ceil(totalCount / pageSize);
               return res.send(reply.success("Brands Fetched Sucessfully",{ currentPage: pageNumber,
                   totalPages: totalPages,
                   totalDocuments: totalCount,
                   documents: documents}));
                
             }
           });
         }
       });

    // let Branding = await Brands.find()
    // console.log(Branding,"BrandingBranding");
    // return res.send(reply,success("Brands", Branding))
      
   } catch (err) {
       console.log(err,"errerr");
       return res.json(reply.failed('Unable to find at this moment.'));
   }
}




const updateBrand = async (req, res) => {
    let request = req.body;
    let { status, message } = await CValidator(request, {
        status: 'required|in:0,1'
    });
    const { id } = req.params;
    let chk = await idValidate.validateMongoDbId(id); 
    if(!chk){
        return  res.json(reply.failed('Category Id not exists'));
    }

    if (!status) {
        return res.send(reply.failed(message))
    }

    try {
        await Brands.findByIdAndUpdate(req.params.id, { Brands_status: request.status }, { new: true }); 
        return res.json(reply.success('Brand Updated Successfully.'));

    } catch (err) {
        return res.json(reply.failed('Unable to update at this moment.'));
    }


}

const deleteBrand = async (req, res) => {
    const { id } = req.params;
    let chk = await idValidate.validateMongoDbId(id); 
    if(!chk){
        return  res.json(reply.failed('Category Id not exists'));
    }
    try {
        const deletedCategory = await Brands.findByIdAndDelete(id);
        return res.json(reply.success("Category deleted successfully", deletedCategory)); 
    } catch (error) {
        return res.json(reply.failed('Unable to delete category at this moment.'));
    }


}

export default {
    addBrand,
    updateBrand,
    getBrand,
    deleteBrand
}
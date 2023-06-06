import reply from "../Common/reply.js"
import idValidate from "../Common/idValidate.js"
import { Category } from "../Models/Category.js"
import CValidator from "../Validator/CustomValidation.js" 
 
const addCategory = async (req, res) => {
    let request = req.body
    if(req.file){
        request.Category_image = req.file.filename;   
    }
    let { status, message } = await CValidator(request, {
        'Category_name': 'required|min:4|max:10',
        'Category_image': 'required',
    })
 
   
    if (!status) {
        return res.send(reply.failed(message))
    }
    let find_category = await Category.findOne({ "Category_name": request.Category_name }); 

    if (find_category) {
        return res.send("Category Already Added")
    }

    const adding = new Category({
        'Category_name': request.Category_name,
        'Category_image':  request.Category_image 
    })
 console.log(request.Category_image,"request.Category_imagerequest.Category_image");
    console.log(adding,"addingaddingaddingaddingadding");

    await adding.save()
    return res.send(reply.success("Category Added Sucessfully"));
}

const getCategory = async (req, res) => {  
     try {
        const pageNumber = req.query.pageNumber || 1; // Get the current page number from the request query parameters
        const pageSize = req.query.pageSize || 2;  //how much data want to show  
        let updating =  Category.find().skip((pageNumber - 1) * pageSize).limit(pageSize).exec((err, documents) => {
            console.log(err,"errerr");
          if (err) {
            return res.json(reply.failed('An error occurred.')); 
          } else {
            Category.countDocuments().exec((countErr, totalCount) => {
              if (countErr) {
                return res.json(reply.failed('An error occurred.'));  
              } else {
                const totalPages = Math.ceil(totalCount / pageSize);
                return res.send(reply.success("Category Fetched Sucessfully",{ currentPage: pageNumber,
                    totalPages: totalPages,
                    totalDocuments: totalCount,
                    documents: documents}));
                 
              }
            });
          }
        });
       
    } catch (err) {
        console.log(err,"errerr");
        return res.json(reply.failed('Unable to Fetched at this moment.'));
    }
}


const updateCategory = async (req, res) => {
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
        let updating = await Category.findByIdAndUpdate(req.params.id, { Category_status: request.status }, { new: true });
        console.log(updating, "updating");
        return res.json(reply.success('Category Updated Successfully.'));

    } catch (err) {
        return res.json(reply.failed('Unable to update at this moment.'));
    }


}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    let chk = await idValidate.validateMongoDbId(id); 
    if(!chk){
        return  res.json(reply.failed('Category Id not exists'));
    }
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        return res.json(reply.success("Category deleted successfully", deletedCategory)); 
    } catch (error) {
        return res.json(reply.failed('Unable to delete category at this moment.'));
    }


}

export default {
    addCategory,
    updateCategory,
    getCategory,
    deleteCategory
}
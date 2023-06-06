import mongoose from "mongoose"
const validateMongoDbId = (id) => { 
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      return false;
    }
    return true;
  };
 

export default{
    validateMongoDbId 
}
;
import mongoose from "mongoose";
import  mongoosePaginate from "mongoose-paginate";

const CategorySchema = mongoose.Schema(

  {   
    Category_name: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
   Category_image: {
      type: String,
      lowercase: true, 
      trim: true,
    }, 
    Category_status: {
      type: Number,
      default: 1,
    },
   
  },
  { timestamps: true } //to include createdAt and updatedAt
);
CategorySchema.plugin(mongoosePaginate);
const Category = mongoose.model("Category", CategorySchema);
export{Category};
;
import mongoose from "mongoose";
import  mongoosePaginate from "mongoose-paginate";

const BrandsSchema = mongoose.Schema(
  { 
   Brand_name: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
  Brand_image: {  
      type: String,
      lowercase: true, 
      trim: true,
    },
    Brand_status: {
      type: Number,
      default: 1,
    },
   
  },
  { timestamps: true } //to include createdAt and updatedAt
);
BrandsSchema.plugin(mongoosePaginate);
const Brands = mongoose.model("Brands", BrandsSchema);
export{Brands};
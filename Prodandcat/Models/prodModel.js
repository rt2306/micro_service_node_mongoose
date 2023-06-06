 ;
import mongoose from "mongoose";
import  mongoosePaginate from "mongoose-paginate";

const productSchema = mongoose.Schema(
  {
    in_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    title: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    meta_title: {
      type: String,
      lowercase: true, 
      trim: true,
    },
    p_type: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    p_brand: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    p_discount: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    productImage: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    p_size: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    p_color: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    p_reviews: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true } //to include createdAt and updatedAt
);
productSchema.plugin(mongoosePaginate);
const Product = mongoose.model("Product", productSchema);
export{Product};
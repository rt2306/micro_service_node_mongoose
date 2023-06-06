
"# micro_service_node_mongoose" 


Node auth api 
1 create signup with mobile / email
2 create login with mobile / email
3 get otp
4 verify otp
5 logout


Create custom function for validation
Create Auth middleware 
Create cutsom response message function

/////////////////////// user tabel //////////////////////////
import {Model ,Sequelize} from "../Database/sequelize.js"
import { UserMeta } from "./UserMeta..js"


export const User = Model.define('users',{
   id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
   },
   user_unique_id: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
   },
   name:{
      type:Sequelize.STRING
   },
   email:{
      type:Sequelize.STRING
   },
   email_verified_at: {
      type: Sequelize.DATE,
      allowNull: true
   },
   mobile:{
      type:Sequelize.STRING
   },
   mobile_verified_at: {
      type: Sequelize.DATE,
      allowNull: true
   },
   password:{
      type:Sequelize.STRING
   },
   role:{
      type:Sequelize.STRING
   },   
  
 
},{
     underscored:true,
     createdAt:'created_at',
     updatedAt:'updated_at'   
})

await User.sync()

User.hasOne(UserMeta,{
   as:"meta",
   foreignKey: 'user_id'

})

UserMeta.belongsTo(User)



///////////////////////////// user meta/////////////////////////////

import { Model , Sequelize } from "../Database/sequelize.js"; 

export const UserMeta  = Model.define('user_meta', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        primaryKey: true
    },
    user_id:Sequelize.STRING, 
    is_email_authentication:{
        type: Sequelize.TINYINT,
        defaultValue: 1,
        comment:'0 = OFF, 1 = ON'
    },
    is_mobile_authentication:{
        type: Sequelize.TINYINT,
        defaultValue: 1,
        comment:'0 = OFF, 1 = ON'
    },
    is_google_authentication:{
        type: Sequelize.TINYINT,
        defaultValue: 0,
        comment:'0 = OFF, 1 = ON'
    }, 
    gauth_secret: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    r_key:{
        type: Sequelize.STRING,
        defaultValue: null
    },
    expired_at: Sequelize.DATE
    
},{
    underscored: true,
});

await UserMeta.sync();

//////////////////////////////////// token tabel/////////////////////
import { Model , Sequelize } from "../Database/sequelize.js";

export const Token = Model.define('oauth_access_tokens', {
    id: {
        type: Sequelize.STRING(100),
        primaryKey: true
    },
    user_id: Sequelize.BIGINT(20).UNSIGNED ,
    client_id: Sequelize.BIGINT(20).UNSIGNED ,
    name: Sequelize.STRING,
    scopes:Sequelize.TEXT,
    revoked: {
        type:Sequelize.BOOLEAN,
        defaultValue:"0"
    },
    expires_at: Sequelize.DATE
},{
    underscored: true,
});

await Token.sync();

/////////////////////////////////otp tabel ///////////////////////////
import { Model, Sequelize } from "../Database/sequelize.js";

export const Otp = Model.define('Otp', {
    id: {
        type: Sequelize.BIGINT(20),
        autoIncrement: true,
        primaryKey: true
    },
    user_id: Sequelize.STRING,
    otp: {
        type: Sequelize.STRING,
        get() {
            const rawValue = this.getDataValue('otp');
            if (rawValue) {
                return JSON.parse(rawValue);
            }
            return {};
        },
        set(value) {

            let v = value ? JSON.stringify(value) : {};
            this.setDataValue('otp', v);
        }
    },
    type: Sequelize.STRING,
    value: {
        type: Sequelize.STRING,
        allowNull: true
    },
   
    expired_at: Sequelize.DATE
}, {
    underscored: true,
});

await Otp.sync();










Moongoose porduct brand Category tabel

1 create ,update,detele,get [category,brand] api
2 create custom function for validations


////////////////////////brands////////////////

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




////////////////// category ///////////////////
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


///////////////////////////product////////////////////
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

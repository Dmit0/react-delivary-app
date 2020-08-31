const {Schema,model,Types}=require('mongoose')
const UserSchema  = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    telephone:{
        type:String,
        required:true
    },
    isConferm:{
        type:Boolean,
        default:false
    },
    discount:{
        type:String,
        default:'bronze'
    },
    role:{type:Types.ObjectId,ref:"Role"},
    ownership:[{type:Types.ObjectId,ref:"Restaurant"}],
    lovedReastaurant:[{type:Types.ObjectId,ref:"Restaurant"}],

})
module.exports=model("User",UserSchema)
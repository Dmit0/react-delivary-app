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
    discount:{
        type:String,
        default:'bronze'
    },
    role:{type:Types.ObjectId,ref:"Role"},
    ownership:[{type:Types.ObjectId,ref:"Restaurant"}],
    lovedReastaurant:[{type:Types.ObjectId,ref:"Restaurant"}]

})
module.exports=model("User",MealSchema)
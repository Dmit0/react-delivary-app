const {Schema,model,Types}=require('mongoose')

const RestaurantSchema  = new Schema({
    name:{
        type:String,
        required:true
    },
    working_time:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    meals:[{type:Types.ObjectId,ref:"Meal"}],
    owner:{type:Types.ObjectId,ref:"User"},
    saved:[{type:Types.ObjectId,ref:"User"}]
    
})
module.exports=model("Restaurant",RestaurantSchema)
const {Schema,model,Types}=require('mongoose')
const MealSchema  = new Schema({
    name:{
        type:String,
        required:true
    },
   
    picture:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    count:{
        type:Number,
        default:1
    },
    restaurant:{type:Types.ObjectId,ref:"Restaurant"}
    
})
module.exports=model("Meal",MealSchema)
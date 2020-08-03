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
    restaurant:{type:Types.ObjectId,ref:"Restaurant"}
    
})
module.exports=model("Meal",MealSchema)
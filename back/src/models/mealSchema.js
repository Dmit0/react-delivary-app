const MealSchema  = new Schema({
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
    restaurant:{type:Types.ObjectId,ref:"Restaurant"}
    
})
module.exports=model("Restaurant",MealSchema)
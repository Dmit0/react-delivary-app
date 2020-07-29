


let Role = mongoose.Schema.Types.Mixed;
let Discaunt = mongoose.Schema.Types.Mixed;


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
    role:{
        type:String,
        default:"user"
    },
    ownership:[{type:Types.ObjectId,ref:"Restaurant"}],
    savedReastaurant:[{type:Types.ObjectId,ref:"Restaurant"}]

})
module.exports=model("User",MealSchema)
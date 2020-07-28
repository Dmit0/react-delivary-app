type discaunt = 'bronze' | 'silver' | 'gold' | 'admin'
type role = 'user' | 'admin' | 'subadmin' | 'member'


let Role:role = mongoose.Schema.Types.Mixed;
let Discaunt:discaunt = mongoose.Schema.Types.Mixed;


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
        type:Discaunt,
        default:'bronze'
    },
    role:{
        type:Role,
        default:"user"
    },
    ownership:[{type:Types.ObjectId,ref:"Restaurant"}],
    savedReastaurant:[{type:Types.ObjectId,ref:"Restaurant"}]

})
module.exports=model("User",MealSchema)
const {Schema,model,Types}=require('mongoose')
const UserSchema  = new Schema({
    role:{
        type:String,
        required:true,
        default:"guest"
    },
    opportunities:[{type:Types.ObjectId,ref:"Opportunities"}]
})

module.exports=model("Role",RoleSchema)
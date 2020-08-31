const {Schema,model,Types}=require('mongoose')
const RoleSchema  = new Schema({
    role:{
        type:String,
        required:true,
        default:"user"
    },
    opportunities:[{type:Types.ObjectId,ref:"Opportunities"}]
})

module.exports=model("Role",RoleSchema)
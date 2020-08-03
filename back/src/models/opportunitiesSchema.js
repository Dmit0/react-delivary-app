const {Schema,model,Types}=require('mongoose')
const OpportunitiesSchema  = new Schema({
    name:{
        type:String,
        unique:true
    },
    representatives:[{type:Types.ObjectId,ref:"Role"}]
})
module.exports=model("Opportunities",OpportunitiesSchema)
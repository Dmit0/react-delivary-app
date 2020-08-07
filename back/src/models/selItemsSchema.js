const {Schema,model,Types}=require('mongoose')
const SelItemsSchema  = new Schema({
    name:{
        type:String,
        unique:true
    },
})
module.exports=model("SelItems",SelItemsSchema)
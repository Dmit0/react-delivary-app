const {Schema,model,Types}=require('mongoose')
const BanerSchema  = new Schema({
    pictures:[]
})
module.exports=model("Banner",BannerSchema)
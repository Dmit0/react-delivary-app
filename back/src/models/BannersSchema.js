const {Schema,model,Types}=require('mongoose')
const BannerSchema  = new Schema({

   picture:{
        type:String,
        required:true
    },
    
})
module.exports=model("Banner",BannerSchema)
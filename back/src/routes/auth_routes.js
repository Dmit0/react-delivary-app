const {Router}=require('express')
const User=require('../models/userSchema')
const router=Router()



//api/authentication/AccountCreate
router.post('/AccountCreate',async(req,res)=>{
    try{

        const UserAdd={
            Email:req.body.Email,
            Password:req.body.Password,
            Telephone:req.body.Telephone,
            Name:req.body.Name,
            
        }
        const user = new User({name:UserAdd.Name,password:UserAdd.Password,telephone:UserAdd.Telephone,email:UserAdd.Email})
        await user.save()
        res.status(201).json({message:"restaurant was saved"})

    }catch(e){
        res.status(500).json({message:"server error with add rest"})
        //добавить проверки на то емаил или нет
        //есть ли вообще такой эмаил 
        //отправить сообщение с подтверждением аккаунта
    }
})

module.exports=router
const {Router}=require('express')
const Restaurant=require('../models/restaurantSchema')
const router=Router()


// /api/restaurant

router.get('/', async(req,res)=>{
    try{
       
        const restaurants = await Restaurant.find()
        res.json(restaurants)
    }catch(e){
        res.status(500).json({message:"server error with fetching data"})
    }
})

router.post('/add', async(req,res)=>{
    try{
       
        const ReastaurantAdd={
            name:req.body.name,
            working_time:req.body.working_time,
            description:req.body.description,
            picture:req.body.picture
        }
        
        const restaurant = new Restaurant({name:ReastaurantAdd.name,working_time:ReastaurantAdd.working_time,description:ReastaurantAdd.description,picture:ReastaurantAdd.picture})
        await restaurant.save()
        res.status(201).json({message:"restaurant was saved"})

    }catch(e){
        res.status(500).json({message:"server error with add rest"})
    }
})

module.exports=router
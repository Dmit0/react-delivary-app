const {Router}=require('express')
const Restaurant=require('../models/restaurantSchema')
const Meal = require('../models/mealSchema')
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

router.post('/restaurant/add', async(req,res)=>{
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

router.post('/meal/add',async(req,res)=>{
    try{
        const MealtAdd={
            name:req.body.name,
            picture:req.body.picture,
            restaurant:req.body.restaurant
        }
     
            const meal = new Meal({name:MealtAdd.name,picture:MealtAdd.picture,restaurant:MealtAdd.restaurant})
            await meal.save()
       
       
        
        res.status(201).json({message:"meal was saved"})

    }catch(e){
        res.status(500).json({message:"server error with add meal"})
    }
})


router.post('/getMeal', async(req,res)=>{
    try{
        RestaurantId=req.body._id
        console.log(req.body)
        const meals = await Meal.find({restaurant:RestaurantId})
        if(!meals){
            throw Error('no such restaurant')
        }
        //console.log(meals)
        res.json(meals)
    }catch(e){
        res.status(500).json({message:"server error with fetching data"})
    }
})





module.exports=router
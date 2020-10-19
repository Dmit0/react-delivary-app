const { Router } = require('express')
const Restaurant = require('../models/restaurantSchema')
const Meal = require('../models/mealSchema')
const Bunner = require('../models/BannersSchema')
const Cuisen = require('../models/selItemsSchema')
const router = Router()


// /api/restaurant

router.get('/', async (req, res) => {
  try {

    const restaurants = await Restaurant.find()
    res.status(201).json(restaurants)
  } catch (e) {
    res.status(500).json({ message: "server error with fetching data" })
  }
})

router.post('/restaurant/add', async (req, res) => {
  try {

    const ReastaurantAdd = {
      name: req.body.name,
      working_time: req.body.working_time,
      description: req.body.description,
      picture: req.body.picture
    }

    const restaurant = new Restaurant({
      name: ReastaurantAdd.name,
      working_time: ReastaurantAdd.working_time,
      description: ReastaurantAdd.description,
      picture: ReastaurantAdd.picture
    })
    await restaurant.save()
    res.status(201).json({ message: "restaurant was saved" })

  } catch (e) {
    res.status(500).json({ message: "server error with add rest" })
  }
})

router.post('/meal/add', async (req, res) => {
  try {
    const MealtAdd = {
      name: req.body.name,
      picture: req.body.picture,
      restaurant: req.body.restaurant
    }

    const meal = new Meal({ name: MealtAdd.name, picture: MealtAdd.picture, restaurant: MealtAdd.restaurant })
    await meal.save()


    res.status(201).json({ message: "meal was saved" })

  } catch (e) {
    res.status(500).json({ message: "server error with add meal" })
  }
})


router.post('/getMeal', async (req, res) => {
  try {

    RestaurantId = req.body._id

    const meals = await Meal.find({ restaurant: RestaurantId })
    if (!meals) {
      throw Error('no such restaurant')
    }
    res.status(201).json(meals)
  } catch (e) {
    res.status(500).json({ message: "server error with fetching data" })
  }
})


router.post('/addBanner', async (req, res) => {
  try {
    banner_img = req.body.banner
    const banner = new Bunner({ picture: banner_img })
    await banner.save()
    res.status(201).json({ message: "banner was saved" })
  } catch (e) {
    res.status(500).json({ message: "server error with adding banner" })
  }
})

router.get('/getBunners', async (req, res) => {
  try {
    const bunners = await Bunner.find()
    res.status(201).json(bunners)
  } catch (e) {
    res.status(500).json({ message: "server error with fetching bunners" })
  }
})

router.post('/setCuisen', async (req, res) => {
  try {
    cuisen_name = req.body.name

    const cuisen = await Cuisen({ name: cuisen_name })
    await cuisen.save()
    res.status(201).json({ message: 'cuisen was saved' })

  } catch (e) {
    res.status(500).json({ message: "server error with setting cuisen" })
  }
})

router.get('/getCuisenTypes', async (_, res) => {
  try {
    const cuisens = await Cuisen.find()
    res.json(cuisens)
  } catch (e) {
    res.status(500).json({ message: "server error with getting cuisen" })
  }
})
router.post('/setCuisenTypes', async (req, res) => {
  try {
    const restaurant = req.body.restaurant
    const cuisens = req.body.cuisentoAdd
    console.log(restaurant, cuisens)

    const modify_restaurant = await Restaurant.findOneAndUpdate({ _id: restaurant }, { $set: { selItems: cuisens } }, () => {
    })
    if (!modify_restaurant) {
      throw Error
    }
    await modify_restaurant.save()
    res.status(201).json({ message: 'cuisen was saved' })
  } catch (e) {
    res.status(500).json({ message: "server error with setting cuisen to restaurant" })
  }
})


module.exports = router
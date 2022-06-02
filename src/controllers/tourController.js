const Tours = require("../models/TourModel")

const createTour = async (req, res) =>{
    const newTour = new Tours({
        name_tour: req.body.name_tour,
        departure_place: req.body.departure_place,
        destination: req.body.destination,
        price: req.body.price,
        total_quantity: req.body.total_quantity,
        schedule: req.body.schedule,
        description: req.body.description,
        content_tour: req.body.content_tour,
        category: req.body.category,
        url_image: req.file.filename ? "http://localhost:8000/images/" + req.file.filename: null
    })
    await newTour.save().then((result)=>{
        if(result){
            res.status(200).json({tour: result})
        }else{
            res.status(404).json({message: "Create New Tour Fail"})
        }
    })
}

const getToursByCategory = async (req, res) =>{
    const tours = await Tours.find({category: req.query.c, _id: {$not: {$eq: req.params.id_tour}} }).sort({createdAt:-1}).limit(3)
    if(tours){
        res.status(200).json({tours: tours})
    }else{
        res.status(404).json({message: "Create New Tour Fail"})
    }
}

const updateTourById = async(req, res)=>{
    const tour = await Tours.findById(req.params.id_tour)
        tour.name_tour = req.body.name_tour? req.body.name_tour: tour.name_tour
        tour.departure_place = req.body.departure_place? req.body.departure_place: tour.departure_place
        tour.destination = req.body.destination? req.body.destination: tour.destination
        tour.price = req.body.price? req.body.price: tour.price
        tour.total_quantity = req.body.total_quantity? req.body.total_quantity: tour.total_quantity
        tour.schedule = req.body.schedule? req.body.schedule: tour.schedule
        tour.category = req.body.category? req.body.category: tour.category
        tour.description = req.body.description? req.body.description: tour.description
        tour.content_tour = req.body.content_tour? req.body.content_tour: tour.content_tour
        tour.url_image = req.file.filename ? "http://localhost:8000/images/"+req.file.filename : tour.url_image

    await tour.save().then((result)=>{
        if(result){
            res.status(200).json({tour: result})
        }else{
            res.status(404).json({message: "Update Tour Fail"})
        }
    })
}

const deleteTourById = async(req, res)=>{
    await Tours.findByIdAndDelete(req.params.id_tour).then((result)=>{
        if(result){
            res.status(200).json({message: "Delete Tour Success"})
        }else{
            res.status(404).json({message: "Delete Tour Fail"})
        }
    })
}

const getTourById = async (req, res) =>{
    const tour = await Tours.findById(req.params.id_tour)
    if(tour){
        res.status(200).json({tour: tour})
    }else{
        res.status(404).json({message: "Not found this tour"})
    }
}

const getAllTour = async (req, res) =>{
    const tours = await Tours.find().sort({createdAt:-1})
    if(tours){
        res.status(200).json({tours: tours})
    }else{
        res.status(404).json({message: "Not found this tours"})
    }
}

const getTourByPage = async (req, res) =>{
    const page = req.params.page == 0 ? 0 : params*12-1
    const tours = await Tours.find().limit(12).skip(page)
    if(tours){
        res.status(200).json({tours: tours})
    }else{
        res.status(404).json({message: "Not found this tours"})
    }
}

const getTourSlide = async (req, res) =>{
    const tours = await Tours.find({category: "Tour Leo Núi"}).limit(3).skip(0)
    if(tours){
        res.status(200).json({tours: tours})
    }else{
        res.status(404).json({message: "Not found this tours"})
    }
}

const getTourSea = async (req, res) =>{
    const tours = await Tours.find({category: "Tour Biển Đảo"}).sort({createdAt:-1}).limit(4).skip(0)
    if(tours){
        res.status(200).json({tours: tours})
    }else{
        res.status(404).json({message: "Not found this tours"})
    }
}

const getTourNew = async (req, res) =>{
    const tours = await Tours.find({}).sort({createdAt:-1}).limit(1)
    if(tours){
        res.status(200).json({tours: tours})
    }else{
        res.status(404).json({message: "Not found this tours"})
    }
}
const getTourForeign = async (req, res) =>{

    const tours = await Tours.find({category: "Tour Nước Ngoài"}).sort({createdAt:-1}).limit(6)
    if(tours){
        res.status(200).json({tours: tours})
    }else{
        res.status(404).json({message: "Not found this tours"})
    }
}

const getTourSearch = async (req, res) =>{
    const departure_place = req.query.d
    const name_tour = req.query.n
    const value_price = req.query.p
    const category = req.query.c
    const pages = Number(req.query.pages)

    if(value_price==0){
        const tours = await Tours.find({
            category: {'$regex': category},
         departure_place: {'$regex': departure_place},
         name_tour: {'$regex': name_tour},
        }).sort({createdAt:-1}).limit(6).skip(pages)
        if(tours){
            res.status(200).json({tours: tours})
        }else{
            res.status(404).json({message: "Not found this tours"})
        }
    }else{
        if(value_price==3){
            const tours = await Tours.find({
                category: {'$regex': category},
             departure_place: {'$regex': departure_place},
             name_tour: {'$regex': name_tour},
             price: {$lte: 3000000}
            }).sort({createdAt:-1}).limit(6).skip(pages)
            if(tours){
                res.status(200).json({tours: tours})
            }else{
                res.status(404).json({message: "Not found this tours"})
            }
        }else{
            if(value_price==10){
                const tours = await Tours.find({
                    category: {'$regex': category},
                 departure_place: {'$regex': departure_place},
                 name_tour: {'$regex': name_tour},
                 price: {$gte: 3000000, $lte: 10000000}
                }).sort({createdAt:-1}).limit(6).skip(pages)
                if(tours){
                    res.status(200).json({tours: tours})
                }else{
                    res.status(404).json({message: "Not found this tours"})
                }
            }else{
                const tours = await Tours.find({
                    category: {'$regex': category},
                 departure_place: {'$regex': departure_place},
                 name_tour: {'$regex': name_tour},
                 price: {$gt: 10000000}
                }).sort({createdAt:-1}).limit(6).skip(pages)
                if(tours){
                    res.status(200).json({tours: tours})
                }else{
                    res.status(404).json({message: "Not found this tours"})
                }
            }
        }
    }
   
}

module.exports = {
    createTour,
    deleteTourById,
    updateTourById,
    getAllTour,
    getTourById,
    getTourByPage,
    getTourSlide,
    getTourSea,
    getTourNew,
    getTourForeign,
    getTourSearch,
    getToursByCategory
}


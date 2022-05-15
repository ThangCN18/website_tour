const mongoose = require('mongoose');
const BookTours = require("../models/BookTourModel")
const Tours = require("../models/TourModel")
const TourTrips = require("../models/TourTripModel")
const Users = require("../models/UserModel")

const createBookTour = async (req, res)=>{
    const id_tour_trip = mongoose.Types.ObjectId(req.params.id_tour_trip);

    const tourTrip = await TourTrips.findById(req.params.id_tour_trip).populate("id_tour")
    
    const groupBookedTours = await BookTours.aggregate([{$match: {id_tour_trip: id_tour_trip, status: "booking" }},{$group: {_id: "$id_tour", sum_booked: {$sum: "$quantity"}}}])

    if(tourTrip.id_tour.total_quantity - groupBookedTours[0].sum_booked < req.body.quantity && id_tour_trip.departure_day > Date()){
        res.status(404).json({message: "Create New Tour Fail"})
    }else{
        const newBookTour = new BookTours({
            id_user: req.body.id_user,
            id_tour_trip: req.params.id_tour_trip,
            quantity: req.body.quantity
        })
        await newBookTour.save().then((result)=>{
            if(result){
                res.status(200).json({booktour : result})
            }else{
                res.status(404).json({message: "Create New Tour Fail"})
            }
        })
    }
    
}

const updateQuantityBookTour = async (req, res)=>{

    const bookTour = await BookTours.findById(req.params.id_book_tour)

    const tourTrip = await TourTrips.findById(bookTour.id_tour_trip).populate("id_tour")
    
    const groupBookedTours = await BookTours.aggregate([{$match: {id_tour_trip: id_tour_trip, status: "booking" }},{$group: {_id: "$id_tour", sum_booked: {$sum: "$quantity"}}}])

    if(tourTrip.id_tour.total_quantity - groupBookedTours[0].sum_booked < req.body.quantity && id_tour_trip.departure_day > Date() && bookTour.status == "booking"){
        res.status(404).json({message: "Create New Tour Fail"})
    }else{
        bookTour.quantity = req.body.quantity ? req.params.quantity : bookTour.quantity
    await bookTour.save().then((result)=>{
        if(result){
            res.status(200).json({booktour : result})
        }else{
            res.status(404).json({message: "Create New Tour Fail"})
        }
    })
    } 
}

const updateStatusBookTour = async (req, res)=>{
    const bookTour = await BookTours.findById(req.params.id_book_tour)

    if(bookTour.status == "booking"){
        bookTour.status = req.body.status ? req.params.status : bookTour.status
        bookTour.reason = req.body.reason ? req.params.reason : bookTour.reason

        await bookTour.save().then((result)=>{
            if(result){
                res.status(200).json({booktour : result})
            }else{
                res.status(404).json({message: "Create New Tour Fail"})
            }
        })
    }
}

const deleteBookTourById = async (req, res)=>{
    await BookTours.findByIdAndDelete(req.params.id_book_tour).then((result)=>{
        if(result){
            res.status(200).json({message: "Delete Tour Success"})
        }else{
            res.status(404).json({message: "Delete Tour Fail"})
        }
    })
} 

// const getAllBookTour = async (req, res) =>{
//     const bookTours = await BookTours.find().populate("id_tour_trip id_user")
//     if(bookTours){
//         res.status(200).json({bookTours: bookTours})
//     }else{
//         res.status(404).json({message: "Not found this bookTours"})
//     }
// }

const getAllBookTour = async (req, res) =>{
    const bookTours = await BookTours.aggregate([
        {
            $lookup: {
              from: Users.collection.name,
              localField: 'id_user',
              foreignField: '_id',
              as: 'user',
            },
          },
          {
            $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$user', 0] }, '$$ROOT'] } },
          },
          {
            $lookup: {
              from: TourTrips.collection.name,
              localField: 'id_tour_trip',
              foreignField: '_id',
              as: 'tour_trip',
            },
          },
          {
            $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$tour_trip', 0] }, '$$ROOT'] } },
          },

          {
            $lookup: {
              from: Tours.collection.name,
              localField: 'id_tour',
              foreignField: '_id',
              as: 'tour',
            },
          },
          {
            $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$tour', 0] }, '$$ROOT'] } },
          },          
          {
            $project: { _id: 1, email: 1, fullname: 1, quantity: 1, status: 1, reason:1, departure_day: 1, discount: 1, name_tour: 1, price: 1, total_quantity: 1 },
          },
    ])
    if(bookTours){
        res.status(200).json({bookTours: bookTours})
    }else{
        res.status(404).json({message: "Not found this bookTours"})
    }
}

const getBookTourByIdUser = async (req, res) =>{

    const id_user = mongoose.Types.ObjectId(req.params.id_user);

    const bookTours = await BookTours.aggregate([
        {
            $match: {
                id_user : id_user
            }
        },
      
          {
            $lookup: {
              from: TourTrips.collection.name,
              localField: 'id_tour_trip',
              foreignField: '_id',
              as: 'tour_trip',
            },
          },
          {
            $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$tour_trip', 0] }, '$$ROOT'] } },
          },

          {
            $lookup: {
              from: Tours.collection.name,
              localField: 'id_tour',
              foreignField: '_id',
              as: 'tour',
            },
          },
          {
            $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$tour', 0] }, '$$ROOT'] } },
          },
          
          
          {
            $project: { _id: 1, quantity: 1, status: 1, reason:1, departure_day: 1, discount: 1, name_tour: 1, price: 1},
          },
         
    ])
    if(bookTours){
        res.status(200).json({bookTours: bookTours})
    }else{
        res.status(404).json({message: "Not found this bookTours"})
    }
}

module.exports = {
    createBookTour,
    deleteBookTourById,
    getAllBookTour,
    updateQuantityBookTour,
    updateStatusBookTour,
    getBookTourByIdUser
}
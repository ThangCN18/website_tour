const mongoose = require('mongoose');
const Tours = require("../models/TourModel")
const Users = require("../models/UserModel")
const Reviews = require("../models/ReviewModel")


const createReview = async (req, res) =>{
    const id_user = mongoose.Types.ObjectId(req.body.id_user);
    const id_tour = mongoose.Types.ObjectId(req.params.id_tour);

    const checkReviewed = Reviews.find({id_user : id_user, id_tour: id_tour})
    if((await checkReviewed).length!=0){
        res.status(404).json({message: "sorry, you have already reviewed!"})
    }else{
        const newReview = new Reviews({
            id_tour: id_tour,
            id_user: id_user,
            content: req.body.content,
            number_star: req.body.number_star
        })
        await newReview.save().then((result)=>{
            if(result){
                res.status(200).json({review : result})
            }else{
                res.status(404).json({message: "Create New Tour Fail"})
            }
        })
    }
}

const getAllReviews = async (req, res) =>{

    const reviews = await Reviews.aggregate([
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
            $project: { _id: 1, fullname: 1, email: 1, number_star: 1, content: 1, name_tour: 1},
          },
         
    ])
    if(reviews){
        res.status(200).json({reviews: reviews})
    }else{
        res.status(404).json({message: "Not found this reviews"})
    }
}

const getReviewsByIdTour = async (req, res) =>{

    const id_tour = mongoose.Types.ObjectId(req.params.id_tour);

    const reviews = await Reviews.aggregate([
        {
            $match: {id_tour: id_tour}
        },

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
            $project: { _id: 1, fullname: 1, email: 1, number_star: 1, content: 1},
          },
    ])
    if(reviews){
        res.status(200).json({reviews: reviews})
    }else{
        res.status(404).json({message: "Not found this reviews"})
    }
}

const deleteReviewById = async (req, res) =>{
    const result = await Reviews.findByIdAndDelete(req.params.id_review)
        if(result){
            res.status(200).json({message: "Delete Review Success"})
        }else{
            res.status(404).json({message: "Delete Review Fail"})
        }
  
}


module.exports = {
    createReview,
    getAllReviews,
    getReviewsByIdTour,
    deleteReviewById
}
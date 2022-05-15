const TourTrips = require("../models/TourTripModel")


const createTourTrip = async (req, res)=>{
    const newTourTrip = new TourTrips({
        id_tour: req.params.id_tour,
        departure_day: req.body.departure_day,
        discount: req.body.discount
    })
    await newTourTrip.save().then(result =>{
        if(result){
            res.status(200).json({tourTrip: newTourTrip})
        }else{
            res.status(404).json({message: "Create Tour Trip Fail"})
        }
    })
}

const updateTourTripById = async (req, res) =>{
    const tourTrip = await TourTrips.findById(req.params.id_tour_trip)

    tourTrip.departure_day = req.body.departure_day? req.body.departure_day: tourTrip.departure_day
    tourTrip.discount = req.body.discount? req.body.discount: tourTrip.discount

    await tourTrip.save().then(result =>{
        if(result){
            res.status(200).json({tourTrip: tourTrip})
        }else{
            res.status(404).json({message: "Update Tour Trip Fail"})
        }
    })
}

const deleteTourTripById = async (req, res) =>{
    const tourTrip = await TourTrips.findByIdAndDelete(req.params.id_tour_trip)
        if(tourTrip){
            res.status(200).json({message: "Delete Tour Trip Success"})
        }else{
            res.status(404).json({message: "Delete Tour Trip Fail"})
        }
}

const getTourTripsByIdTour = async(req, res)=>{
    const tourTrips = await TourTrips.find({tour: req.params.id_tour})
    if(tourTrips){
        res.status(200).json({tourTrips: tourTrips})
    }else{
        res.status(404).json({message: "Not Found this tour trip"})
    }
}

const getTourTripsByIdTourNotYetDeparted = async(req, res)=>{
    const tourTrips = await TourTrips.find({tour: req.params.id_tour, departure_day: {$gt: Date()}})
    if(tourTrips){
        res.status(200).json({tourTrips: tourTrips})
    }else{
        res.status(404).json({message: "Not Found this tour trip"})
    }
}

const getTourTripsById = async(req, res)=>{
    const tourTrip = await TourTrips.findById(req.params.id_tour_trip)
    if(tourTrip){
        res.status(200).json({tourTrip: tourTrip})
    }else{
        res.status(404).json({message: "Not Found this tour trip"})
    }
}

module.exports = {
    createTourTrip,
    getTourTripsById,
    deleteTourTripById,
    getTourTripsByIdTour,
    updateTourTripById,
    getTourTripsByIdTourNotYetDeparted
}
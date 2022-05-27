const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Users = require("../models/UserModel")

// function Register
const register = async (req, res) =>{
    const salt = 10
    const hash = await bcrypt.hash(req.body.password, salt)
    const newUser = new Users({
        email: req.body.email,
        fullname: req.body.fullname,
        password: hash,
        id_card: req.body.id_card,
        address: req.body.address,
        age: req.body.age,
        number_phone: req.body.number_phone,
    })

    await newUser.save().then((result =>{
        if(result){
            const {password, ...other} = result._doc
            return res.status(200).json({user: other})
        }else{
            return res.status(404).json({message: "Register Fail"})
        }
    }))
}

// function Login
const login = async (req, res) =>{
    const user = await Users.findOne({email: req.body.email})
    if(user){
        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        if(checkPassword){
            const token =  jwt.sign({
                id: user._id,
                email: user.email,
                role: user.role
            }, process.env.ACCESS_TOKEN_KEY, {expiresIn: "2h"})
            const {password, ...other} = user._doc
            return res.status(200).json({user: other, token: token})
        }else{
            return res.status(404).json({message: "Wrong Password !"})
        }
    }else{
        return res.status(404).json({message: "Wrong Email !"})
    }
}

// function get all users
const getAllUsers = async (req, res)=>{
    const users = await Users.find().select("-password")
    if(users){
        res.status(200).json({users: users})
    }else{
        res.status(404).json({message: "Not Fount User"})
    }
}

// function get a user by id_user
const getUserById = async (req, res)=>{
    const user = await Users.findById(req.params.id_user)
    if(user){
        const {password, ...other} = user._doc
        res.status(200).json({user: other})
    }else{
        res.status(404).json({message: "Not Fount User"})
    }
}

// function update a user by id_user
const updateUserById = async (req, res)=>{

    const user = await Users.findById(req.params.id_user)

    user.fullname = req.body.fullname ? req.body.fullname: user.fullname
    user.id_card = req.body.id_card ? req.body.id_card: user.id_card
    user.age = req.body.age ? req.body.age: user.age
    user.address = req.body.address ? req.body.address: user.address
    user.number_phone = req.body.number_phone ? req.body.number_phone: user.number_phone

    await user.save().then(result => {
        if(result){
            const {password, ...other} = result._doc
            res.status(200).json({user: other})
        }else{
            res.status(404).json({message: "Update User Fail"})
        }
    })
}

// function add image a user by id_user
const addImageUserById = async (req, res)=>{
    const user = await Users.findById(req.params.id_user)
    user.url_image = req.file.filename ? "http://localhost:8000/images/" + req.file.filename : user.url_image
    await user.save().then(result => {
        if(result){
            const {password, ...other} = result._doc
            res.status(200).json({user: other})
        }else{
            res.status(404).json({message: "Update User Fail"})
        }
    })
}

// function update Role a user by id_user
const updateRoleUserById = async (req, res)=>{
    const user = await Users.findById(req.params.id_user)
    
    user.role = req.body.role ? req.body.role : user.role

    await user.save().then(result => {
        if(result){
            const {password, ...other} = result._doc
            res.status(200).json({user: other})
        }else{
            res.status(404).json({message: "Update User Fail"})
        }
    })
}

// function delete a user by id_user
const deleteUserById = async (req, res)=>{
    const result = await Users.findByIdAndDelete(req.params.id_user)
        if(result){
           
                res.status(200).json({message: "Delete User Success"})
            
            
        }else{
            res.status(404).json({message: "Delete User Fail"})
        }
    
    
}

module.exports ={
    register,
    login,
    getAllUsers,
    getUserById,
    updateUserById,
    addImageUserById,
    updateRoleUserById,
    deleteUserById
}
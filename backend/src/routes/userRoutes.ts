import bcrypt from 'bcrypt-nodejs'
import jwt from 'jwt-simple'
import express, { Router } from 'express'
import User from '../../models/User'
import { Role } from '../../models/Role'

const router: Router = express.Router()

router.post('/register', async (req, res): Promise<any> => {
  if(req.body._id === '0' || req.body._id === ''){
    delete req.body._id
  }
  var userData = req.body
  var newUser = new User(userData)
  newUser.role = Role.Basic
  const checkIfExists = await User.find({email: newUser.email})
  if (checkIfExists?.length !== 0) {
    res.status(401).send("Already registered. Please log in!")    
  }
  try {
    const userFromDB = await newUser.save()
    createSendToken(res, userFromDB)
  } catch (error) {
    res.status(401).send("Registration failed.")
  }

})

router.post('/login', async (req, res): Promise<any> => {
  var loginData = req.body
  var user = await User.findOne({ email: loginData.email })
  if (!user) {
    res.status(401).send("User not registered.")
  }
  bcrypt.compare(loginData.pwd, user?.pwd || "123", (err, isMatch) => {
    if (err) {
      res.status(401).send("Login failed.")
    } else if (isMatch) {
      createSendToken(res, user)
    } else {
      res.status(401).send("Wrong PW")
    }  
  })
})

router.get('/', checkAuthenticated, async (req, res) => {
  try {
    var users = await User.find({}, '-__v')
    res.send(users)
  } catch (error) {
    res.send("Error getting users.")
  }
})

router.put("/:id", checkAuthenticated, async (req, res) => {
  var user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); 
  res.json(user);
})

var userRoutes = {
  router,
  checkAuthenticated
}

function checkAuthenticated (req: any, res: any, next: any) {
  if (!req.header('authorization')) {      
    return res.status(401).send({ message: "Authentication failed!" })
  }
  var token
  try {
    token = req.header('authorization').split(' ')[1]
  } catch (error) {
    return res.status(401).send({ message: "Authentication failed!" })
  }     
  if(!token || token == "null"){
    return res.status(401).send({ message: "Authentication failed!" })
  } 
  try {
    var payload = jwt.decode(token, 'This is secret')
    if (!payload) {
      return res.status(401).send("Authentication failed!")
    }
    req.userId = payload['sub']
    next()
  } catch (error) {
    return res.status(401).send({ message: "Authentication failed!" })
  }
  
}

function createSendToken(res: any, user: any) {
  var payload = { sub: user._id }
  var token = jwt.encode(payload, "This is secret")
  return res.status(200).send({ token: token, role: user.role })
}

export default userRoutes
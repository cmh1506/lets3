import mongoose from 'mongoose'
import { Role } from './Role'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema({
  email: String,
  pwd: String,
  name: String,
  role: { type: String, default: Role.Basic }
})

userSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('pwd')) { return next() }

  bcrypt.hash(user?.pwd || "", "", null, (err: mongoose.CallbackError | undefined, hash: string | null | undefined) => {
    if(err){return next(err)}
    user.pwd = hash
    next()
  })
  
})

export default mongoose.model('User', userSchema)

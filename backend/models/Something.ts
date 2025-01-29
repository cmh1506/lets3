import mongoose, { Schema } from "mongoose";

const somethingSchema = new mongoose.Schema({
  time: Date,
  member: [{type: Schema.Types.ObjectId, ref: 'User'}]
})
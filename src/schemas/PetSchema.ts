import { Schema } from "mongoose";

export const PetSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    name: String,
    weight: Number,
    race: String,
    size: String,
    age: Number,
    specie: String
})
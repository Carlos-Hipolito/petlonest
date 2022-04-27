import { Schema } from "mongoose";

export const PetSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String, required: true},
    weight: {type: Number, required: true},
    race: {type: String, required: true},
    size: {type: String, required: true},
    age: {type: Number, required: true},
    specie: {type: String, required: true}
})
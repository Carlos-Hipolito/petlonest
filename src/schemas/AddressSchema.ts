import { Schema } from "mongoose";

export const AddressSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    city: {type: String, required: true},
    district: {type: String, required: true},
    street: {type: String, required: true},
    number: {type: Number, required: true},
    state: {type: String, required: true},
    zip: {type: Number, required: true},
})
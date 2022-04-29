import { Schema } from "mongoose"

export class Address {
    user_id: {type: Schema.Types.ObjectId, ref: 'User'}
    city: String
    district: String
    street: String
    number: Number
    state: String
    zip: Number
}
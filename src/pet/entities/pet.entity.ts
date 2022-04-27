import { Schema } from "mongoose"

export class Pet {
    user_id: {type: Schema.Types.ObjectId, ref: 'User'};
    name: String;
    weight: Number;
    race: String;
    size: String;
    age: Number;
    specie: String
}

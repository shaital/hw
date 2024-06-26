import { Schema, model } from "mongoose";

const profileSchema = new Schema({
  name: {
    title: String,
    first: String,
    last: String,
  },
  gender: String,
  country: String,
  phone: String,
  email: String,
  dob: {
    age: Number,
    date: String,
  },
  login: {
    uuid: { type: String, required: true, unique: true },
  },
  location: {
    street: {
      number: Number,
      name: String,
    },
    city: String,
    state: String,
    country: String,
  },
  picture: {
    large: String,
    thumbnail: String,
  },
});

const Profile = model("Profile", profileSchema);

export default Profile;

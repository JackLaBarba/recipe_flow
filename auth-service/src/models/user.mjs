import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },  // TODO: don't store plaintext passwords
});

export default UserModel;
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true,
    },
    email: {
        type: String,
        require: true,
        index: true,
        unique: true
    },
    password: {
        type: String, 
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false,
    }
})

const userModel = mongoose.model('User', userSchema);
export default userModel
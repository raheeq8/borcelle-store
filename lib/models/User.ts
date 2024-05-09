import mongoose from "mongoose";

const userSchma = new mongoose.Schema({
    clerkId: String,
    wishlist: {
        type: Array,
        default: [],
    },
    createdAt: {
        type:Date,
        default: Date.now
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchma);
export default User
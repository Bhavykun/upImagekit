import mongoose, {Schema,model, models} from "mongoose";
import bcrypt from "bcryptjs";

export interface UserInt{
    email : string;
    password : string;
    _id? : mongoose.Types.ObjectId;
    createdAt? : Date;
    updatedAt? : Date; 
}

const userSchema = new Schema<UserInt>({
    email : {type:String, required: true, unique: true},
    password : {type: String, required: true},

},{timestamps: true});

userSchema.pre('save', async function (next) {  //[pre hook before saving the data into database]
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    } next()
});

const User = models?.User || model<UserInt>("User",userSchema);

export default User;
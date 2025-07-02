import mongoose, {Schema,model, models} from "mongoose";

export const VIDEO_DIMENSIONS = {
    width : 1080,
    height : 1920,
} as const; //typescript to make it constant

export interface VideoInt {
    _id? : mongoose.Types.ObjectId,
    title : string,
    description : string,
    videoURL : string,
    thumbnailURL : string,
    controls? : boolean,
    transformation? : {
        height: number,
        width: number,
        quality?: number,
    };
}

const videoSchema = new Schema<VideoInt>({
    title : {type: String, required:true},
    description : {type:String, required:true},
    videoURL : {type:String,required: true},
    thumbnailURL : {type: String, required: true},
    controls : {type: Boolean, required:true},
    transformation : {
        height : {type:Number, default : VIDEO_DIMENSIONS.height},
        width : {type: Number, default : VIDEO_DIMENSIONS.width},
        quality : {type:Number , min:1, max : 100},
    }
},{timestamps: true})

const Video = models?.Video || model<VideoInt>("Video",videoSchema);

export default Video;
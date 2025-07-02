"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
interface fileUploadProps{
    onSuccess : (res:any) => void
    onProgress? : (progress: Number) => void
    fileType? : "image" | "video"
}


const FileUpload = ({
    onSuccess,
    onProgress,
    fileType
}:fileUploadProps) => {

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File) =>{
        if(fileType === "video"){
            if(!file.type.startsWith("video/")){
                setError("pleae upload a valid video file");
            }

        }
        if(file.size >100*1024*1024){
            setError("File size must be less than 100 MB");
        }
        return true;
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) =>{
        const file = e.target.files?.[0];
        if(!file || !validateFile(file)){
            return;
        }
        setUploading(true);
        setError(null);

        try{
            const auth_res = await fetch("api/auth/imagekit-auth");
            const auth = await auth_res.json();

            const response = await upload({
                expire : auth.expire,
                token : auth.token,
                signature: auth.signature,
                publicKey : process.env.NEXT_PUBLIC_KEY!,
                file,
                fileName: file.name,
                onProgress: (event) => {
                    if(event.lengthComputable && onProgress){
                        const percent = (event.loaded / event.total)*100;
                        onProgress(Math.round(percent));
                    }
                },
            });
            onSuccess(response);
        }
        catch(err){
            console.error("Upload Failed",err);
        }
        finally{
            setUploading(false);
        }
    }

    return (
        <>
            <input type="file"
            accept={fileType === "video" ? "video/*" : "image/*"}
            onChange={handleFileChange}
            />
            {uploading && (
                <span>Loading....</span>
            )}
        </>
    );
};

export default FileUpload;
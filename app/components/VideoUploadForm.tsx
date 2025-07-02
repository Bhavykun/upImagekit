import React from "react";

function VideoUploadForm() {
  return (
    <div>
        <form className="flex flex-col gap-4">
            <label className="label">
            <span className="label-text">Upload Video</span>
            </label>
            <input
            type="file"
            accept="video/*"
            className="file-input file-input-bordered w-full max-w-xs"
            />
            <button
            type="submit"
            className="btn btn-primary"
            >
            Upload
            </button>
        </form>
    </div>
  )
}

export default VideoUploadForm;
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import '../Styles/img2qa.css';

export default function ImageUploader({ setImageBase64, setMimeType }) {
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file === undefined) {
            console.log("No file selected");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                setPreviewUrl(reader.result);
                const base64Data = reader.result.split(',')[1];
                setImageBase64(base64Data);
                setMimeType(file.type);
            }
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file.type.split('/')[0] !== 'image') {
            toast.error('Only image files are allowed!');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result) {
                setPreviewUrl(reader.result);
                const base64Data = reader.result.split(',')[1];
                setImageBase64(base64Data);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="container-fluid">
            <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleFileChange}
                hidden
            />
            <div className="image-uploader mt-4" onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => document.getElementById('fileInput').click()}>
                {previewUrl ? (
                    <img className="mt-2 imgqa" src={previewUrl} alt="Preview" width={"100%"} height={"550px"} />
                ) : (
                    <div style={{
                        border: "4px dashed #a0a3a2",
                        minHeight: "80vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <div>
                            <h5 className='' style={{ color: "white" }}>Drag and drop your image here or</h5>
                            <button className='btn btn-primary mt-2'>
                                Click to select image
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};
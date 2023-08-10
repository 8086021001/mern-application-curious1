import React, { useRef, useState } from 'react'
import { Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';


const ImageButton = ({ handleImageUploading }) => {

    const [fileState, setFileState] = useState(null)

    const fileInputRef = useRef(null);


    const handleMediaUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileState(fileState)
            handleImageUploading(file)
            setFileState(null)
        }
    };

    return (
        <>
            <div>
                <Button onClick={handleMediaUploadClick}>
                    <AttachFileIcon />
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>

        </>
    )
}

export default ImageButton
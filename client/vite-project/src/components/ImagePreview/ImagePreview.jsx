import { useState } from 'react';
import { styled } from '@mui/system';

const ImageIcon = styled('img')({
    width: '48px',
    height: '48px',
    cursor: 'pointer',
});

const ImagePreviewComp = styled('img')({
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
});

const ImagePreviewContainer = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9998,
});


const ImagePreview = ({ image }) => {

    const [previewOpen, setPreviewOpen] = useState(false);

    const handleImageClick = () => {
        setPreviewOpen(true);
    };

    const handleClosePreview = () => {
        setPreviewOpen(false);
    };

    return (
        <>
            <ImageIcon src={image} alt="Image Icon" onClick={handleImageClick} />

            {previewOpen && (
                <ImagePreviewContainer onClick={handleClosePreview}>
                    <ImagePreviewComp src={image} alt="Image Preview" />
                </ImagePreviewContainer>
            )}
        </>
    )

}

export default ImagePreview
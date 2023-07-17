import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import Quill from 'quill';
import ImageResize from 'quill-image-resize';



Quill.register('modules/imageResize', ImageResize);


const modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
    imageResize: {
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
        displayStyles: {
            backgroundColor: 'black',
            border: 'none',
            color: 'white',
        },
        toolbarStyles: {
            backgroundColor: 'black',
            border: 'none',
            color: 'white',
        },
    },

}
const EditBlogsEditotNewTheme = ({ blogContent, handleContent }) => {
    const [editContent, setEditContent] = useState(null)
    const handleProcedureContentChange = (content) => {
        setEditContent(content)
        handleContent(content)
    }
    useEffect(() => {
        if (blogContent) {
            setEditContent(blogContent)
        }
    }, [blogContent])


    return (
        <>
            <ReactQuill
                value={editContent}
                modules={modules}
                onChange={handleProcedureContentChange} />
        </>
    )
}

export default EditBlogsEditotNewTheme
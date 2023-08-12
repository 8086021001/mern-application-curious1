import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize';
import Quill from 'quill';
import { useDispatch, useSelector } from 'react-redux';
import { setContent } from '../../features/user/blogCreateSlice';
import { Grid } from '@mui/material';


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


const Editor = () => {

    // const [code, setContent] = useState('')
    const BlogContState = useSelector(state => state.blogCreateState)
    const dispatch = useDispatch()


    const handleProcedureContentChange = (content, delta, source, editor) => {
        dispatch(setContent(content))
    };

    return (
        <Grid sx={{ maxWidth: '100%', padding: '0 15px' }}>
            <ReactQuill
                value={BlogContState?.content}
                modules={modules}
                onChange={(e) => { handleProcedureContentChange(e) }}
            >
            </ReactQuill>
        </Grid>
    )
}


export default Editor



import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize';
import Quill from 'quill';
import { useDispatch, useSelector } from 'react-redux';
import { setBlog, setContent } from '../../features/user/blogCreateSlice';


Quill.register('modules/imageResize', ImageResize);



const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ['image', 'code-block'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
        [{ 'align': [] }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'size': [] }],
        ['width', 'height', 'float'],
    ],
}
const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
];


const EditEditor = () => {

    // const [code, setContent] = useState('')
    const [quillContent, setQuillContent] = useState('');
    const BlogContState = useSelector(state => state.blogCreateState)

    const [editContent, setEditContent] = useState(BlogContState?.creatingBlog?.content)


    const dispatch = useDispatch()


    const handleProcedureContentChange = (content) => {
        setEditContent(content)
        dispatch(setContent(content))
    };




    return (
        <div>
            <ReactQuill
                value={editContent}
                modules={{ ...modules, imageResize: {} }}
                formats={formats}
                onChange={handleProcedureContentChange}
            >
            </ReactQuill>
        </div>
    )
}


export default EditEditor


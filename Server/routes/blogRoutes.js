const express = require('express')
const router = express.Router()
const {PostBlog,getBlog,getALLBlogs,getUserBlogs
    ,MakeBlogComment,getBlogComment,getSearchContent,
    getSavedBlogs,MakeLikeSuccess,deleteBlog,editMyBlog,getOtherUserBlogs,saveBlogAsDraft,getAllDraftedBlogs,deleteSavedDrafts} = require('../controllers/blog')
const {upload} = require('../utils/multerConfig')
const {verifyToken} = require('../controllers/verifyToken')



router.post('/createBlog',upload.single('coverImage'),verifyToken,PostBlog)
router.get('/getBlog/:_id',verifyToken,getBlog)
router.get('/getAllBlog',verifyToken,getALLBlogs)
router.get('/getBlogComment/:blogId',verifyToken,getBlogComment)
router.get('/getSearchContent/:searchText',verifyToken,getSearchContent)
router.get('/getSavedBlogs',verifyToken,getSavedBlogs)


router.get('/getAllDraftedBlogs',verifyToken,getAllDraftedBlogs)

//getting all the blogs related to user
router.get('/getUserBlogs',verifyToken,getUserBlogs)

//getting comments


//setting new comments
router.post('/MakeBlogComment',verifyToken,MakeBlogComment)

//making likes

//save blog as draft
router.post('/saveBlogAsDraft',upload.single('coverImage'),verifyToken,saveBlogAsDraft)


router.post('/MakeLikeSuccess',verifyToken,MakeLikeSuccess)

//deleting blogs
router.delete('/deleteBlog/:blogId',verifyToken,deleteBlog)

//delete saved drafted blogs

router.delete('/deleteSavedDrafts/:blogId',verifyToken,deleteSavedDrafts)

//editing my blog

router.put('/editMyBlog',upload.single('coverImage'),verifyToken,editMyBlog)


//get other users blog details to view in profile

router.get('/getOtherUserBlogs/:usersId',verifyToken,getOtherUserBlogs)



module.exports = router
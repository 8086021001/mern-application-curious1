import React from 'react'
import PulseLoader from 'react-spinners/PulseLoader';


const BlogCreateLoader = ({loading}) => {
  return (
    <>
               {loading &&

<PulseLoader
    color="#eac41a"
    cssOverride={{}}
    loading
    size={20}
    speedMultiplier={1}
/>
}

    </>
  )
}

export default BlogCreateLoader
import React, { useState, useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = ({ loader }) => {
    const [loading, setLoading] = useState(false);
    // Simulating a loading delay
    useEffect(() => {
        if (loader) {
            setLoading(true)
        }

    }, [loader]);
    return (
        <>
            {loading &&
                <div className="loader-overlay">
                    <ClipLoader color="black" size={50} />
                </div>
            }
        </>
    )
}

export default Loader
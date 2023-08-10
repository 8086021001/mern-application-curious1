import React from 'react'
import "./particlestyles.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Typography } from '@mui/material';

const Particle = ({ chatDat }) => {
    const particlesInit = async (main) => {

        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(main);
    };
    return (
        <>
            <div style={{ position: 'relative', width: '100%', height: '200%' }}>
                <Particles id="particles-here" init={particlesInit} options={{
                    "fullScreen": {
                        "enable": false,
                        "zIndex": 1
                    },
                    "particles": {
                        "number": {
                            "value": 35,
                            "density": {
                                "enable": true,
                                "value_area": 800
                            }
                        },
                        "color": {
                            "value": "#07fa1c"
                        },
                        "shape": { "type": "circle", "stroke": { "width": 0, "color": "#0000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "img/github.svg", "width": 100, "height": 100 } },
                        "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
                        "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
                        "rotate": {
                            "value": 0,
                            "random": true,
                            "direction": "clockwise",
                            "animation": {
                                "enable": true,
                                "speed": 5,
                                "sync": false
                            }
                        },
                        "line_linked": {
                            "enable": true,
                            "distance": 800,
                            "color": "#07fa1c",
                            "opacity": 0.1,
                            "width": 2
                        },
                        "move": {
                            "enable": true,
                            "speed": 2,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "out_mode": "out",
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onhover": {
                                "enable": true,
                                "mode": ["grab"]
                            },
                            "onclick": {
                                "enable": false,
                                "mode": "bubble"
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 400,
                                "line_linked": {
                                    "opacity": 1
                                }
                            },
                            "bubble": {
                                "distance": 400,
                                "size": 40,
                                "duration": 2,
                                "opacity": 8,
                                "speed": 3
                            },
                            "repulse": {
                                "distance": 200
                            },
                            "push": {
                                "particles_nb": 4
                            },
                            "remove": {
                                "particles_nb": 2
                            }
                        }
                    },
                    "retina_detect": true,
                    "background": {
                        "color": "#edf0ee",
                        "image": "",
                        "position": "50% 50%",
                        "repeat": "no-repeat",
                        "size": "cover"
                    }
                }}
                    style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}

                />


                {/* Text */}
                {chatDat &&

                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            zIndex: 1,
                        }}
                    >
                        <div>
                            <lord-icon
                                src="https://cdn.lordicon.com/kjkiqtxg.json"
                                trigger="hover"
                                colors="outline:#121331,primary:#646e78,secondary:#4bb3fd,tertiary:#ebe6ef"
                                style={{ width: '250px', height: '250px' }}>
                            </lord-icon>
                        </div>
                        <Typography variant="h4" style={{ color: '#000', marginBottom: '16px' }}>
                            Hello, Start Chatting
                        </Typography>
                        <Typography style={{ color: '#000' }}>
                            Find your connected user and start chating!
                        </Typography>
                    </div>
                }


            </div >
        </>
    )
}

export default Particle

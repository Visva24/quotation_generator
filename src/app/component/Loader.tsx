import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

const Loader = () => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
            <div className="transform transition-all duration-300 scale-95 opacity-0 animate-popup">
                <div className='flex justify-center items-center'>
                    <Player
                        autoplay
                        loop
                        src="https://lottie.host/9038d8f1-a2ed-4634-8c81-e8c31233628b/AKrl1yBx4l.json"
                        style={{ height: '250px', width: '250px' }}
                    >
                    </Player>
                </div>
            </div>
        </div>
    )
}

export default Loader
import {Player } from '@lottiefiles/react-lottie-player'
import React from 'react'

const Loader = () => {
    return (
       <div className='h-screen w-screen absolute z-100'>
         <div>
            <Player
                autoplay
                loop
                src="https://lottie.host/9038d8f1-a2ed-4634-8c81-e8c31233628b/AKrl1yBx4l.json"
                style={{ height: '250px', width: '250px' }}
            >
                {/* <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} /> */}
            </Player>
        </div>
       </div>
    )
}

export default Loader
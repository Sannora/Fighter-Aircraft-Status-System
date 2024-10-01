import './Speedometer.css'
import speedometerCircleSvg from '../../assets/speedometer-circle.svg'
import speedometerArrowSvg from '../../assets/speedometer-arrow.svg'
import useWebSocket from '../../Hooks/useWebSocket'
import { useEffect, useState } from 'react';

function Speedometer(){

    const ws = useWebSocket();

    const [speedometerAngle, setSpeedometerAngle] = useState(-90);

    // Uçağın anlık hızını tutacak useState hook'u
    const [planeSpeed, setPlaneSpeed] = useState(0);

    useEffect(() => {
        if (!ws) return;

        const handleMessage = (message) => {
            const parsedMessage = JSON.parse(message.data);
            if(parsedMessage.eventName === "PLANE_SPEED"){
                setPlaneSpeed(parsedMessage.data.speed);

                setSpeedometerAngle(((parsedMessage.data.speed*180)/100)-90)
            }
        };

        // WebSocket güncelleme mesajı aldıkça yapması gerekenleri konrol eden event handler
        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
        }
    }, [ws]);

    return(

        <>
            <div className="speedometer">
                <img src={speedometerCircleSvg} alt="Circle" className='speed-circle' />
                <img src={speedometerArrowSvg} alt="Arrow" className='speed-arrow'
                style={{ transform: `rotate(${speedometerAngle}deg)` }}
                />
            </div>
            <p className="speedometer-text">{planeSpeed} km/h</p>
        </>

    )

}

export default Speedometer
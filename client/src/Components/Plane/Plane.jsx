import './Plane.css'
import useWebSocket from '../../Hooks/useWebSocket';
import planeSvg from '../../assets/plane.svg';
import { useEffect, useState } from 'react';

function Plane(){

    const ws = useWebSocket();

    // Uçağın anlık dönüş açılarını tutacak useState hook'u
    const [planeAngle, setPlaneAngle] = useState(0);

    useEffect(() =>{
        if (!ws) return;

        const handleMessage = (message) => {
            const parsedMessage = JSON.parse(message.data);
            if(parsedMessage.eventName === "PLANE_ANGLE"){
                setPlaneAngle(parsedMessage.data.angle);
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
        <img src={planeSvg} alt="Plane"
            // WebSocket'tan gelen angle verisini svg'yi döndürmek için kullan
            style={{transform: `rotate(${planeAngle}deg)`}}
        />
        </>

    )

}

export default Plane
import './Battery.css';
import batterySvg from '../../assets/battery.svg';
import useWebSocket from '../../Hooks/useWebSocket';
import { useEffect, useState } from 'react';

function Battery() {
    const ws = useWebSocket();
    const [planeBattery, setPlaneBattery] = useState(100);

    useEffect(() => {
        if (!ws) return;

        const handleMessage = (message) => {
            const parsedMessage = JSON.parse(message.data);
            if (parsedMessage.eventName === "PLANE_BATTERY") {
                setPlaneBattery(parsedMessage.data.battery);
            }
        };

        ws.addEventListener('message', handleMessage);

        return () => {
            ws.removeEventListener('message', handleMessage);
        };
    }, [ws]);

    function updateBatterySegments(planeBattery) {
        const segments = document.querySelectorAll('.battery-segment');
        const segmentHeight = 25; // Her bir segmentin tam dolu hâli %25
    
        segments.forEach((segment, index) => {
            const minRange = (3 - index) * segmentHeight;
            const maxRange = minRange + segmentHeight;
    
            if (planeBattery >= maxRange) {
                segment.style.height = '100%'; // Tam dolu
                segment.style.backgroundColor = '#00FF00';
            } else if (planeBattery > minRange && planeBattery < maxRange) {
                const heightPercentage = ((planeBattery - minRange) / segmentHeight) * 100;
                segment.style.height = `${heightPercentage}%`; // Kısmen dolu
                segment.style.backgroundColor = '#00FF00';
            } else {
                segment.style.height = '0%'; // Boş
            }
    
            // Renk değişiklikleri
            if (planeBattery < 50) {
                segment.style.backgroundColor = '#FFFF00'; // %50 altına sarı
            }
            if (planeBattery < 20) {
                segment.style.backgroundColor = 'red'; // %20 altına kırmızı
            }

            // Yakıt %20'nin altına düştüğünde yanıp sönme efekti
            if (planeBattery < 20) {
                segment.classList.add('blinking'); // Yanıp sönme sınıfı eklenir
            } else {
                segment.classList.remove('blinking'); // Yanıp sönme sınıfı kaldırılır
            }
        });
    }

    useEffect(() => {
        updateBatterySegments(planeBattery); // planeBattery her güncellendiğinde segmentleri güncelle
    }, [planeBattery]);

    return (
        <div className="battery">
            <img src={batterySvg} alt="Battery" className={planeBattery < 20 ? 'blinking' : ''} />
            <div className="battery-segments">
                <div className="battery-segment"></div>
                <div className="battery-segment"></div>
                <div className="battery-segment"></div>
                <div className="battery-segment"></div>
            </div>
        </div>
    );
}

export default Battery;

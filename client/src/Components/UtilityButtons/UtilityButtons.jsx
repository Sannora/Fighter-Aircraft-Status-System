import './UtilityButtons.css';
import useWebSocket from '../../Hooks/useWebSocket';
import { useState, useEffect } from 'react';

function UtilityButtons() {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useWebSocket();

  useEffect(() => {
    // Eğer WebSocket bağlantısı henüz yoksa, işlemleri yapma
    if (!ws) return;

    // WebSocket açıldığında çalışacak olan event handler
    ws.onopen = () => {
      console.log('WebSocket bağlantısı kuruldu.');
      setIsConnected(true); // Bağlantı kurulduğunu belirt
    };

    // WebSocket kapandığında çalışacak olan event handler
    ws.onclose = () => {
      console.log('WebSocket bağlantısı kapatıldı.');
      setIsConnected(false); // Bağlantı kapandığını belirt
    };

    // Cleanup: Component unmount olduğunda event handler'ları temizle
    return () => {
      ws.onopen = null;
      ws.onclose = null;
    };
  }, [ws]); // ws her değiştiğinde useEffect yeniden çalışacak

  const startBroadcast = () => {
    if (isConnected && ws) {
      ws.send('START');
      console.log('START mesajı gönderildi.');
    }
  };

  const stopBroadcast = () => {
    if (isConnected && ws) {
      ws.send('STOP');
      console.log('STOP mesajı gönderildi.');
    }
  };

  return (
    <div className="buttons-container">
      <button onClick={stopBroadcast} className="button-stop utility-button">Stop</button>
      <button onClick={startBroadcast} className="button-start utility-button">Start</button>
    </div>
  );
}

export default UtilityButtons;
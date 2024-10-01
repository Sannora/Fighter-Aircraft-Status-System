import { useContext } from "react"
import WebSocketContext from "../Contexts/WebSocketContext"


const useWebSocket = () => {
    // WebSocketContext ile WebSocket bağlantısını çek
    return useContext(WebSocketContext);
}

export default useWebSocket;
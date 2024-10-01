import MainContainer from "./Components/MainContainer/MainContainer"
import { WebSocketProvider } from "./Contexts/WebSocketContext"

function App() {

  return (
    <>
    <WebSocketProvider>
      <MainContainer />
    </WebSocketProvider>
    </>
  )
}

export default App

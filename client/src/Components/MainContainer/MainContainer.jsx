import './MainContainer.css'
import Plane from '../Plane/Plane'
import Battery from '../Battery/Battery'
import UtilityButtons from '../UtilityButtons/UtilityButtons'
import Speedometer from '../Speedometer/Speedometer'


function MainContainer(){

    return(

        <div className="main-container">
            <div className="main-display">
                <div className="plane-container">
                    <Plane />
                </div>
                <div className="battery-container">
                    <Battery />
                </div>
            </div>
            <div className="utilities-display">
                <div className="utility-buttons">
                    <UtilityButtons />
                </div>
                <div className="speedometer-container">
                    <Speedometer />
                </div>
            </div>
        </div>

    )

}

export default MainContainer
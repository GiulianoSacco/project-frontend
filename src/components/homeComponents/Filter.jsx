import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLandmark} from '@fortawesome/free-solid-svg-icons'
import { faMugSaucer} from '@fortawesome/free-solid-svg-icons'
import { faUtensils} from '@fortawesome/free-solid-svg-icons'
import { faUmbrellaBeach} from '@fortawesome/free-solid-svg-icons'


function Filter ({ setActiveType }){
    
    return (
        <div className="filter-container">
            <button onClick={() => setActiveType('')}>All</button>
            <button onClick={() => setActiveType('Beach')}><FontAwesomeIcon icon={faUmbrellaBeach}/></button>
            <button onClick={() => setActiveType('Restaurant')}><FontAwesomeIcon icon={faUtensils}/></button>
            <button onClick={() => setActiveType('Cafeteria')}><FontAwesomeIcon icon={faMugSaucer} /></button>
            <button onClick={() => setActiveType('Museum')}><FontAwesomeIcon icon={faLandmark}/></button>
            <button onClick={() => setActiveType('Other')}>Other</button>
        </div>
    )
}

export default Filter;

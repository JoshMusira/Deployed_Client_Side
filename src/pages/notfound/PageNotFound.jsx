import './notfound.css'
import notfound from '../../assets/404-error.png'
const PageNotFound = () => {
    return (
        <div id='background-video'>
            <h1>PageNotFound</h1>
            <img src={notfound} alt="" />

        </div>
    )
}

export default PageNotFound
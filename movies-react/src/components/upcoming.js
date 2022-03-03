import axios from 'axios'


const UpcomingMovies = (props) => {
    return(
        props.upcomingMovies.map((upcoming) => {
            let img = upcoming.poster_path
            let full = 'http://image.tmdb.org/t/p/w185' + img;
            return(
                <div key={upcoming.id} className="upcoming-movie">
                    <h3>{upcoming.title}</h3>
                    <img src= {full}/>
                </div>
            )
        })
    )   
}

export default UpcomingMovies
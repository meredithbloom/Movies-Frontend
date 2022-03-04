import axios from 'axios'


const UpcomingMovies = (props) => {
    return(
        props.upcomingMovies.map((upcoming) => {
            let img = upcoming.poster_path
            let full = 'http://image.tmdb.org/t/p/w185' + img;
            return(
                <div key={upcoming.id} className="image-container d-flex justify-content-start m-3 col">
                    <img src= {full}/>
                    <div className ='overlay d-flex flex-row align-items-start justify-content-between'>
                    <div>
                      <p className='movie-title text-left'>{upcoming.title}</p>
                      <p className="year">Year:{upcoming.release_date.substring(0,4)}</p>
                      </div>
                      <div className="d-flex flex-column justify-content-around">
                        <i class="bi bi-heart-fill heart-icon"></i>
                        <i class="bi bi-plus-circle-fill plus-icon"></i>
                        <i class="bi bi-check-circle-fill check-icon"></i>
                      </div>
                    </div>
                </div>
            )
        })
    )
}

export default UpcomingMovies

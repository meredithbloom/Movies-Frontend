import axios from 'axios'


const UpcomingMovies = (props) => {
    return(
        props.upcomingMovies.map((upcoming) => {
            let img = upcoming.poster_path
            let full = 'http://image.tmdb.org/t/p/w185' + img;
            return(
                <div key={upcoming.id} className="image-container d-flex justify-content-start m-2 col">
                    <img src= {full}/>
                    <div className ='overlay d-flex align-items-center justify-content-center'>
                      {upcoming.title}

                    </div>
                </div>
            )
        })
    )
}

export default UpcomingMovies

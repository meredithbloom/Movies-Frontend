import axios from 'axios'


const TrendingMovies = (props) => {
    return(
        props.trendingMovies.map((movie) => {
            let img = movie.poster_path
            let movieID = movie.id
            let full = 'http://image.tmdb.org/t/p/w200' + img;
            return(
                <div key={movie.id} className="image-container d-flex justify-content-start m-3 col">
                    <img src= {full}/>
                    <div className ='overlay d-flex align-items-center justify-content-center'>
                      {movie.title}
                    </div>
                </div>
            )
        })
    )
}

export default TrendingMovies

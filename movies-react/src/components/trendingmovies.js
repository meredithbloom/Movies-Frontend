import axios from 'axios'


const TrendingMovies = (props) => {
    return(
        props.trendingMovies.map((movie) => {
            let img = movie.poster_path
            let full = 'http://image.tmdb.org/t/p/w500' + img;
            return(
                <div key={movie.id} className="trending-movie">
                    <h3>{movie.title}</h3>
                    <p>{movie.overview}</p>
                    <img src= {full}/>
                </div>
            )
        })
    )   
}

export default TrendingMovies
import axios from 'axios'


const TrendingMovies = (props) => {
    return(
        props.trendingMovies.map((movie) => {
            let img = movie.poster_path
<<<<<<< HEAD
            let full = 'http://image.tmdb.org/t/p/w185' + img;
            return(
                <div key={movie.id} className="trending-movie">
                    <h3>{movie.title}</h3>
=======
            let full = 'http://image.tmdb.org/t/p/w200' + img;
            return(
                <div key={movie.id} className="image-container d-flex justify-content-start m-2 col">
>>>>>>> 769e5f32c43fae0a05ccaac681691cb2497faf26
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
